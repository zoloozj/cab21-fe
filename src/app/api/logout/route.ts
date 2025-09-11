// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const isProd = process.env.NODE_ENV === "production";
  const cookieStore = cookies();

  // ✅ Delete the existing cookie (must match original path/domain)
  (await cookieStore).delete({ name: "token", path: "/" });

  // ✅ Also set an immediate-expiry cookie as a belt-and-suspenders fallback
  (await cookieStore).set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expire now
  });

  return NextResponse.json({ ok: true });
}
