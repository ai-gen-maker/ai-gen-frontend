// 환경변수 체크 스크립트
const fs = require('fs');
const path = require('path');

console.log('🔍 환경변수 체크 중...\n');

const envPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env.local 파일이 없습니다.');
  console.log('📝 .env.local 파일을 생성하세요.\n');

  // 템플릿 출력
  console.log('필요한 환경변수:');
  console.log('- NEXTAUTH_URL');
  console.log('- NEXTAUTH_SECRET');
  console.log('- GOOGLE_CLIENT_ID');
  console.log('- GOOGLE_CLIENT_SECRET');
  console.log('- TOSS_CLIENT_KEY');
  console.log('- BACKEND_URL\n');

  process.exit(0);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const requiredVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'TOSS_CLIENT_KEY',
  'BACKEND_URL'
];

let allPresent = true;

requiredVars.forEach(varName => {
  if (!envContent.includes(varName)) {
    console.log(`❌ Missing: ${varName}`);
    allPresent = false;
  } else {
    console.log(`✅ Found: ${varName}`);
  }
});

if (allPresent) {
  console.log('\n✅ 모든 환경변수가 설정되었습니다!');
} else {
  console.log('\n⚠️  누락된 환경변수가 있습니다.');
  process.exit(1);
}
