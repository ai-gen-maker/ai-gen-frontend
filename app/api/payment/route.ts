import { NextRequest, NextResponse } from 'next/server'

const EXPECTED_AMOUNT = 79000;

export async function POST(request: NextRequest) {
  try {
    // ✅ 환경변수 디버그 로그 추가
    const secretKey = process.env.TOSS_SECRET_KEY;
    console.log("[Payment Debug] Environment check:", {
      defined: !!secretKey,
      prefix: secretKey ? secretKey.slice(0, 10) : null,
      length: secretKey ? secretKey.length : 0,
      nodeEnv: process.env.NODE_ENV,
    });

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
      console.error('[Payment] Amount mismatch:', {
        received: amount,
        parsed: parsedAmount,
        expected: EXPECTED_AMOUNT,
        orderId,
      });

      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
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
          amount: EXPECTED_AMOUNT,
        }),
      }
    )

    const confirmResponse = await response.json()

    if (!response.ok) {
      console.error('Payment API error:', confirmResponse)
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
      // 결제 성공 로그 (운영/법적 기록용)
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(
        "[PAYMENT SUCCESS]",
        JSON.stringify(
          {
            orderId: orderId,
            paymentKey: paymentKey,
            amount: EXPECTED_AMOUNT,
            customerEmail: finalCustomerEmail,
            customerName: finalCustomerName,
            timestamp: new Date().toISOString(),
            status: "paid",
          },
          null,
          2,
        ),
      );
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

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
