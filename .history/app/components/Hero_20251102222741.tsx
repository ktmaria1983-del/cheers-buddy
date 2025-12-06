"use client";

import { emojiConfetti } from "./confetti";
export default function Hero() {
  return (
    <section className="w-full
  relative overflow-hidden rounded-none md:rounded-3xl
  border-y md:border border-white/10
  bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950
  px-6 sm:px-10 lg:px-16 py-12 md:py-16 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
  ...
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_60rem_at_50%_-10%,rgba(236,72,153,.25),transparent_60%)]" />

      {/* headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 
  bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 
  bg-clip-text text-transparent text-center">
  Cheers Buddy
</h1>

      {/* subline */}
      <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-300 text-center">
  “In a world that measures worth in cash, we measure it in cheers.”
</p>

      {/* value bullets */}
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-4 text-base text-slate-300">
  <div className="rounded-2xl border border-white/10 bg-slate-800/50 px-6 py-3">🎯 Celebrate small wins</div>
  <div className="rounded-2xl border border-white/10 bg-slate-800/50 px-6 py-3">🤝 Kind community energy</div>
  <div className="rounded-2xl border border-white/10 bg-slate-800/50 px-6 py-3">📈 Progress you can feel</div>
</div>

      {/* call to actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
  <a
    href="#"
    className="rounded-full bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 
               px-8 py-3 text-lg font-semibold text-slate-900 shadow-lg transition active:scale-[.98]">
    Start Cheering
  </a>
  <a
    href="#"
    className="rounded-full border border-white/20 px-8 py-3 text-lg font-semibold text-slate-200 hover:border-white/40">
    How it works
  </a>
</div>

      {/* social proof strip */}
      <div className="mt-8 text-sm text-slate-400 text-center">
  12,431 cheers given • real people, real progress
</div>
    </section>
  );
}
