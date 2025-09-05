// app/api/req/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MAIN_API } from "@/config-global";

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.json();

    const url = `${MAIN_API}/api/user/update`;
    const currentToken = (await cookies()).get("token")?.value;
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify(incoming),
    });

    // Upstream response body (аль болох JSON гэж үзэв)
    const data = await upstream.json().catch(() => null);

    // Клиент рүү буцаах NextResponse-оо бэлдэнэ
    const res = NextResponse.json(
      data ?? { error: { message: "Empty response" } },
      { status: upstream.status }
    );

    // ✅ Хэрэв шинэ token ирсэн бол httpOnly cookie-д хадгална
    // 1) JSON талбарт ирсэн тохиолдол (жишээ: { token: "...", type: "Bearer", user: {...} })
    const newTokenFromBody: string | undefined =
      data?.token || data?.data?.token;

    // 2) Толгой мэдээллээр ирсэн fallback (жишээ: x-new-token)
    const newTokenFromHeader =
      upstream.headers.get("x-new-token") ||
      upstream.headers.get("X-New-Token") ||
      undefined;

    const newToken = newTokenFromBody ?? newTokenFromHeader;

    if (upstream.ok && newToken) {
      res.cookies.set("token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 2, // 2 цаг
      });
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error?.message ?? "Internal Server Error" } },
      { status: 500 }
    );
  }
}
