"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // USER AUTH STATE
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user on first render
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Scroll shadow
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
        ${
          scrolled
            ? "bg-[#0f0f16]/80 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.35)] border-b border-white/10"
            : "bg-transparent backdrop-blur-none shadow-none border-none"
        }
      `}
    >
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">

        {/* LEFT SECTION: Profile / Login */}
        <div className="flex items-center gap-4">
          {!user && (
            <Link
              href="/login"
              className="
                px-4 py-2 rounded-full
                bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                text-black font-semibold shadow
                hover:scale-105 transition
              "
            >
              Login
            </Link>
          )}

          {user && (
            <>
              <Link
                href="/profile"
                className="text-white font-medium hover:text-slate-300 transition"
              >
                Profile
              </Link>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/";
                }}
                className="text-slate-300 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* CENTER LOGO */}
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

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-sm font-semibold relative transition
                  ${
                    active
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }
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

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
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
                  ${
                    active
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}

          {/* LOGIN/PROFILE IN MOBILE MENU */}
          <div className="pt-4 border-t border-white/10">
            {!user ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="
                  block text-lg font-medium
                  text-slate-300 hover:text-white transition
                "
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="
                    block text-lg font-medium text-white
                  "
                >
                  Profile
                </Link>

                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                  className="
                    mt-3 block text-left text-slate-300 hover:text-white transition
                  "
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
