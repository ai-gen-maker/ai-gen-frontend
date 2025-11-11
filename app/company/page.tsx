import Link from 'next/link'

export default function CompanyInfo() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">회사소개</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">와처스 주식회사</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              와처스 주식회사는 AI 기술을 활용한 R&D 컨설팅 전문 기업입니다.
              14년간의 정부지원사업 컨설팅 경험을 바탕으로 AI-GEN 서비스를 개발하여,
              누구나 쉽고 빠르게 전문적인 사업계획서를 작성할 수 있도록 돕고 있습니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">AI-GEN 서비스</h2>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="text-gray-900 font-semibold mb-4">AI 기반 사업계획서 생성 서비스</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>평균 15분 이내 70페이지 분량의 완성된 사업계획서 생성</li>
                <li>실시간 웹 검색을 통한 최신 시장 정보 반영</li>
                <li>경쟁사 분석 및 시장 동향 자동 분석</li>
                <li>차트와 표를 포함한 전문적인 문서 구성</li>
                <li>DOCX 형식으로 다운로드하여 자유롭게 편집 가능</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">핵심 가치</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-purple-900 text-xl mb-3">전문성</h3>
                <p className="text-purple-800">
                  14년간의 R&D 컨설팅 노하우를 AI에 담아 전문가 수준의 사업계획서를 제공합니다.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 text-xl mb-3">효율성</h3>
                <p className="text-blue-800">
                  수일이 걸리던 사업계획서 작성을 15분으로 단축하여 시간과 비용을 절약합니다.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 text-xl mb-3">정확성</h3>
                <p className="text-green-800">
                  실시간 웹 검색으로 최신 시장 정보와 경쟁사 분석을 정확하게 반영합니다.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-yellow-900 text-xl mb-3">편의성</h3>
                <p className="text-yellow-800">
                  간단한 정보 입력만으로 완성된 사업계획서를 받아보고 자유롭게 편집할 수 있습니다.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">회사 정보</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 mb-2">
                    <span className="font-semibold">회사명:</span> 와처스 주식회사
                  </p>
                  <p className="text-gray-900 mb-2">
                    <span className="font-semibold">대표자:</span> 여철기
                  </p>
                  <p className="text-gray-900 mb-2">
                    <span className="font-semibold">설립:</span> 2016년
                  </p>
                </div>
                <div>
                  <p className="text-gray-900 mb-2">
                    <span className="font-semibold">사업자등록번호:</span> 125-86-31413
                  </p>
                  <p className="text-gray-900 mb-2">
                    <span className="font-semibold">통신판매업:</span> 제 2025-서울강남-04444호
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-gray-900 mb-2">
                  <span className="font-semibold">주소:</span> 서울 강남구 선릉로100길 30 유니콘빌딩 지하1층 에이-7호
                </p>
                <p className="text-gray-900 mb-2">
                  <span className="font-semibold">전화:</span> 050-6544-3508
                </p>
                <p className="text-gray-900 mb-2">
                  <span className="font-semibold">이메일:</span>{' '}
                  <a href="mailto:okmister365@gmail.com" className="text-blue-600 hover:underline">
                    okmister365@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">비전</h2>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                와처스 주식회사는 AI 기술을 통해 모든 창업가와 사업가가
                전문적인 사업계획서를 쉽고 빠르게 작성할 수 있는 세상을 만들어갑니다.
                우리의 목표는 혁신적인 아이디어를 가진 모든 이들이
                문서 작성의 어려움 없이 사업에만 집중할 수 있도록 돕는 것입니다.
              </p>
            </div>

            <div className="bg-blue-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-xl font-bold mb-2">AI-GEN과 함께</p>
              <p className="text-lg">당신의 비즈니스를 성공으로 이끄세요</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
