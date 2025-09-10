// app/api/auth/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { MAIN_API } from "@/config-global";

export async function POST(req: NextRequest) {
  const body = await req.json();

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

  // Та жишээ payload өгсөн:
  // { token, type: "Bearer", user: {...} }
  const { token, user } = await apiRes.json();

  const isProd = process.env.NODE_ENV === "production";
  const domain = isProd ? ".zakhzeel.mn" : undefined; // локал/IP үед domain тавихгүй

  const res = NextResponse.json({ user });
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: isProd, // prod=HTTPS үед true, локал/IP үед false
    sameSite: "lax",
    path: "/",
    domain, // зөвхөн prod домэйн дээр
    maxAge: 60 * 60 * 24,
  });

  // Хэрэв refresh байвал энд нэмж тавина
  // c.set("refresh", data.refresh, {...})

  // Клиентэд user-г буцаах албагүй. Гэхдээ UI-д toast хийхэд ашигтай бол зөвхөн нэр/имэйл зэргийг буцааж болно.
  return res;
}
