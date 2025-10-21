"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type Props = React.ComponentProps<typeof Sidebar> & {};

export function AppSidebar({ ...props }: Props) {
  const pathname = usePathname();
  const navMenu = {
    navMain: [
      {
        title: "Хэрэглэгч",
        url: "#",
        items: [
          {
            title: "Жолооч",
            url: "/admin/user/cab",
            isActive: "/admin/user/cab" === pathname,
          },
          {
            title: "Энгийн хэрэглэгч",
            url: "/admin/user/user",
            isActive: "/admin/user/user" === pathname,
          },
          {
            title: "Идэвхгүй хэрэглэгч",
            url: "/admin/user/inactive",
            isActive: "/admin/user/inactive" === pathname,
          },
        ],
      },
      {
        title: "Зарууд",
        url: "#",
        items: [
          {
            title: "Зарууд",
            url: "/admin/rides",
            isActive: "/admin/rides" === pathname,
          },
        ],
      },
      {
        title: "Төлбөрийн мэдээлэл",
        url: "/admin/payments",
        items: [],
        isActive: "/admin/payments" === pathname,
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Cab21 Хамдаа аялъя</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMenu.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
