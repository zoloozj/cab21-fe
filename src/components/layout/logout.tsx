import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Logout() {
  async function logout() {
    "use server";
    (await cookies()).delete({ name: "token", path: "/" });

    (await cookies()).set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // анхны path-тэй ижил
      maxAge: 0,
    });
    redirect("/auth/login");
  }

  return (
    <form action={logout}>
      <DropdownMenuItem>
        <Button type="submit" variant="destructive" className="w-full">
          Гарах
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </Button>
      </DropdownMenuItem>
    </form>
  );
}
