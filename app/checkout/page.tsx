import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('[CheckoutPage] Called at:', new Date().toISOString());
  console.log('[CheckoutPage] searchParams:', searchParams);

  // 서버에서 세션 확인
  const session = await getServerSession(authOptions);

  console.log('[CheckoutPage] Session exists:', !!session);
  console.log('[CheckoutPage] Session user:', session?.user?.email || 'none');

  // 미인증 상태: 로그인 페이지로 리디렉션
  if (!session || !session.user) {
    console.log('[CheckoutPage] No session - redirecting to /login?callbackUrl=/checkout');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    redirect("/login?callbackUrl=/checkout");
  }

  console.log('[CheckoutPage] Session valid - rendering CheckoutForm');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // 인증된 상태: CheckoutForm 렌더링
  const error =
    typeof searchParams.error === "string" ? searchParams.error : undefined;

  return <CheckoutForm user={session.user} error={error} />;
}
