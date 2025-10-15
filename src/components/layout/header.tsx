import Link from "next/link";
import Image from "next/image";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./logout";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Header() {
  const user = await getCurrentUser();

  const ActionButton = () => (
    <>
      <Link href="filter">
        <IconButton icon="solar:magnifer-linear" title="Хайх" />
      </Link>
      <Link href="/driver-travel">
        <IconButton
          icon="solar:add-circle-linear"
          title=" Зар оруулах"
          className="cursor-pointer"
        />
      </Link>
    </>
  );

  const UserButton = () => {
    return user ? (
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
              <span className="text-muted-foreground">
                {`${user?.firstName}`}
              </span>
              <Iconify icon="solar:alt-arrow-down-linear" color="#667085" />
            </Button>
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Миний бүртгэл</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile">Профайл</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/my-rides">Миний зарууд</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/my-booking">Миний аялал</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ) : (
      <Link href="/auth/login">
        <IconButton
          icon="solar:user-circle-linear"
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
        <Link href="/">
          <Image
            className="dark:invert hidden md:block"
            src="/assets/logo2.png"
            // src="/assets/cab21.png"
            alt="Cab21 logo"
            width={180}
            height={38}
            priority
          />
        </Link>
        <div className="flex gap-2">
          <ActionButton />
          <UserButton />
        </div>
      </div>
      {/* Mobile Header */}
      <div className="flex md:hidden justify-between m-0 items-center">
        <UserButton />
        <Link href="/">
          <Image
            src="/assets/logo2.png"
            width={100}
            height={100}
            alt="Аваад явий"
          />
        </Link>
        <div className="flex items-center">
          <ActionButton />
        </div>
      </div>
    </div>
  );
}
