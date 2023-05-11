import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  (req) => {
    console.log(req);
    if (
      req.nextUrl.pathname.startsWith("/company") &&
      req.nextauth.token?.role !== "COMPANY"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url),
      );
    if (
      req.nextUrl.pathname.startsWith("/profile") &&
      req.nextauth.token?.role !== "USER"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url),
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
  },
);

export const config = {
  matcher: ["/company/:path*", "/profile/:path*"],
};
