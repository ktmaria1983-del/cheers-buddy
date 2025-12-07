"use client";

export default function IntroHero() {
  return (
    <section
      id="intro-header"
      className="
        relative
        mx-auto max-w-3xl px-6 py-16
        text-center leading-relaxed text-slate-200
        cb-reveal
      "
    >
      {/* Soft orb behind the card */}
      <div
        className="cb-orb"
        style={{
          top: "-40px",
          right: "-60px",
          width: "180px",
          height: "180px",
          background: "var(--cb-grad-2)",
          opacity: 0.5,
        }}
      />

      {/* Light shimmer layer */}
      <div className="cb-shimmer pointer-events-none opacity-60" />

      {/* Glass content card */}
      <div
        className="
          relative cb-glass cb-glass-glow
          px-8 py-10 rounded-3xl border border-white/15
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
          <strong>Cheers Buddy</strong> is a warm, encouraging space where your
          progress is seen, supported, and gently celebrated — especially when
          you’re just beginning.
        </p>

        <p className="mb-6">
          Every step forward holds light. Share your small wins, receive soft
          encouragement, and offer cheers that help others rise too.
        </p>

        {/* CLOSING LINE */}
        <p className="italic text-slate-400">
          Your rise is gentle, your journey is real — and you never walk it
          alone.
        </p>
      </div>
    </section>
  );
}

