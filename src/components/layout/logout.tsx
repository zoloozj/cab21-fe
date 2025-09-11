"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Logout failed");
      // Login руу шилжүүлээд cache шинэчилнэ
      router.replace("/auth/login");
      router.refresh();
    } catch (e) {
      console.error(e);
      // optionally show a toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenuItem>
      <Button
        type="button"
        onClick={onLogout}
        variant="destructive"
        className="w-full"
        disabled={loading}
      >
        Гарах
        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
      </Button>
    </DropdownMenuItem>
  );
}
