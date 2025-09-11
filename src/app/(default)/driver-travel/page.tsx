import Link from "next/link";

import DriverTravelForm from "@/sections/driver/driver-travel-form";
import { headers } from "next/headers";

async function fetchUserCab() {
  const h = headers();
  const host = (await h).get("x-forwarded-host") ?? (await h).get("host");
  const proto = (await h).get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;
  // Server→Server call; cookies are forwarded automatically for same-origin
  const res = await fetch(`${baseUrl}/api/cabs`, {
    method: "GET",
    cache: "no-store",
    // If you deploy behind the same domain, relative path also works:
    // fetch("/api/cabs/me", { cache: "no-store" })
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function DriverTravelPage() {
  const cab = await fetchUserCab();
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
