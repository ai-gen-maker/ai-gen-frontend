export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">환불 정책</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              와처스 주식회사는 고객님의 권익 보호를 위해 전자상거래법 및 소비자기본법에 따라 다음과 같은 환불 정책을 운영합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. 환불 가능 기간</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>결제 완료 후 7일 이내</li>
              <li>전자상거래법 제17조(청약철회)에 따른 기간</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. 환불 조건</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
              <p className="font-semibold text-blue-900">✓ 100% 환불 가능한 경우</p>
              <p className="text-blue-800 mt-2">사업계획서 문서 생성이 시작되기 전</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
              <p className="font-semibold text-red-900">✗ 환불 불가능한 경우</p>
              <p className="text-red-800 mt-2">사업계획서 문서 다운로드가 완료된 경우</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. 환불 처리 기간</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>환불 승인 후 영업일 기준 3일 이내 처리</li>
              <li>결제 수단으로 자동 환불 (카드 취소 또는 계좌 입금)</li>
              <li>카드 결제의 경우 카드사 정책에 따라 영업일 3-5일 소요 가능</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. 환불 신청 방법</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">다음 연락처로 환불 신청해주세요:</p>
              <div className="space-y-2">
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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. 환불 시 필요한 정보</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>주문번호 (결제 시 발급된 ORDER-xxxxx)</li>
              <li>결제자 이름</li>
              <li>결제 금액</li>
              <li>결제 일시</li>
              <li>환불 사유</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. 기타 사항</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>부분 환불은 불가능하며, 전액 환불만 가능합니다</li>
              <li>환불 수수료는 발생하지 않습니다</li>
              <li>허위 또는 부당한 환불 요청 시 거부될 수 있습니다</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                본 환불 정책은 전자상거래법 제17조(청약철회), 제18조(청약철회의 효과) 및 
                소비자기본법에 근거합니다. 환불 정책에 대한 문의사항이 있으시면 
                고객센터로 연락 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
