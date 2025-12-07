""use client";

import Link from "next/link";
import { emojiConfetti } from "./confetti";
import { useEffect } from "react";

export default function Hero() {
  // Parallax handler
  useEffect(() => {
    function handleScroll() {
      const hero = document.getElementById("hero");
      if (!hero) return;
      hero.style.setProperty("--scroll", String(window.scrollY));
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="
        relative w-full overflow-hidden
        rounded-none md:rounded-3xl
        border-y md:border border-white/10
        px-6 sm:px-10 lg:px-16 py-20 md:py-28
        text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]
        cb-glass cb-glass-glow cb-reveal
      "
    >
      {/* ULTRAMODERN ORBS */}
      <div
        className="cb-orb"
        style={{
          top: "-80px",
          left: "-40px",
          width: "260px",
          height: "260px",
          background: "var(--cb-grad-1)",
        }}
      />
      <div
        className="cb-orb"
        style={{
          bottom: "-60px",
          right: "-20px",
          width: "200px",
          height: "200px",
          background: "var(--cb-grad-2)",
          animationDelay: "3s",
        }}
      />

      {/* SHIMMER LAYER */}
      <div className="cb-shimmer pointer-events-none" />

      {/* ABSTRACT ILLUSTRATION BEHIND TEXT */}
      <div
        className="
          absolute inset-0 opacity-[0.12]
          bg-[url('/abstract-shapes.svg')] bg-center bg-cover
        "
      />

      {/* HEADLINE */}
      <h1
        className="
          relative z-10
          text-5xl md:text-7xl font-extrabold tracking-tight mb-6
          bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400
          bg-clip-text text-transparent
        "
      >
        Rise Gently. Shine Bravely.
      </h1>

      {/* SUBHEADLINE */}
      <p
        className="
          relative z-10 mx-auto max-w-3xl
          text-lg md:text-xl text-slate-300 mb-10
        "
      >
        A warm space where your progress is seen, supported, and softly celebrated.
      </p>

      {/* VALUE BUTTON ROW — Enhanced but structure kept */}
      <div
        className="
          relative z-10 mx-auto mt-10
          grid max-w-5xl grid-cols-1 md:grid-cols-3
          gap-4 text-base text-slate-300
        "
      >
        {/* Celebrate */}
        <button
          onClick={() => {
            const el = document.getElementById("post-win");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="
            cb-glass bg-white/5 border border-white/10 px-6 py-3
            rounded-2xl hover:bg-white/10 transition
            flex items-center gap-2 text-left
          "
        >
          🎯 Celebrate your small steps
        </button>

        {/* Community */}
        <Link
          href="/community"
          className="
            cb-glass bg-white/5 border border-white/10 px-6 py-3
            rounded-2xl hover:bg-white/10 transition
            block text-left
          "
        >
          🤝 Grow with gentle community energy
        </Link>

        {/* Progress */}
        <button
          onClick={() => {
            const el = document.getElementById("intro-header");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="
            cb-glass bg-white/5 border border-white/10 px-6 py-3
            rounded-2xl hover:bg-white/10 transition
            flex items-center gap-2 text-left
          "
        >
          📈 Progress you can feel in your spirit
        </button>
      </div>

      {/* CTA BUTTONS */}
      <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-5">

        {/* Start Cheering CTA — Premium */}
        <a
          href="/explore"
          onClick={(e) => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            emojiConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            setTimeout(() => (window.location.href = "/explore"), 800);
          }}
          className="
            cb-cta px-10 py-4 text-lg font-semibold shadow-2xl
          "
        >
          Start Cheering
        </a>

        {/* Secondary CTA */}
        <Link
          href="/how-it-works"
          className="
            rounded-full border border-white/20 px-10 py-4
            text-lg font-semibold text-slate-200 hover:border-white/40
            transition
          "
        >
          How it works
        </Link>
      </div>

      {/* SOCIAL PROOF */}
      <div className="relative z-10 mt-10 text-sm text-slate-400">
        12,431 cheers given • real people rising gently together
      </div>
    </section>
  );
}
