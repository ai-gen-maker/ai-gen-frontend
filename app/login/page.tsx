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
  const params = await searchParams;

  // URL에서 callbackUrl 추출
  let callbackUrlFromParams: string | undefined;
  const raw = params?.callbackUrl;

  if (typeof raw === "string") {
    callbackUrlFromParams = raw;
  } else if (Array.isArray(raw) && raw.length > 0) {
    callbackUrlFromParams = raw[0];
  }

  // 최종 callbackUrl 계산
  const callbackUrl =
    callbackUrlFromParams && callbackUrlFromParams.length > 0
      ? callbackUrlFromParams
      : "/";

  if (session) {
    redirect(callbackUrl);
  }

  return <LoginForm callbackUrl={callbackUrl} />;
}
