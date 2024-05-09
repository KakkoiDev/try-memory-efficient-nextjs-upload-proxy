import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(">>> middleware", request.method, request.url);
  return NextResponse.next();
}

export const config = {
  matcher: "/upload/:path*",
};
