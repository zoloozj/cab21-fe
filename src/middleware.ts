// middleware.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser, verifyJwtHS512 } from "./lib/auth";

const PROTECTED_ROUTES = [
  "/driver-travel",
  "/cab",
  "/profile",
  "/edit-user",
  "/my-rides",
  "/my-booking",
]; // add all private routes here

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const valid = token && (await verifyJwtHS512(token));

  // Check if request matches any protected route
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const hdrs = await headers();
  const protocol = hdrs.get("x-forwarded-proto") || "http";
  const host = hdrs.get("host")!;
  const baseUrl = `${protocol}://${host}`;

  if (isProtected && !valid) {
    const loginUrl = new URL("/auth/login", baseUrl);
    loginUrl.searchParams.set("from", pathname); // redirect back after login
    return NextResponse.redirect(loginUrl);
  } else {
    if (pathname.startsWith("/auth") && valid) {
      const homeUrl = new URL("/", baseUrl);
      return NextResponse.redirect(homeUrl);
    }
  }

  const user = await getCurrentUser();
  if (pathname.startsWith("/admin") && user?.role !== "admin") {
    const homeUrl = new URL("/", baseUrl);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|runtime.ts|robots.txt|sitemap.xml|api/auth).*)", // exclude internal
  ],
};
