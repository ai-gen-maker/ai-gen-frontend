'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 이미 로그인된 경우 리디렉션
  useEffect(() => {
    if (session) {
      router.push('/checkout');
    }
  }, [session, router]);

  // 로딩 중 표시
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  const handleLogin = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/checkout',
        redirect: false,
      });

      if (result?.error) {
        alert('로그인에 실패했습니다: ' + result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl max-w-md w-full p-8">
        {/* 로고 */}
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-2">
          AI-GEN
        </h1>

        {/* 제목 */}
        <h2 className="text-xl text-gray-600 text-center mb-8">
          로그인
        </h2>

        {/* 설명 */}
        <p className="text-gray-600 text-center mb-6">
          사업계획서 생성을 위해 로그인이 필요합니다
        </p>

        {/* Google 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-3 transition-all duration-200"
        >
          <span className="text-2xl">🔷</span>
          <span className="font-medium text-gray-700">Google로 계속하기</span>
        </button>

        {/* 안내 문구 */}
        <p className="text-sm text-gray-500 text-center mt-4">
          로그인 후 결제 페이지로 이동합니다
        </p>

        {/* 뒤로가기 링크 */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← 입력 화면으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
