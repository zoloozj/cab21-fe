import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader label="ачаалж байна…" />}>{children}</Suspense>
  );
}
