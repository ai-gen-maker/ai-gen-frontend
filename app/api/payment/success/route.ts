import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')

  if (!paymentKey || !orderId || !amount) {
    return NextResponse.redirect(
      new URL('/checkout?error=invalid_params', request.url)
    )
  }

  try {
    // 결제 승인 API 호출
    const response = await fetch(`${request.nextUrl.origin}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: parseInt(amount),
      }),
    })

    const result = await response.json()

    if (!result.success) {
      console.error('Payment confirmation failed:', result.error)
      return NextResponse.redirect(
        new URL(
          '/checkout?error=' + encodeURIComponent(result.error || 'confirmation_failed'),
          request.url
        )
      )
    }

    // 결제 성공 - 진행률 페이지로 리디렉션
    return NextResponse.redirect(new URL('/progress', request.url))

  } catch (error) {
    console.error('Payment confirmation error:', error)
    return NextResponse.redirect(
      new URL('/checkout?error=server_error', request.url)
    )
  }
}
