"use client";

import { ReactNode } from "react";
import { MockAuthProvider } from "@/lib/mockAuth";

export default function Providers({ children }: { children: ReactNode }) {
  return <MockAuthProvider>{children}</MockAuthProvider>;
}

