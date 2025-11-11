'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Section {
  number: number;
  title: string;
  content: string;
}

export default function ProgressPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('생성 준비 중...');
  const [sections, setSections] = useState<Section[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // sessionStorage에서 데이터 가져오기
    const formDataStr = sessionStorage.getItem('formData');
    const paymentInfoStr = sessionStorage.getItem('paymentInfo');

    if (!formDataStr || !paymentInfoStr) {
      alert('입력 정보가 없습니다');
      router.push('/');
      return;
    }

    const formData = JSON.parse(formDataStr);
    const paymentInfo = JSON.parse(paymentInfoStr);

    if (!paymentInfo.paid) {
      alert('결제가 완료되지 않았습니다');
      router.push('/checkout');
      return;
    }

    // URL 쿼리 파라미터 생성
    const params = new URLSearchParams({
      projectName: formData.projectName,
      competitors: formData.competitors || '',
      differentiation: formData.differentiation || '',
      targetRegion: formData.targetRegion || '국내',
      targetCustomer: formData.targetCustomer || 'B2C',
      currentStage: formData.currentStage || '아이디어',
      fundingNeeded: formData.fundingNeeded || '1억원 미만',
    });

    // 백엔드 URL (/ 중복 방지)
    const backendUrl = (
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004'
    ).replace(/\/$/, '');

    // SSE 연결
    const eventSource = new EventSource(
      `${backendUrl}/api/generate/stream?${params}`
    );

    eventSource.onopen = () => {
      console.log('SSE connected');
    };

    eventSource.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      if (data.type === 'progress') {
        setProgress(data.progress);
        setStatusMessage(data.message);
      }

      if (data.type === 'section') {
        setSections((prev) => [
          ...prev,
          {
            number: data.sectionNumber,
            title: data.title,
            content: data.content,
          },
        ]);
      }

      if (data.type === 'complete') {
        setProgress(100);
        setStatusMessage('생성 완료!');
        setDownloadUrl(`${backendUrl}${data.downloadUrl}`);
        eventSource.close();
      }

      if (data.type === 'error') {
        setError(data.error);
        setStatusMessage('오류 발생');
        eventSource.close();
      }
    });

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      setError('서버 연결 오류');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [router]);

  // 섹션 추가 시 자동 스크롤
  useEffect(() => {
    if (sections.length > 0) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [sections]);

  // 오류 처리
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-red-600 text-xl font-bold mb-4">⚠️ 오류 발생</div>
          <div className="text-gray-700 mb-6">{error}</div>
          <Link href="/" className="text-blue-600 hover:underline">
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <h1 className="text-3xl text-white font-bold text-center mb-4">
          AI-GEN
        </h1>
        <h2 className="text-2xl text-white font-bold text-center mb-8">
          사업계획서 생성 중...
        </h2>

        {/* 진행률 바 카드 */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="text-lg font-semibold text-gray-700 mb-2">진행률</div>

          {/* 진행률 바 */}
          <div className="bg-gray-200 rounded-full h-4 w-full">
            <div
              className="bg-blue-600 rounded-full h-4 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* 진행률 텍스트 */}
          <div className="text-center mt-2 font-bold text-gray-700">
            {progress}%
          </div>

          {/* 상태 메시지 */}
          <div className="text-sm text-gray-600 text-center mt-2">
            {statusMessage}
          </div>
        </div>

        {/* 미리보기 섹션들 */}
        {sections.map((section) => (
          <div
            key={section.number}
            className="bg-white rounded-xl shadow-lg p-6 mb-4"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {section.number}. {section.title}
            </h3>
            <div className="text-gray-700 whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}

        {/* 완료 시 다운로드 카드 */}
        {progress === 100 && downloadUrl && (
          <div className="bg-white rounded-xl shadow-xl p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-4">
              ✅ 생성 완료!
            </div>
            <button
              onClick={() => window.open(downloadUrl, '_blank')}
              className="bg-blue-600 text-white px-8 py-4 text-lg font-bold rounded-lg hover:bg-blue-700 hover:shadow-xl transition-all"
            >
              사업계획서 다운로드
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
