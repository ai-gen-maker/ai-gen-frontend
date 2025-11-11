# AI-GEN 프론트엔드

AI 기반 사업계획서 초안 작성 서비스

## 기술 스택
- Next.js 16.0.1 (Turbopack)
- TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)
- Toss Payments
- Sentry

## 주요 기능
- Google OAuth 로그인
- Toss Payments 결제
- 실시간 진행률 표시 (SSE)
- 사업계획서 생성 및 다운로드

## 로컬 개발

1. 저장소 클론
2. 환경변수 설정: cp .env.example .env.local
3. 패키지 설치: npm install
4. 개발 서버 실행: npm run dev
5. 브라우저 접속: http://localhost:3005

## 배포
DEPLOYMENT.md 참고

## 라이선스
MIT
