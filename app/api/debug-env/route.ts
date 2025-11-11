export async function GET() {
  return Response.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
    hasSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  });
}
