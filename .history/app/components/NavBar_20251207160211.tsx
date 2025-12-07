"use client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function NavBar() {
  // ⬇⬇ All hooks MUST be inside the component
  // Don't show navbar auth buttons until user + role loaded
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  const authReady = !loading;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);



// Load user + role
  useEffect(() => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => listener.subscription.unsubscribe();
}, []);
  useEffect(() => {
  async function loadUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user ?? null;
    setUser(user);

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(profile?.role ?? null);
    }

    // ONLY END LOADING AFTER ROLE CHECK
    setLoading(false);
  }

  loadUser();

  const { data: listener } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);

      if (newUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", newUser.id)
          .single();

        setRole(profile?.role ?? null);
      } else {
        setRole(null);
      }
    }
  );

  return () => listener.subscription.unsubscribe();
}, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Shadow effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const commonLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
  ];

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-300
      ${
        scrolled
          ? "bg-[#0f0f16]/80 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight gradient-text animate-shimmer
            bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
            bg-clip-text text-transparent"
        >
          CheersBuddy
        </Link>

        {/* Community Link */}
        <Link href="/community" className="hover:text-pink-400 transition">
          Community
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {commonLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition relative
                  ${active ? "text-white" : "text-slate-300 hover:text-white"}`}
              >
                {link.name}
                {active && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px]
                    bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                    rounded-full animate-fadeIn"
                  />
                )}
              </Link>
            );
          })}

          {/* ADMIN ONLY BUTTON */}
          {user && role === "admin" && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-full text-sm font-semibold text-black
              bg-yellow-400 hover:bg-yellow-300 transition"
            >
              Admin Panel
            </Link>
          )}

          {/* Auth Buttons */}
          {!authReady ? null : !user ? (




            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-full text-sm font-semibold text-black
                bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="text-sm font-semibold text-slate-300 hover:text-white"
              >
                Profile
              </Link>
              <form action="/logout" method="post">
  <button
    type="submit"
    className="text-sm font-semibold text-slate-300 hover:text-white"
  >
    Logout
  </button>
</form>

            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden animate-scaleIn bg-[#0f0f16]/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-4">

          {commonLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-lg font-medium ${
                pathname === link.href ? "text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* ADMIN MENU MOBILE */}
          {!authReady ? null : !user ? (
  <>
    <Link
      href="/login"
      onClick={() => setOpen(false)}
      className="block text-lg font-medium text-slate-300 hover:text-white"
    >
      Login
    </Link>

    <Link
      href="/signup"
      onClick={() => setOpen(false)}
      className="block text-lg font-medium text-white bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] px-3 py-2 rounded-xl"
    >
      Sign Up
    </Link>
  </>
) : (
  <>
    <Link
      href="/profile"
      onClick={() => setOpen(false)}
      className="block text-lg font-medium text-slate-300 hover:text-white"
    >
      Profile
    </Link>

    <form action="/logout" method="post">
  <button
    type="submit"
    onClick={() => setOpen(false)}
    className="block text-lg font-medium text-slate-300 hover:text-white"
  >
    Logout
  </button>
</form>

  </>
)}

        </div>
      )}
    </nav>
  );
}
