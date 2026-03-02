import { NextRequest, NextResponse } from "next/server";

import { MAIN_API } from "@/config-global";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const url = `${MAIN_API}/api/auth/login`;
  console.log(url, "URL");
  const apiRes = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  console.log(apiRes, "APIRES")
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
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    // no domain
  });
  return res;
}
