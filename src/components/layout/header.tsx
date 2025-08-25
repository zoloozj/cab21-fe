import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./logout";

export default async function Header() {
  const ActionButton = () => (
    <>
      <IconButton icon="solar:magnifer-linear" title="Хайх" />
      <Link href="driver-travel">
        <IconButton
          icon="solar:add-circle-linear"
          title=" Зар оруулах"
          className="cursor-pointer"
        />
      </Link>
    </>
  );

  const token = (await cookies()).get("token")?.value;

  const UserButton = () => {
    return token ? (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline"> */}
            <Button
              variant="ghost"
              className="flex gap-2 items-center"
              size="lg"
            >
              <Image
                className="dark:invert"
                src="/assets/profile.svg"
                alt="Cab21 logo"
                width={30}
                height={30}
                priority
              />
              <Iconify icon="solar:alt-arrow-down-linear" color="#667085" />
            </Button>
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Миний бүртгэл</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Профайл
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ) : (
      <Link href="/auth/login">
        <IconButton
          icon="streamline-ultimate:login-key"
          title=" Нэвтрэх"
          className="cursor-pointer"
        />
      </Link>
    );
  };
  return (
    <div className="py-3 md:py-6 px-4 xl:px-[300px] m-0 bg-white dark:bg-gray-800">
      {/* Web Header */}
      <div className="m-0 justify-between hidden md:flex">
        <Image
          className="dark:invert hidden md:block"
          src="/assets/logo.svg"
          alt="Cab21 logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-2">
          <ActionButton />
          <UserButton />
        </div>
      </div>
      {/* Mobile Header */}
      <div className="flex md:hidden justify-between m-0 items-center">
        <UserButton />
        <Image
          src="/assets/logo2.svg"
          width={100}
          height={100}
          alt="Аваад явий"
        />
        <div className="flex items-center">
          <ActionButton />
        </div>
      </div>
    </div>
  );
}
