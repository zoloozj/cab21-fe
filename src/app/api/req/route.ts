import axios from "axios";
import { MAIN_API } from "@/config-global";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceUrl } = body;
    delete body.serviceUrl;
    const url = `${MAIN_API}/${serviceUrl}`;
    const token = (await cookies()).get("token")?.value;
    console.log(url, token, "URL");
    const response = await axios.post(url, body, {
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log(error, "ERROR");
    const e = error?.response?.data;
    return NextResponse.json(
      { error: e || "Internal Server Error" },
      { status: e?.status || 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.get(`${MAIN_API}/${url}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    const e = error?.response?.data;
    return NextResponse.json(
      { error: e || "Internal Server Error" },
      { status: e.status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.delete(`${MAIN_API}/${url}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    const e = error?.response?.data;
    return NextResponse.json(
      { error: e || "Internal Server Error" },
      { status: e.status || 500 }
    );
  }
}

export async function PUT(req: Request) {
  console.log("THIS WORKS");
  try {
    const body = await req.json();
    const { serviceUrl } = body;
    delete body.serviceUrl;
    const url = `${MAIN_API}/${serviceUrl}`;
    const token = (await cookies()).get("token")?.value;
    console.log(url, token, "URL TOKEN");
    const response = await axios.put(url, body, {
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    const e = error?.response?.data;
    return NextResponse.json(
      { error: e || "Internal Server Error" },
      { status: e.status || 500 }
    );
  }
}
