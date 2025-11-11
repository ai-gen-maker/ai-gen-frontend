import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

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

export default withAuth(
  function middleware(req) {
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

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: [
    '/checkout/:path*',
    '/progress/:path*',
    '/result/:path*',
  ]
}
