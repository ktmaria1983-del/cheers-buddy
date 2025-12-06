// app/components/ClientOnly.tsx
"use client";
import { useEffect, useState, ReactNode } from "react";

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;         // nothing on the server, render on client
  return <>{children}</>;
}
