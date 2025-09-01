// app/api/auth/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { MAIN_API } from "@/config-global";

export async function POST(req: NextRequest) {
  console.log("this works");
  const body = await req.json();

  // Танай backend login endpoint
  const res = await fetch(`${MAIN_API}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Нэвтрэх нэр, нууц үг буруу байна!" },
      { status: 401 }
    );
  }

  // Та жишээ payload өгсөн:
  // { token, type: "Bearer", user: {...} }
  const { token, user } = await res.json();

  const c = await cookies();
  c.set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 120, // 120 минут
  });

  // Хэрэв refresh байвал энд нэмж тавина
  // c.set("refresh", data.refresh, {...})

  // Клиентэд user-г буцаах албагүй. Гэхдээ UI-д toast хийхэд ашигтай бол зөвхөн нэр/имэйл зэргийг буцааж болно.
  return NextResponse.json({ user });
}
