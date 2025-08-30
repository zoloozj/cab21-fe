// lib/auth.ts
import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";
import axios from "axios";
import { MAIN_API } from "@/config-global";

// types/auth.ts
export type User = {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: "user" | "admin" | string;
  birthday?: number;
  registryNumber?: string;
};

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!); // HS512 shared secret

type Claims = JWTPayload & {
  uid?: number; // таны payload: { uid: 6, role: "user", sub: "email", ... }
  role?: string;
  sub?: string; // email
};

export async function verifyJwtHS512(token: string): Promise<Claims | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: ["HS512"],
    });
    return payload as Claims;
  } catch (error) {
    return null;
  }
}

/** Cookie-оос JWT авч, хүчинтэй эсэхийг сервер дээр шалгана. */
export async function getValidTokenOrNull(): Promise<string | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    await verifyJwtHS512(token); // exp/iat/alg бүгд шалгана
    return token;
  } catch {
    return null; // хүчингүй/хуучирсан
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  const payload = await verifyJwtHS512(token);

  // 1) Эхлээд /api/me-ээс (cookie дамжуулж) авахыг оролдоно

  try {
    const id = Number((payload as any).uid);
    const response = await axios.get(`${MAIN_API}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch {
    // 2) Хэрэв амжилтгүй бол JWT-ийг шалгана
   cookieStore.delete("token"); // хүчингүй бол устгана
    return null;
  }
}
