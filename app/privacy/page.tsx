import Link from 'next/link'

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">개인정보처리방침</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              와처스 주식회사(이하 "회사")는 개인정보보호법에 따라 이용자의 개인정보를 보호하고 
              이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-700 mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>회원 가입 및 관리</li>
              <li>서비스 제공 (AI 기반 사업계획서 생성)</li>
              <li>결제 및 환불 처리</li>
              <li>고객 문의 응대 및 불만 처리</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. 수집하는 개인정보 항목</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-blue-900 mb-2">필수 항목</p>
              <ul className="list-disc list-inside text-blue-800 space-y-1 ml-4">
                <li>이름 (Google OAuth를 통한 자동 수집)</li>
                <li>이메일 주소 (Google OAuth를 통한 자동 수집)</li>
                <li>프로필 사진 (Google OAuth를 통한 자동 수집)</li>
                <li>결제 정보 (카드사 정보, 결제 금액, 결제 일시)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-900 mb-2">자동 수집 항목</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>IP 주소</li>
                <li>쿠키</li>
                <li>서비스 이용 기록</li>
                <li>접속 로그</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. 개인정보의 처리 및 보유 기간</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>회원 정보:</strong> 회원 탈퇴 시까지</li>
              <li><strong>결제 정보:</strong> 전자상거래법에 따라 5년</li>
              <li><strong>서비스 이용 기록:</strong> 1년</li>
              <li><strong>불만 처리 기록:</strong> 3년</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. 개인정보의 제3자 제공</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
              <p className="font-semibold text-red-900">
                회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              </p>
            </div>
            <p className="text-gray-700 mt-4">다만, 다음의 경우는 예외로 합니다:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 요구가 있는 경우</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. 개인정보 처리 위탁</h2>
            <p className="text-gray-700 mb-4">회사는 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">수탁업체</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Google LLC</td>
                    <td className="border border-gray-300 px-4 py-2">OAuth 인증</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">토스페이먼츠 (주)</td>
                    <td className="border border-gray-300 px-4 py-2">결제 처리</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. 이용자의 권리</h2>
            <p className="text-gray-700 mb-4">이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정·삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>회원 탈퇴 (개인정보 삭제)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. 개인정보 보호책임자</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2">
                <p className="text-gray-900">
                  <span className="font-semibold">책임자:</span> 여철기
                </p>
                <p className="text-gray-900">
                  <span className="font-semibold">이메일:</span>{' '}
                  <a href="mailto:okmister365@gmail.com" className="text-blue-600 hover:underline">
                    okmister365@gmail.com
                  </a>
                </p>
                <p className="text-gray-900">
                  <span className="font-semibold">전화:</span> 050-6544-3508
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. 개인정보의 안전성 확보 조치</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>개인정보 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보 취급 직원의 최소화 및 교육</li>
              <li>접근 통제 시스템 운영</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                <strong>시행일자:</strong> 2025년 1월 1일<br />
                본 개인정보처리방침은 관련 법령 및 정책의 변경에 따라 수정될 수 있으며, 
                변경 시 웹사이트를 통해 공지합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
