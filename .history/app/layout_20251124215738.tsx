"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // lock background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" }, // optional, future page
  ];

  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-[9999]
        w-[90%] max-w-3xl
        rounded-2xl p-[1px]
        bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
        shadow-[0_0_35px_rgba(255,255,255,0.25)]
        backdrop-blur-xl
      "
    >
      {/* Inner glass layer */}
      <div
        className="
          rounded-2xl bg-[#0f0f16]/80
          px-6 py-3 flex items-center justify-between
        "
      >
        {/* Brand */}
        <Link
          href="/"
          className="
            text-xl font-bold text-white
            gradient-text animate-shimmer
            bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent
          "
        >
          CheersBuddy
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition group
                  ${active ? "text-white" : "text-slate-300 hover:text-white"}
                `}
              >
                {link.name}

                {/* Active indicator */}
                {active && (
                  <span
                    className="
                      absolute left-0 -bottom-1 h-[2px] w-full
                      bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                      rounded-full animate-fadeIn
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="
            md:hidden animate-scaleIn
            rounded-b-2xl bg-[#0f0f16]/90 backdrop-blur-xl
            px-6 py-4 space-y-4
          "
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-lg font-medium transition
                  ${active ? "text-white" : "text-slate-300 hover:text-white"}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}



