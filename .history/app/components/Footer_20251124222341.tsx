"use client";

export default function Footer() {
  return (
    <footer className="relative mt-32 mb-12 mx-auto w-[92%] max-w-5xl">

      {/* --- Ambient glowing gradient orbs (my choice) --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Left orb */}
        <div
          className="
            absolute -left-20 top-1/2 w-64 h-64 
            bg-[#ff9aea] opacity-[0.20] blur-3xl 
            rounded-full animate-pulse-soft
          "
        />
        {/* Right orb */}
        <div
          className="
            absolute -right-20 top-1/3 w-64 h-64 
            bg-[#6fffc2] opacity-[0.18] blur-3xl 
            rounded-full animate-pulse-soft
          "
        />
      </div>

      {/* Outer gradient border */}
      <div
        className="
          rounded-3xl p-[2px]
          bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
          shadow-[0_0_55px_rgba(255,255,255,0.30)]
        "
      >
        {/* Inner glass panel */}
        <div
          className="
            rounded-3xl bg-[#0f0f16]/85 backdrop-blur-2xl
            px-8 py-12 flex flex-col items-center gap-10
          "
        >
          {/* Tagline */}
          <h3
            className="
              text-2xl font-bold text-center leading-snug
              gradient-text animate-shimmer
              bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
              bg-clip-text text-transparent
              max-w-xl
            "
          >
            In a world that measures worth in cash,<br />
            we measure it in cheers.
          </h3>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            {[
              { name: "Home", href: "/" },
              { name: "Explore", href: "/explore" },
              { name: "How it works", href: "/how-it-works" },
              { name: "About", href: "/about" },
              { name: "Privacy", href: "/privacy" },
              { name: "Terms", href: "/terms" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  text-slate-300 hover:text-white transition
                  hover:scale-[1.06]
                "
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* Footnote */}
          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} CheersBuddy — Cheering your growth, one win at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}


