"use client";

import Link from "next/link";
import { emojiConfetti } from "./confetti";

export default function Hero() {
  return (
    <section
      className="w-full
      relative 
      rounded-none md:rounded-3xl
      border-y md:border border-white/10
      bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950
      px-6 sm:px-10 lg:px-16 py-12 md:py-16 text-center 
      shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
    >

      {/* headline */}
      <h1
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 
        bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 
        bg-clip-text text-transparent text-center"
      >
        Cheers Buddy
      </h1>

      {/* subline */}
      <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-300 text-center">
        “In a world that measures worth in cash, we measure it in cheers.”
      </p>

      {/* value bullets */}
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-4 text-base text-slate-300">
        
        {/* 🎯 SCROLL TO POST-WIN SECTION */}
        <button
          onClick={() => {
            const el = document.getElementById("post-win");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-2xl border border-white/10 bg-slate-800/50 px-6 py-3
                     hover:bg-slate-700/50 transition cursor-pointer 
                     w-full text-left flex items-center gap-2"
        >
          🎯 Celebrate small wins
        </button>

        {/* 🤝 Community Hub */}
        <Link
          href="/community"
          className="rounded-2xl border border-white/10 bg-slate-800/50 px-6 py-3
                     hover:bg-slate-700/50 transition cursor-pointer w-full block text-left"
        >
          🤝 Kind community energy
        </Link>

        {/* 📈 Scroll to intro header */}
        <button
          onClick={() => {
            const el = document.getElementById("intro-header");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-2xl border border-white/10 bg-slate-800/50 px-6 py-3
                     hover:bg-slate-700/50 transition cursor-pointer 
                     w-full text-left flex items-center gap-2"
        >
          📈 Progress you can feel
        </button>
      </div>

      {/* CTA buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        
        {/* Start Cheering (confetti + redirect) */}
        <a
          href="/explore"
          onClick={(e) => {
            e.preventDefault();

            const rect = e.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            emojiConfetti(x, y);

            setTimeout(() => {
              window.location.href = "/explore";
            }, 800);
          }}
          className="rounded-full bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 
                     px-8 py-3 text-lg font-semibold text-slate-900 shadow-lg transition active:scale-[.98]"
        >
          Start Cheering
        </a>

        <Link
          href="/how-it-works"
          className="rounded-full border border-white/20 px-8 py-3 
                     text-lg font-semibold text-slate-200 hover:border-white/40"
        >
          How it works
        </Link>
      </div>

      {/* social proof */}
      <div className="mt-8 text-sm text-slate-400 text-center">
        12,431 cheers given • real people, real progress
      </div>
    </section>
  );
}
