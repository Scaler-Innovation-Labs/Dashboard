import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Clerk({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
