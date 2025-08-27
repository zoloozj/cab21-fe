"use client";

import React, { createContext, useContext, useState } from "react";
import type { User } from "@/lib/auth";

type CtxType = { user: User | null; setUser: (u: User | null) => void };

const Ctx = createContext<CtxType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUser must be used within <UserProvider>");
  return ctx;
};

export default function UserProvider({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) {
  // Токен context-д БҮҮ хадгал; user object-оо л уншихад ашигла
  const [user, setUser] = useState<User | null>(initialUser);
  return <Ctx.Provider value={{ user, setUser }}>{children}</Ctx.Provider>;
}
