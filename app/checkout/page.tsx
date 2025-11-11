'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const PRICE = 79000;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // 에러 처리
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      const errorMessages: Record<string, string> = {
        'payment_failed': '결제가 취소되었습니다',
        'invalid_params': '잘못된 결제 정보입니다',
        'confirmation_failed': '결제 승인에 실패했습니다',
        'server_error': '서버 오류가 발생했습니다',
      };

      alert(errorMessages[error] || '결제 중 오류가 발생했습니다');

      // URL에서 error 파라미터 제거
      window.history.replaceState({}, '', '/checkout');
    }
  }, [searchParams]);

  const handlePayment = async () => {
    if (!name || !email || !phone) {
      alert('모든 필드를 입력해주세요');
      return;
    }

    if (!session?.user) {
      alert('로그인이 필요합니다');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      // Toss Payments 초기화
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!
      );

      // 주문 ID 생성
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // 결제 정보 저장
      sessionStorage.setItem('paymentInfo', JSON.stringify({
        orderId,
        name,
        email,
        phone,
        amount: PRICE,
      }));

      // 결제 창 열기
      await tossPayments.requestPayment('카드', {
        amount: PRICE,
        orderId: orderId,
        orderName: '사업계획서 초안 작성',
        customerName: name,
        customerEmail: email,
        successUrl: `${window.location.origin}/api/payment/success`,
        failUrl: `${window.location.origin}/checkout?error=payment_failed`,
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert('결제 처리 중 오류가 발생했습니다');
      setLoading(false);
    }
  };

  const isFormValid = name && email && phone;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl max-w-lg w-full p-8">
        {/* 로고 */}
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-2">
          AI-GEN
        </h1>

        {/* 제목 */}
        <h2 className="text-2xl text-gray-800 font-bold text-center mb-8">
          결제
        </h2>

        {/* 주문 정보 */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">주문 정보</h3>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">사업계획서 초안 작성</span>
            <span className="text-2xl font-bold text-blue-600">
              {PRICE.toLocaleString()}원
            </span>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">총 금액</span>
            <span className="text-2xl font-bold text-gray-800">
              {PRICE.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제 정보 입력 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">결제 정보</h3>

          {/* 이름 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              이름 *
            </label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 이메일 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              이메일 *
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 전화번호 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              전화번호 *
            </label>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          disabled={!isFormValid || loading}
          className={`w-full py-4 text-lg font-bold rounded-lg transition-all duration-200 ${
            isFormValid && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? '처리 중...' : 'Toss Payments로 결제하기'}
        </button>

        {/* 안내 문구 */}
        <p className="text-sm text-gray-500 text-center mt-4">
          결제 완료 후 사업계획서 생성이 시작됩니다
        </p>

        {/* 뒤로가기 */}
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            ← 로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
