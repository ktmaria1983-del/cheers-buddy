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
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
        Cheers Buddy
      </h1>

      {/* TAGLINE */}
      <p className="text-lg mb-8 text-slate-300">
        <em>“In a world that rushes you, we honour your pace.”</em>
      </p>

      {/* MAIN MESSAGE */}
      <p className="mb-6">
        <strong>Cheers Buddy</strong> is a warm, encouraging space where your progress is seen,
        supported, and gently celebrated — especially when you’re just beginning.
      </p>

      <p className="mb-6">
        Every step forward holds light. Share your small wins, receive soft encouragement,
        and offer cheers that help others rise too.
      </p>

      {/* CLOSING LINE */}
      <p className="italic text-slate-400">
        Your rise is gentle, your journey is real — and you never walk it alone.
      </p>
    </section>
  );
}
