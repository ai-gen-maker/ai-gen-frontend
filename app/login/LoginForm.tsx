"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  callbackUrl?: string;
};

export default function LoginForm({ callbackUrl = "/checkout" }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    const targetUrl = callbackUrl || "/checkout";

    setError(null);

    startTransition(async () => {
      try {
        await signIn("google", { callbackUrl: targetUrl });
        // 리다이렉트는 NextAuth가 처리
      } catch (err) {
        console.error("[LoginForm] signIn error:", err);
        setError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    });
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-xl font-semibold">
          AI-GEN 로그인
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Google 계정으로 로그인하면 결제 페이지로 이동합니다.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
        >
          {isPending ? "로그인 중..." : "Google 계정으로 로그인"}
        </button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
