"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const item = (href: string, label: string, isLogin = false) => {
    const active = pathname === href;

    // 🧩 Shared base styles for all links
    let base =
      "px-3 py-1.5 rounded-lg text-sm font-semibold transition duration-300";

    if (isLogin) {
      // ✨ Special style for Login button
      return (
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={[
            base,
            "border border-transparent bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-border text-transparent",
            "hover:text-slate-900 hover:bg-gradient-to-r hover:from-fuchsia-400 hover:via-amber-300 hover:to-emerald-400",
            "hover:shadow-[0_0_25px_rgba(255,255,255,0.35))] hover:border-white/10",
            active ? "text-slate-900 bg-white/10" : "text-slate-100",
          ].join(" ")}
        >
          {label}
        </Link>
      );
    }

    // 🌈 Regular gradient behaviour for Home/Explore
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={[
          base,
          active
            ? "bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent"
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
        {/* 🌟 Brand title with gradient */}
        <Link
          href="/"
          className="text-base font-bold bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent"
          title="Cheers Buddy"
        >
          Cheers Buddy
        </Link>

        {/* 🧭 Navigation links */}
        <div className="flex items-center gap-3 whitespace-nowrap text-sm">
          {item("/", "Home")}
          {item("/explore", "Explore")}
          {item("/login", "Log in", true)} {/* special glowing button */}
        </div>
      </div>
    </nav>
  );
}
