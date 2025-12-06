"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const item = (href, label) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={[
          "px-3 py-1.5 rounded-lg text-sm font-semibold transition",
          active
            ? "bg-white/10 text-sky-300"
            : "text-slate-300 hover:text-white hover:bg-white/5",
        ].join(" ")}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-base font-bold text-white">Cheers Buddy</Link>
        <div className="flex items-center gap-2">
          {item("/", "Home")}
          {item("/explore", "Explore")}
          {item("/login", "Log in")}
        </div>
      </div>
    </nav>
  );
}

