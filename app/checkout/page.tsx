import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  // 서버에서 세션 확인
  const session = await getServerSession(authOptions);

  // 미인증 상태: 로그인 페이지로 리디렉션
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  // 인증된 상태: CheckoutForm 렌더링
  const error =
    typeof searchParams.error === "string" ? searchParams.error : undefined;

  return <CheckoutForm user={session.user} error={error} />;
}
