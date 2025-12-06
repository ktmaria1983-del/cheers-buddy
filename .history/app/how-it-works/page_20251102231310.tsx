"use client";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 text-slate-100">
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
          How Cheers Buddy Works
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          Cheers Buddy is a warm space where real people celebrate real progress.  
          We don’t measure success in money — we measure it in <span className="text-amber-300 font-semibold">cheers</span>.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-3 text-center">
        <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6">
          <h3 className="text-xl font-bold text-emerald-300 mb-3"> Post a Win</h3>
          <p>Share any small or big progress — finishing a task, learning something, or simply showing up.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6">
          <h3 className="text-xl font-bold text-amber-300 mb-3"> Get Cheers</h3>
          <p>Others cheer for your effort with a single click. It’s social energy — but kind and genuine.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6">
          <h3 className="text-xl font-bold text-fuchsia-400 mb-3"> Feel the Momentum</h3>
          <p>Every cheer is a reminder that growth is noticed. Progress becomes visible and encouraging.</p>
        </div>
      </section>

      <section className="mt-16 text-center">
        <Link
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 
                     px-8 py-3 text-lg font-semibold text-slate-900 shadow-lg transition active:scale-[.98]">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
