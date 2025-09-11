import axios from "axios";
import { MAIN_API } from "@/config-global";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceUrl } = body;
    delete body.serviceUrl;
    const url = `${MAIN_API}/${serviceUrl}`;
    console.log(url);
    // Get headers from incoming request
    const headers = Object.fromEntries(req.headers);
    const response = await axios.post(url, body, { headers });
    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response.data.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
