import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/query-provider";

import { getCurrentUser } from "@/lib/auth";
import UserProvider from "@/lib/user-provider";
import { LoaderWrapper } from "@/components/main/loader-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cab21.zakhzeel.mn"),
  title: { default: "Аваад явий", template: "%s | Аваад явая" },
  description: "Аваад явий, хамтдаа аялая",
  openGraph: {
    type: "website",
    url: "https://cab21.zakhzeel.mn",
    title: "Аваад явий",
    description: "Аваад явий, хамтдаа аялая",
    siteName: "Аваад явая",
    images: [{ url: "/og/cover.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F5]`}
      >
        <UserProvider initialUser={user}>
          <QueryProvider>
            <LoaderWrapper>{children}</LoaderWrapper>
          </QueryProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
