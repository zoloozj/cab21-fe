// app/api/cabs/me/route.ts
import { cookies } from "next/headers";
import { MAIN_API } from "@/config-global";
import { verifyJwtHS512 } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const payload = await verifyJwtHS512(token);
    const uid = Number((payload as any)?.uid);

    if (!Number.isFinite(uid)) {
      return NextResponse.json({ error: "Invalid uid" }, { status: 400 });
    }
    const apiRes = await fetch(`${MAIN_API}/api/cabs/user/${uid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: `Upstream ${apiRes.status}` },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/cabs/me failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
