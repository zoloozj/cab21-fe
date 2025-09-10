import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { MAIN_API } from "@/config-global";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(`${MAIN_API}/api/auth/login`, "URL");
  // Танай backend login endpoint
  const apiRes = await fetch(`${MAIN_API}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!apiRes.ok) {
    return NextResponse.json(
      { message: "Нэвтрэх нэр, нууц үг буруу байна!" },
      { status: 401 }
    );
  }

  const { token, user } = await apiRes.json();
  const isProd = process.env.NODE_ENV === "production";

  const res = NextResponse.json({ user });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    // no domain
  });
  return res;
}
