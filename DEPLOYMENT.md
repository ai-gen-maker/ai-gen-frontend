# AI-GEN 배포 가이드

## 환경변수 설정

### Vercel 환경변수

1. NEXTAUTH_URL - 프로덕션 도메인
2. NEXTAUTH_SECRET - openssl rand -base64 32로 생성
3. GOOGLE_CLIENT_ID - Google Cloud에서 복사
4. GOOGLE_CLIENT_SECRET - Google Cloud에서 복사
5. NEXT_PUBLIC_TOSS_CLIENT_KEY - 프로덕션 키
6. TOSS_SECRET_KEY - 프로덕션 시크릿
7. NEXT_PUBLIC_BACKEND_URL - Render URL

### 보안 체크리스트

- [ ] .env.local을 .gitignore에 추가됨
- [ ] NEXTAUTH_SECRET 새로 생성
- [ ] Google OAuth Redirect URI 추가
- [ ] Toss Payments 프로덕션 키 발급
- [ ] 모든 환경변수 Vercel에 등록
