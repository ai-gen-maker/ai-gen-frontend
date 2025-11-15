import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Rate limiting 설정
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // 10분당 요청 수
const WINDOW_MS = 10 * 60 * 1000 // 10분

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    // 새로운 윈도우 시작
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    })
    return true
  }

  if (userLimit.count >= RATE_LIMIT) {
    // 제한 초과
    return false
  }

  // 카운트 증가
  userLimit.count++
  return true
}

export async function middleware(req: NextRequest) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('[Middleware] Request:', req.nextUrl.pathname);
  console.log('[Middleware] Search params:', req.nextUrl.search);

  // Rate Limiting 체크
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

  if (!checkRateLimit(ip)) {
    return new NextResponse(
      JSON.stringify({ error: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '600' // 10분
        }
      }
    )
  }

  // 보호된 경로에 대한 인증 확인
  const protectedPaths = ['/checkout', '/progress', '/result']
  const isProtectedPath = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    console.log('[Middleware] Protected path detected');

    // JWT 토큰 확인
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })

    console.log('[Middleware] Token exists:', !!token);

    if (!token) {
      // 미인증 - 로그인 페이지로 리디렉션 + callbackUrl 추가
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)

      console.log('[Middleware] Redirecting to:', loginUrl.toString());
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return NextResponse.redirect(loginUrl)
    }

    console.log('[Middleware] Authenticated - allowing access');
  }

  console.log('[Middleware] Passing through');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/progress/:path*',
    '/result/:path*',
  ]
}
