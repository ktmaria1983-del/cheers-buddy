"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Add scroll shadow & animated background
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 z-[9999] w-full
        transition-all duration-300

        ${scrolled
          ? "bg-[#0f0f16]/80 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "bg-transparent backdrop-blur-none shadow-none border-none"
        }
      `}
    >
      {/* Inner container */}
      <div className="
        mx-auto max-w-5xl
        px-6 py-4
        flex items-center justify-between
      ">
        <Link href="/profile" className="text-white">Profile</Link>

        {/* Logo */}
        <Link
          href="/"
          className="
            text-2xl font-extrabold tracking-tight
            gradient-text animate-shimmer
            bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
            bg-clip-text text-transparent
          "
        >
          CheersBuddy
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-sm font-semibold relative transition
                  ${active ? "text-white" : "text-slate-300 hover:text-white"}
                `}
              >
                {link.name}

                {active && (
                  <span
                    className="
                      absolute left-0 -bottom-1 w-full h-[2px]
                      bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                      rounded-full animate-fadeIn
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="
            md:hidden animate-scaleIn
            bg-[#0f0f16]/95 backdrop-blur-xl border-t border-white/10
            px-6 py-6 space-y-4
          "
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
                  block text-lg font-medium transition
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

