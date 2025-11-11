import Link from 'next/link'

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">이용약관</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 와처스 주식회사(이하 "회사")가 제공하는 AI-GEN 서비스(이하 "서비스")의
              이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을
              규정함을 목적으로 합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제2조 (정의)</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>"서비스"</strong>란 회사가 제공하는 AI 기반 사업계획서 생성 서비스를 의미합니다.</li>
              <li><strong>"이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원을 의미합니다.</li>
              <li><strong>"회원"</strong>이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
              <li><strong>"콘텐츠"</strong>란 서비스를 통해 생성되는 사업계획서 문서를 의미합니다.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제3조 (약관의 명시 및 변경)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ① 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ② 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며,
              변경된 약관은 서비스 화면에 공지하고 공지 후 7일이 경과한 시점부터 효력이 발생합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제4조 (서비스의 제공)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 다음과 같은 서비스를 제공합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>AI 기반 사업계획서 자동 생성</li>
              <li>생성된 사업계획서 DOCX 파일 다운로드</li>
              <li>기타 회사가 추가 개발하거나 제공하는 서비스</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제5조 (회원가입)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ① 회원가입은 Google OAuth를 통해 진행됩니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ② 이용자는 회원가입 시 본 약관 및 개인정보처리방침에 동의해야 합니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ③ 회사는 다음 각 호의 경우 회원가입을 거부할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>타인의 정보를 도용한 경우</li>
              <li>허위 정보를 기재한 경우</li>
              <li>기타 회사가 정한 기준에 부합하지 않는 경우</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제6조 (서비스 이용 요금)</h2>
            <div className="bg-blue-50 p-6 rounded-lg my-4">
              <p className="text-gray-900 mb-2">
                <strong>기본 요금:</strong> 79,000원 (부가세 포함)
              </p>
              <p className="text-gray-700 text-sm">
                1회 결제 시 1개의 사업계획서를 생성할 수 있습니다.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제7조 (결제 방법)</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>신용카드 결제</li>
              <li>간편결제 (토스페이, 네이버페이, 카카오페이 등)</li>
              <li>기타 회사가 제공하는 결제 수단</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제8조 (환불 정책)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              환불 정책은 별도의 환불정책 페이지에 명시된 내용을 따릅니다.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-900">
                <strong>주요 환불 조건:</strong>
              </p>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 ml-4 mt-2">
                <li>결제 후 7일 이내</li>
                <li>문서 생성 전: 100% 환불</li>
                <li>문서 다운로드 후: 환불 불가</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제9조 (서비스의 중단)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ① 회사는 다음 각 호의 경우 서비스 제공을 일시적으로 중단할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>시스템 점검, 보수, 교체 등이 필요한 경우</li>
              <li>정전, 서비스 설비의 장애, 서비스 이용 폭주 등으로 정상적인 서비스 제공이 어려운 경우</li>
              <li>천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제10조 (저작권 및 지식재산권)</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
              <p className="font-semibold text-red-900 mb-2">중요 고지사항</p>
              <ul className="list-disc list-inside text-red-800 space-y-2 ml-4">
                <li>서비스를 통해 생성된 사업계획서의 저작권은 이용자에게 귀속됩니다.</li>
                <li>단, AI가 생성한 콘텐츠의 특성상 법적 효력이나 정확성을 보장하지 않습니다.</li>
                <li>생성된 사업계획서는 참고 자료로만 활용되어야 하며, 실제 사용 전 전문가의 검토가 필요합니다.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제11조 (면책 조항)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는
              서비스 제공에 관한 책임이 면제됩니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ③ 회사는 AI가 생성한 콘텐츠의 정확성, 완전성, 신뢰성 등을 보증하지 않으며,
              이용자는 생성된 콘텐츠를 참고 자료로만 활용해야 합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제12조 (분쟁 해결)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ① 회사와 이용자 간 발생한 분쟁은 전자상거래 등에서의 소비자보호에 관한 법률에 따라
              한국소비자원 또는 전자거래분쟁조정위원회의 조정을 거칠 수 있습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ② 본 약관과 관련하여 분쟁이 발생한 경우 회사의 본점 소재지를 관할하는 법원을
              전속적 합의관할법원으로 합니다.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                <strong>부칙</strong><br />
                본 약관은 2025년 1월 1일부터 시행됩니다.
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold mb-2">문의사항:</p>
                <p>이메일: okmister365@gmail.com</p>
                <p>전화: 050-6544-3508</p>
                <p>주소: 서울 강남구 선릉로100길 30 유니콘빌딩 지하1층 에이-7호</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
