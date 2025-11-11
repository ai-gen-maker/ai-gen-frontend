import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json()

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다' },
        { status: 400 }
      )
    }

    // Toss Payments API 호출
    const response = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            process.env.TOSS_SECRET_KEY + ':'
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Payment API error:', result)
      return NextResponse.json(
        {
          success: false,
          error: result.message || '결제 승인에 실패했습니다'
        },
        { status: response.status }
      )
    }

    // 결제 성공
    return NextResponse.json({
      success: true,
      payment: result,
    })

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      {
        success: false,
        error: '결제 처리 중 오류가 발생했습니다'
      },
      { status: 500 }
    )
  }
}
