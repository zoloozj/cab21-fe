// lib/auth.ts
import { cookies } from "next/headers";
import { MAIN_API } from "@/config-global";
import { jwtVerify, JWTPayload } from "jose";

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
  phone: string;
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
  const response = await fetch(`${MAIN_API}/api/user/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store", // ❗ кэшлэхгүй
  });

  if (!response.ok) return null;

  // ❗ заавал await
  const user: User = await response.json();
  return user;
}

export async function getUserCab() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const payload = await verifyJwtHS512(token);

  try {
    const id = Number((payload as any).uid);
    const res = await fetch(`${MAIN_API}/api/cabs/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store", // сервер талаас cache үлдээхгүй
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    return await res.json();
  } catch {
    return null;
  }
}
