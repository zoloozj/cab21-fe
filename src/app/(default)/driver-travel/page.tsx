import Link from "next/link";

import DriverTravelForm from "@/sections/driver/driver-travel-form";
import { cookies } from "next/headers";
import { verifyJwtHS512 } from "@/lib/auth";
import { MAIN_API } from "@/config-global";

export const dynamic = "force-dynamic";

// async function fetchUserCab() {
//   const h = headers();
//   const host = (await h).get("x-forwarded-host") ?? (await h).get("host");
//   const proto = (await h).get("x-forwarded-proto") ?? "http";
//   const baseUrl = `${proto}://${host}`;
//   // Server→Server call; cookies are forwarded automatically for same-origin

//   const cookieStore = await cookies(); // ✅ always await
//   const cookieHeader = cookieStore.toString(); // одоо OK
//   const res = await fetch(`${baseUrl}/api/cabs`, {
//     method: "GET",
//     cache: "no-store",
//     headers: {
//       // 🔑 Server→Server үед cookie-г ингэж дамжуулна
//       cookie: cookieHeader,
//       accept: "application/json",
//     },
//   });

//   if (!res.ok) return null;
//   return res.json();
// }

async function loadCabsDirect() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const payload = await verifyJwtHS512(token);
  const uid = Number((payload as any)?.uid);
  if (!Number.isFinite(uid)) return null;

  const res = await fetch(`${MAIN_API}/api/cabs/user/${uid}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DriverTravelPage() {
  const cab = await loadCabsDirect();

  if (!cab)
    return (
      <div className="mt-3">
        <p className="text-center text-muted-foreground">
          Та тээврийн хэрэгслийн мэдээлэл оруулаагүй байна!
        </p>
        <div className="flex gap-3 text-muted-foreground justify-center">
          <Link
            href="cab"
            className="text-primary underline block text-center font-semibold"
          >
            Энд{" "}
          </Link>
          дарж мэдээллээ оруулна уу!
        </div>
      </div>
    );

  return <DriverTravelForm cabId={cab.id} />;
}
