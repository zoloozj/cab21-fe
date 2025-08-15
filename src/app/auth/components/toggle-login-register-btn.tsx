"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ToggleLoginRegisterBtn() {
  const path = usePathname();

  return (
    <div>
      {path === "/auth/login" ? (
        <div>
          Гишүүн биш үү?
          <Link href="register" className="font-bold text-[#FFB300]">
            {" "}
            Бүртгүүлэх
          </Link>
        </div>
      ) : (
        <div>
          Бүртгэлтэй юу?
          <Link href="login" className="font-bold text-[#FFB300]">
            {" "}
            Нэвтрэх
          </Link>
        </div>
      )}
    </div>
  );
}
