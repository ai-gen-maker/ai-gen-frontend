// app/login/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm";

// ✅ 검색 파라미터를 매 요청마다 읽도록 보장
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function LoginPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  // 🔍 raw searchParams 로그
  console.log("[LoginPage] raw searchParams:", searchParams);

  // 1) URL에서 callbackUrl 추출
  let callbackUrlFromParams: string | undefined;

  const raw = searchParams?.callbackUrl;

  if (typeof raw === "string") {
    callbackUrlFromParams = raw;
  } else if (Array.isArray(raw) && raw.length > 0) {
    callbackUrlFromParams = raw[0];
  }

  // 2) 최종 callbackUrl 계산
  const callbackUrl =
    callbackUrlFromParams && callbackUrlFromParams.length > 0
      ? callbackUrlFromParams
      : "/";

  console.log("[LoginPage] computed callbackUrl:", callbackUrl);
  console.log("[LoginPage] Session exists:", !!session);

  // 이미 로그인된 상태라면 바로 callbackUrl로 보냄
  if (session) {
    console.log("[LoginPage] Already logged in - redirecting to:", callbackUrl);
    redirect(callbackUrl);
  }

  // 로그인 안 되어 있으면 LoginForm에 정확히 전달
  console.log(
    "[LoginPage] No session - rendering LoginForm with callbackUrl:",
    callbackUrl
  );
  return <LoginForm callbackUrl={callbackUrl} />;
}
