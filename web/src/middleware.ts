import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto");

  // Check if we need to redirect to www with HTTPS
  // Only redirect if on non-www domain
  if (host === "wilkinsoncounselling.co.uk") {
    const newUrl = `https://www.wilkinsoncounselling.co.uk${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(newUrl, {
      status: 301, // Permanent redirect
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Vercel automatically handles HTTP→HTTPS, but if we detect HTTP, redirect
  if (protocol === "http") {
    const newUrl = `https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(newUrl, {
      status: 301,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
