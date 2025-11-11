import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 환경 설정
  environment: process.env.NODE_ENV,

  // 성능 모니터링
  tracesSampleRate: 1.0,

  // 에러 샘플링
  sampleRate: 1.0,

  // 브레드크럼 설정
  beforeBreadcrumb(breadcrumb) {
    // 민감한 정보 필터링
    if (breadcrumb.category === 'console') {
      return null
    }
    return breadcrumb
  },

  // 이벤트 필터링
  beforeSend(event) {
    // 개발 환경에서는 전송 안 함
    if (process.env.NODE_ENV === 'development') {
      return null
    }
    return event
  },
})
