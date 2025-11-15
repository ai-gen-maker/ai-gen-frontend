import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LoginPage({ searchParams }: PageProps) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('[LoginPage] Called at:', new Date().toISOString());
  console.log('[LoginPage] searchParams:', searchParams);

  // 서버에서 세션 확인
  const session = await getServerSession(authOptions);

  console.log('[LoginPage] Session exists:', !!session);
  console.log('[LoginPage] Session user:', session?.user?.email || 'none');

  // 이미 로그인된 경우 callbackUrl로 리디렉션
  if (session) {
    const callbackUrl =
      typeof searchParams.callbackUrl === "string"
        ? searchParams.callbackUrl
        : "/";
    console.log('[LoginPage] Already logged in - redirecting to:', callbackUrl);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    redirect(callbackUrl);
  }

  // 미인증 상태: 로그인 폼 렌더링
  const callbackUrl =
    typeof searchParams.callbackUrl === "string"
      ? searchParams.callbackUrl
      : "/";

  console.log('[LoginPage] No session - rendering LoginForm with callbackUrl:', callbackUrl);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return <LoginForm callbackUrl={callbackUrl} />;
}
