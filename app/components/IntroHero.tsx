"use client";

export default function IntroHero() {
  return (
    <section
      id="intro-header"
      className="
        mx-auto max-w-3xl px-6 py-16 text-center leading-relaxed text-slate-200
        soft-appear-delayed
      "
    >
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
        Cheers Buddy
      </h1>

      <p className="text-lg mb-8 text-slate-300">
        <em>“In a world that measures worth in cash, we measure it in cheers.”</em>
      </p>

      <p className="mb-6">
        <strong>Cheers Buddy</strong> is a safe online space where real people cheer for real
        progress — especially beginners taking their first steps.
      </p>

      <p className="mb-6">
        Every small win deserves recognition. Post your milestones, receive cheers, and cheer others.
      </p>

      <p className="italic text-slate-400">
        You rise, others cheer — and together we make progress contagious.
      </p>
    </section>
  );
}
