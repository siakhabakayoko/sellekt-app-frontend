import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/logon'
    }
  }
);

export const config = {
  matcher: [
    "/blog/create",
    //"/dashboard/blogs/create",
   // "/dashboard/:path*"
  ]
}; 