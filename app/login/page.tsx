import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LoginPage({ searchParams }: PageProps) {
  // 서버에서 세션 확인
  const session = await getServerSession(authOptions);

  // 이미 로그인된 경우 callbackUrl로 리디렉션
  if (session) {
    const callbackUrl =
      typeof searchParams.callbackUrl === "string"
        ? searchParams.callbackUrl
        : "/";
    redirect(callbackUrl);
  }

  // 미인증 상태: 로그인 폼 렌더링
  const callbackUrl =
    typeof searchParams.callbackUrl === "string"
      ? searchParams.callbackUrl
      : "/";

  return <LoginForm callbackUrl={callbackUrl} />;
}
