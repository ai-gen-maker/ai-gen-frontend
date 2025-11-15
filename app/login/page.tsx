// app/login/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  // ✅ searchParams를 await로 받기
  const params = await searchParams;

  console.log("[LoginPage] raw searchParams:", params);

  // 1) URL에서 callbackUrl 추출
  let callbackUrlFromParams: string | undefined;
  const raw = params?.callbackUrl;

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

  if (session) {
    console.log("[LoginPage] Already logged in - redirecting to:", callbackUrl);
    redirect(callbackUrl);
  }

  console.log(
    "[LoginPage] No session - rendering LoginForm with callbackUrl:",
    callbackUrl
  );
  return <LoginForm callbackUrl={callbackUrl} />;
}
