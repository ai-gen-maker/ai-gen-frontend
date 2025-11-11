'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  projectName: string;
  competitors: string;
  differentiation: string;
  targetRegion: string;
  targetCustomer: string;
  currentStage: string;
  fundingNeeded: string;
}

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    competitors: '',
    differentiation: '',
    targetRegion: '국내',
    targetCustomer: 'B2C',
    currentStage: '아이디어',
    fundingNeeded: '1억원 미만',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력 검증
    if (!formData.projectName.trim()) {
      alert('사업 아이템을 입력해주세요.');
      return;
    }

    if (formData.projectName.trim().length < 20) {
      alert('사업 아이템을 최소 20자 이상 구체적으로 작성해주세요.');
      return;
    }

    // sessionStorage에 저장
    sessionStorage.setItem('formData', JSON.stringify(formData));

    // 로그인 페이지로 이동
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 overflow-y-auto">
      {/* 헤더 */}
      <div className="pt-8 text-center">
        <h1 className="text-5xl text-white font-bold">AI-GEN</h1>
      </div>

      {/* 제목 섹션 */}
      <div className="text-center mt-12">
        <h2 className="text-4xl text-white font-bold">
          사업계획서 초안 작성 AI-Agent 서비스
        </h2>
        <p className="text-xl text-gray-200 mt-4">
          AI가 15분 안에 70페이지 분량의 사업계획서를 작성합니다
        </p>
      </div>

      {/* 입력 폼 카드 */}
      <div className="max-w-2xl mx-auto my-12 px-4">
        <div className="bg-white shadow-2xl rounded-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* 1. 사업 아이템 (필수) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                사업 아이템 *
              </label>
              <textarea
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                rows={4}
                required
                placeholder="예: AI 기반 초등학생 맞춤형 수학 학습 앱. 학생의 수준에 맞춰 개인화된 문제를 설명을 제공합니다."
                className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                구체적으로 작성할수록 더 정확한 사업계획서가 만들어집니다 (최소 20자 이상)
              </p>
            </div>

            {/* 2. 경쟁기업명 (선택) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                경쟁기업명 (선택)
              </label>
              <input
                type="text"
                name="competitors"
                value={formData.competitors}
                onChange={handleChange}
                placeholder="예: 튜이드, 매쓰프레소, 웅진씽크빅"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                쉼표(,)로 구분하여 입력해주세요
              </p>
            </div>

            {/* 3. 차별성 (선택) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                자신만의 차별성 및 경쟁우위 (선택)
              </label>
              <textarea
                name="differentiation"
                value={formData.differentiation}
                onChange={handleChange}
                rows={4}
                placeholder="예: AI 기반 실시간 난이도 조정 알고리즘으로 학습 효율 30% 향상..."
                className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                우리만의 강점, 기술적 차별점, 독특한 비즈니스 모델 등을 자유롭게 작성하세요
              </p>
            </div>

            {/* 4. 타겟 지역 (선택) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                타겟 지역 (선택)
              </label>
              <select
                name="targetRegion"
                value={formData.targetRegion}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="국내">국내</option>
                <option value="글로벌">글로벌</option>
                <option value="국내+글로벌">국내+글로벌</option>
              </select>
            </div>

            {/* 5. 타겟 고객 (선택) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                타겟 고객 (선택)
              </label>
              <select
                name="targetCustomer"
                value={formData.targetCustomer}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="B2C">B2C</option>
                <option value="B2B">B2B</option>
                <option value="B2B2C">B2B2C</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {/* 6. 현재 단계 (선택) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                현재 단계 (선택)
              </label>
              <select
                name="currentStage"
                value={formData.currentStage}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="아이디어">아이디어</option>
                <option value="MVP">MVP</option>
                <option value="프로토타입">프로토타입</option>
                <option value="제품화">제품화</option>
                <option value="상용화">상용화</option>
              </select>
            </div>

            {/* 7. 필요 자금 (선택) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                필요 자금 (선택)
              </label>
              <select
                name="fundingNeeded"
                value={formData.fundingNeeded}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1억원 미만">1억원 미만</option>
                <option value="1~5억 원">1~5억 원</option>
                <option value="5~20억 원">5~20억 원</option>
                <option value="20억 원 이상">20억 원 이상</option>
              </select>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full py-4 text-lg bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
            >
              사업계획서 생성하기 (79,000원)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
