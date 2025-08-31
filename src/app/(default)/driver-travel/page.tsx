import Link from "next/link";
import { getUserCab } from "@/lib/auth";

import DriverTravelForm from "@/sections/driver/driver-travel-form";

export default async function DriverTravelPage() {
  const cab = await getUserCab();
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
