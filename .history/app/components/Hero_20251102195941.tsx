"use client";

import { emojiConfetti } from "./confetti";
export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950 p-10 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_60rem_at_50%_-10%,rgba(236,72,153,.25),transparent_60%)]" />

      {/* headline */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
        Cheers Buddy
      </h1>

      {/* subline */}
      <p className="mx-auto max-w-2xl text-lg text-slate-300">
        <em>“In a world that measures worth in cash, we measure it in cheers.”</em>
      </p>

      {/* value bullets */}
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 md:grid-cols-3 text-sm">
        <div className="rounded-xl bg-white/5 px-4 py-3 text-slate-200 border border-white/10">
          🎯 Celebrate small wins
        </div>
        <div className="rounded-xl bg-white/5 px-4 py-3 text-slate-200 border border-white/10">
          🤝 Kind community energy
        </div>
        <div className="rounded-xl bg-white/5 px-4 py-3 text-slate-200 border border-white/10">
          📈 Progress you can feel
        </div>
      </div>

      {/* call to actions */}
      <div className="mt-8 flex items-center justify-center gap-3">
          <a
  href="/explore"
  onClick={(e) => {
    e.preventDefault();        // prevent instant page jump
    emojiConfetti("👏");        // trigger celebration
    setTimeout(() => {
      window.location.href = "/explore"; // go to Explore after short delay
    }, 800);
  }}
  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-slate-900 font-bold
             bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 hover:brightness-110
             shadow-lg transition active:scale-[.98]"
>
  Start Cheering
</a>

        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold text-slate-200
                     border border-white/15 bg-white/5 hover:bg-white/10 transition"
        >
          How it works
        </a>
      </div>

      {/* social proof strip */}
      <div className="mt-6 text-xs text-slate-400">
        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300 border border-emerald-400/20">
          12,431 cheers given
        </span>{" "}
        • real people, real progress
      </div>
    </section>
  );
}
