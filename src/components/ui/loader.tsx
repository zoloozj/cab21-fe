// components/ui/loader.tsx
// Reusable, accessible loader for Next.js App Router
// - Spinner: fullscreen or inline
// - Skeleton primitives: <Skeleton> for blocks/rows
// Tailwind required.

import * as React from "react";
import clsx from "clsx";

export type LoaderProps = {
  label?: string; // aria-label and visible helper text
  size?: "sm" | "md" | "lg";
  fullscreen?: boolean;
  className?: string;
};

export function Loader({
  label = "Ачаалж байна…",
  size = "md",
  fullscreen,
  className,
}: LoaderProps) {
  const dim = size === "sm" ? 20 : size === "lg" ? 40 : 28;
  const spinner = (
    <svg
      className="animate-spin"
      viewBox="0 0 24 24"
      width={dim}
      height={dim}
      role="status"
      aria-label={label}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        fill="currentColor"
      />
    </svg>
  );

  const content = (
    <div
      className={clsx(
        "inline-flex items-center gap-3 text-muted-foreground",
        className
      )}
    >
      {spinner}
      <span className="sr-only sm:not-sr-only sm:inline-block text-sm">
        {label}
      </span>
    </div>
  );

  if (!fullscreen) return content;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/60 backdrop-blur-sm">
      {content}
    </div>
  );
}

// Skeleton primitive
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("animate-pulse rounded-md bg-muted", className)} />
  );
}

// Compound skeletons
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <Skeleton className="h-5 w-1/3 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border">
      <div className="grid grid-cols-5 gap-4 p-4 bg-muted/30">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// Example usage in App Router route segments
// 1) app/(marketing)/loading.tsx -> simple spinner for whole segment
// ----------------------------------------------------------

// ----------------------------------------------------------
// 2) app/dashboard/loading.tsx -> table skeleton while data streams
// ----------------------------------------------------------

// // app/dashboard/loading.tsx
// export function DashboardLoading() {
//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <Skeleton className="h-8 w-48" />
//         <Loader />
//       </div>
//       <TableSkeleton rows={8} />
//     </div>
//   );
// }
// export { DashboardLoading as default };

// // ----------------------------------------------------------
// // 3) Client component usage with <Suspense>
// // ----------------------------------------------------------

// // components/account/profile-panel.tsx (client)
// "use client";
// import { Suspense } from "react";
// import { Loader } from "@/components/ui/loader";

// export function ProfilePanelWrapper({ children }: { children: React.ReactNode }) {
//   return <Suspense fallback={<Loader label="Профайл ачаалж…" />}>{children}</Suspense>;
// }
