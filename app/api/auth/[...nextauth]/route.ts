import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // pages 설정 임시 주석 처리 (디버깅용)
  // pages: {
  //   signIn: "/login",
  // },

  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('[NextAuth redirect] Called!');
      console.log('[NextAuth redirect] url:', url);
      console.log('[NextAuth redirect] baseUrl:', baseUrl);

      // 1) 상대 경로 (/checkout, /progress 등)
      if (url.startsWith("/")) {
        const result = `${baseUrl}${url}`;
        console.log('[NextAuth redirect] Case 1: Relative path');
        console.log('[NextAuth redirect] Returning:', result);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        return result;
      }

      // 2) 같은 도메인의 절대 URL
      try {
        const targetUrl = new URL(url);
        const baseUrlObj = new URL(baseUrl);

        console.log('[NextAuth redirect] Case 2: Absolute URL');
        console.log('[NextAuth redirect] Parsed targetUrl:', targetUrl.href);
        console.log('[NextAuth redirect] Parsed baseUrl:', baseUrlObj.href);
        console.log('[NextAuth redirect] targetUrl.origin:', targetUrl.origin);
        console.log('[NextAuth redirect] baseUrlObj.origin:', baseUrlObj.origin);

        // 같은 origin이면 허용
        if (targetUrl.origin === baseUrlObj.origin) {
          console.log('[NextAuth redirect] Same origin - Returning:', url);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          return url;
        }
      } catch (error) {
        console.log('[NextAuth redirect] URL parse error:', error);
        // URL 파싱 실패 시 무시하고 계속 진행
      }

      // 3) 외부 도메인이거나 파싱 실패한 경우 baseUrl로 방어
      console.log('[NextAuth redirect] Case 3: Fallback to baseUrl');
      console.log('[NextAuth redirect] Returning:', baseUrl);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return baseUrl;
    },

    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.userId = account.providerAccountId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error - next-auth 기본 타입에 id가 없어서
        session.user.id = token.userId as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
