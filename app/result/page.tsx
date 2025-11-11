'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultPage() {
  const router = useRouter();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    // sessionStorage에서 다운로드 URL 확인
    const url = sessionStorage.getItem('downloadUrl');
    if (!url) {
      // URL이 없으면 메인으로
      alert('다운로드 정보가 없습니다');
      router.push('/');
      return;
    }
    setDownloadUrl(url);
  }, [router]);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const handleNewPlan = () => {
    // sessionStorage 초기화
    sessionStorage.clear();
    // 메인으로 이동
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl max-w-lg w-full p-8 text-center">
        {/* 성공 아이콘 */}
        <div className="text-6xl mb-4">✅</div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          사업계획서 생성 완료!
        </h1>

        {/* 안내 문구 */}
        <p className="text-gray-600 mb-6">
          사업계획서가 성공적으로 생성되었습니다
        </p>

        {/* 다운로드 버튼 */}
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white w-full py-4 text-lg font-bold rounded-lg mb-4 hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
        >
          사업계획서 다운로드
        </button>

        {/* 새로 만들기 버튼 */}
        <button
          onClick={handleNewPlan}
          className="bg-white border-2 border-gray-300 w-full py-4 text-lg font-medium rounded-lg hover:bg-gray-50 transition-all"
        >
          새로운 사업계획서 만들기
        </button>

        {/* 뒤로가기 */}
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
