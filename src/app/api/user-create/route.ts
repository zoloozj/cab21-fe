import axios from "axios";
import { MAIN_API } from "@/config-global";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = `${MAIN_API}/api/user/create`;
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(response.data);
  } catch (e: any) {
    console.log(e, "ERROR");
    return NextResponse.json(
      { error: e.response.data.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
