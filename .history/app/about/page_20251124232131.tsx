"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 space-y-20">

      {/* HERO */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="gradient-text animate-shimmer bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
            About CheersBuddy
          </span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          A calm corner of the internet where real people cheer real progress,
          so you never have to grow alone again.
        </p>
      </section>

      {/* WHAT IS CHEERSBUDDY CARD */}
      <section className="rounded-3xl p-[2px] bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] shadow-[0_0_35px_rgba(255,255,255,0.25)]">
        <div className="rounded-3xl bg-[#0f0f16]/85 backdrop-blur-xl px-7 py-8 space-y-5">
          <h2 className="text-2xl font-bold text-white">What is CheersBuddy?</h2>
          <p className="text-slate-300 leading-relaxed">
            CheersBuddy is a small-win journal with a community heartbeat.
            You post the tiny steps you're proud of—finishing a Python loop,
            going for a walk, fixing a seam—and other real humans show up to
            cheer you on.
          </p>
          <p className="text-slate-300 leading-relaxed">
            No flexing. No perfection. No algorithm chasing drama.
            Just honest progress and kind encouragement, especially for
            beginners and people starting over.
          </p>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-100">The three pillars of CheersBuddy</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 space-y-2">
            <h3 className="font-semibold text-white">🧡 Emotional safety</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A space where it's safe to be a beginner, to try, fail,
              try again, and still be worthy of encouragement.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 space-y-2">
            <h3 className="font-semibold text-white">🌱 Tiny steps, big growth</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Progress is built from tiny repetitions. We celebrate
              the "I watched one tutorial" wins, not only the diplomas.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 space-y-2">
            <h3 className="font-semibold text-white">🎉 Cheering as fuel</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every cheer is a micro-dose of courage. The goal is for you
              to start believing in yourself as much as others believe in you.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-100">Who is CheersBuddy for?</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#0f0f16]/85 border border-white/10 p-6 space-y-2">
            <h3 className="font-semibold text-white">🌈 Beginners & career switchers</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Learning to code, going back to school, changing industry,
              or starting a side project after years in another job.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0f0f16]/85 border border-white/10 p-6 space-y-2">
            <h3 className="font-semibold text-white">💪 Quiet fighters</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              People who are breaking patterns, healing old stories,
              and building a life they weren't handed, step by step.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0f0f16]/85 border border-white/10 p-6 space-y-2">
            <h3 className="font-semibold text-white">🧵 Makers & learners</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sewists, coders, students, creators—anyone who learns by doing
              and wants a friendly push to keep going.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0f0f16]/85 border border-white/10 p-6 space-y-2">
            <h3 className="font-semibold text-white">🫶 Future mentors</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              People who want to one day mentor others, and are already
              practicing how to encourage, not judge.
            </p>
          </div>
        </div>
      </section>

      {/* 🌟 Founder Story Section */}
      <section className="max-w-4xl mx-auto mt-16 mb-24 text-center animate-fadeIn">

        {/* Founder Photo */}
        <div className="mx-auto mb-8 relative w-44 h-44">
          <div className="
            absolute inset-0 rounded-full
            bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
            blur-xl opacity-70 animate-pulse-soft
          "></div>

          <div className="
            relative w-full h-full rounded-full
            p-[3px] bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
            shadow-[0_0_25px_rgba(255,255,255,0.25)]
          ">
            <img
              src="/founder.jpg"
              alt="Founder portrait"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Founder Story */}
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
          The Founder’s Story
        </h2>

        <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
          <p>
            CheerBuddy began from a simple but powerful realisation:
            <strong className="text-white"> most people don’t need judgement, pressure, or comparison — they need encouragement.</strong> 
            _Someone to notice their progress, no matter how small. Someone to say:
            <span className="text-white"> “Yes, this matters. Keep going.”</span>
          </p>

          <p>
            This space was created with the intention of healing the modern mindset —
            a world where we celebrate money more than growth, outcomes more than effort,
            and perfection more than honest attempts. CheerBuddy turns that script upside down.
          </p>

          <p>
            The founder’s journey — from quiet self-rebuilding to empowering others —
            shaped every part of this platform. The vision is simple: a place where progress
            is honoured, where humanity returns to the centre, and where every small step
            is worthy of a cheer.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to share your next tiny win?</h2>
        <p className="text-slate-300 max-w-xl mx-auto">
          You don't need to be perfect. Just bring the next honest step you're proud of.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href="/explore"
            className="rounded-full bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] px-8 py-3 text-black font-semibold shadow-[0_0_18px_rgba(255,255,255,0.35)] hover:scale-[1.04] active:scale-[0.97] transition-transform"
          >
            Start Cheering 🎉
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-slate-200 font-medium hover:bg-white/10 hover:scale-[1.03] transition-transform"
          >
            Post a Win
          </Link>
        </div>
      </section>

    </main>
  );
}

