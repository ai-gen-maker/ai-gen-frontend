import { NextRequest, NextResponse } from 'next/server'

const EXPECTED_AMOUNT = 79000;

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount, customerEmail, customerName } = await request.json()

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다' },
        { status: 400 }
      )
    }

    // 금액 검증 (문자열 → 숫자 변환 포함)
    const parsedAmount = Number(amount);

    if (parsedAmount !== EXPECTED_AMOUNT) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Toss Payments API 호출
    const authHeader = `Basic ${Buffer.from(
      process.env.TOSS_SECRET_KEY + ':'
    ).toString('base64')}`;

    const response = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: EXPECTED_AMOUNT,
        }),
      }
    )

    const confirmResponse = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: confirmResponse.message || '결제 승인에 실패했습니다'
        },
        { status: response.status }
      )
    }

    // 고객 정보 보정
    const finalCustomerEmail =
      customerEmail ??
      confirmResponse.customerEmail ??
      confirmResponse.customer?.email ??
      "unknown";

    const finalCustomerName =
      customerName ??
      confirmResponse.customerName ??
      confirmResponse.customer?.name ??
      "unknown";

    // 결제 성공
    if (confirmResponse.status === "DONE") {
      return NextResponse.json({
        success: true,
        data: confirmResponse,
      });
    }

    // 결제 성공 (status가 DONE이 아닌 경우)
    return NextResponse.json({
      success: true,
      payment: confirmResponse,
    })

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '결제 처리 중 오류가 발생했습니다'
      },
      { status: 500 }
    )
  }
}
