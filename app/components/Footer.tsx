'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">와처스 주식회사</h3>
            <div className="space-y-2 text-sm">
              <p>대표자: 여철기</p>
              <p>사업자등록번호: 125-86-31413</p>
              <p>통신판매업: 제 2025-서울강남-04444호</p>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">연락처</h3>
            <div className="space-y-2 text-sm">
              <p>전화: 050-6544-3508</p>
              <p>이메일: okmister365@gmail.com</p>
              <p className="text-xs mt-4">
                서울 강남구 선릉로100길 30<br />
                유니콘빌딩 지하1층 에이-7호
              </p>
            </div>
          </div>

          {/* 법적 문서 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">약관 및 정책</h3>
            <div className="space-y-2 text-sm">
              <Link href="/terms" className="block hover:text-white transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="block hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/refund" className="block hover:text-white transition-colors">
                환불정책
              </Link>
              <Link href="/company" className="block hover:text-white transition-colors">
                회사소개
              </Link>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 와처스 주식회사. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">
            AI-GEN은 와처스 주식회사의 AI 기반 사업계획서 작성 서비스입니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
