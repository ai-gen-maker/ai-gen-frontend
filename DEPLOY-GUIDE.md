# 배포 가이드

## 1. GitHub 저장소 생성 및 푸시

1. https://github.com/new 접속
2. Repository name: ai-gen-frontend
3. Private 선택
4. Create repository

터미널:
```bash
git remote add origin https://github.com/your-username/ai-gen-frontend.git
git branch -M main
git push -u origin main
```

## 2. Google OAuth Redirect URI 추가

Google Cloud Console:
- OAuth 2.0 Client ID 선택
- 승인된 리디렉션 URI 추가: https://your-app.vercel.app/api/auth/callback/google

## 3. Vercel 배포

1. https://vercel.com 접속
2. GitHub 로그인
3. New Project
4. ai-gen-frontend 선택
5. 환경변수 입력
6. Deploy

환경변수:
- NEXTAUTH_URL=https://your-app.vercel.app
- NEXTAUTH_SECRET=openssl rand -base64 32로 생성
- GOOGLE_CLIENT_ID=기존값
- GOOGLE_CLIENT_SECRET=기존값
- NEXT_PUBLIC_TOSS_CLIENT_KEY=테스트키
- TOSS_SECRET_KEY=테스트키
- NEXT_PUBLIC_BACKEND_URL=백엔드URL

## 4. 배포 후 확인

- 메인 페이지 접속
- Google 로그인 테스트
- 결제 테스트
- 전체 플로우 확인

## 5. 프로덕션 전환

- Toss Payments 프로덕션 키 발급
- 환경변수 업데이트
