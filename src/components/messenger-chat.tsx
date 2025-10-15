"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle } from "lucide-react";

export default function MessengerFab() {
  const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID!;
  const webUrl = `https://m.me/${pageId}`;
  const iosScheme = `fb-messenger://user-thread/${pageId}`;
  const androidScheme = `fb-messenger://user/${pageId}`;

  const openMessenger = useCallback(() => {
    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    const scheme = isIOS ? iosScheme : isAndroid ? androidScheme : "";

    // Апп руу deep-link оролдоод, амжилтгүй бол вэб рүү шинэ tab
    if (scheme) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = scheme;
      document.body.appendChild(iframe);

      setTimeout(() => {
        document.body.removeChild(iframe);
        const w = window.open(webUrl, "_blank", "noopener,noreferrer");
        if (!w) location.href = webUrl;
      }, 800);
    } else {
      const w = window.open(webUrl, "_blank", "noopener,noreferrer");
      if (!w) location.href = webUrl;
    }
  }, [pageId]);

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={openMessenger}
            aria-label="Chat on Messenger"
            className="
              fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0
              bg-[#0084FF] hover:bg-[#0b7ce0] shadow-xl
              before:content-[''] before:absolute before:inset-0 before:rounded-full
              before:ring-2 before:ring-[#0084FF]/40 before:animate-ping
            "
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className="bg-popover text-popover-foreground"
        >
          <p>Messenger чат нээх</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
