"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import IntroHero from "./components/IntroHero";
import BigSelect from "./components/BigSelect";

const CATEGORIES = [
  "Sewing", "Coding", "Fitness", "Music", "Writing", "Study Skills",
  "Career", "Mindset", "Confidence", "English", "Parenting", "Health",
  "Habits", "Creativity", "Public Speaking", "Finance", "Spiritual",
  "Productivity", "Relationships", "Nutrition", "Sleep", "Meditation",
  "Learning", "Job Search", "Design", "Art"
];

export default function Home() {
  const [wins, setWins] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------
     LOAD WINS
  ------------------------------------------------------- */
  async function loadWins() {
    const res = await fetch("/api/wins", { cache: "no-store" });
    const data = await res.json();
    setWins(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    loadWins();
  }, []);

  /* -------------------------------------------------------
     BACK TO TOP FAB
  ------------------------------------------------------- */
  useEffect(() => {
    const btn = document.getElementById("back-to-top");

    function onScroll() {
      if (!btn) return;

      if (window.scrollY > 450) {
        btn.classList.remove("opacity-0", "pointer-events-none");
        btn.classList.add("opacity-100");
      } else {
        btn.classList.add("opacity-0", "pointer-events-none");
        btn.classList.remove("opacity-100");
      }
    }

    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 60);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------------------------------------------------------
     PREMIUM SCROLL ANIMATIONS (OPTION C)
  ------------------------------------------------------- */
  useEffect(() => {
    const sections = document.querySelectorAll(".cb-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cb-active");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);

  /* -------------------------------------------------------
     POST WIN
  ------------------------------------------------------- */
  async function addWin(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    const res = await fetch("/api/wins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        title: title.trim(),
        body: details.trim(),
      }),
    });
    setLoading(false);

    if (!res.ok) return;

    setTitle("");
    setDetails("");
    loadWins();
  }

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */
  return (
    <main
      className="
        max-w-3xl mx-auto px-6 py-20 space-y-32
      "
    >
      {/* HERO */}
      <section className="cb-reveal snap-start">
        <Hero />
        <IntroHero />
      </section>

      {/* BRAND INTRO */}
      <section className="cb-reveal text-center space-y-4">
        <h1 className="text-4xl font-extrabold leading-tight text-white">
          Welcome to{" "}
          <span className="gradient-text animate-shimmer bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
            CheersBuddy
          </span>
        </h1>
        <p className="text-slate-300 text-lg">
          The safe space where real people cheer real progress — especially beginners.
        </p>
      </section>

      {/* POST A WIN CARD */}
      <section
        id="post-win"
        className="
          cb-reveal scroll-mt-40
          rounded-3xl p-[2px] mx-auto
          bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
          shadow-[0_0_35px_rgba(255,255,255,0.25)]
          max-w-3xl w-full
        "
      >
        <div
          className="
            rounded-3xl bg-[#0f0f16]/80 backdrop-blur-xl
            p-10 space-y-8
          "
        >
          <h2 className="text-3xl font-bold text-white text-center tracking-tight">
            Post a Small Win ✨
          </h2>

          <label className="block space-y-1">
            <span className="text-sm text-slate-300">Category</span>
            <BigSelect value={category} onChange={setCategory} options={CATEGORIES} />
          </label>

          <label className="block space-y-1">
            <span className="text-sm text-slate-300">Title</span>
            <input
              className="
                w-full rounded-xl bg-slate-900/60 border border-white/10
                px-4 py-3 text-white placeholder-slate-400
                focus:ring-2 focus:ring-[#ffd78a] outline-none
              "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm text-slate-300">Details (optional)</span>
            <textarea
              rows={4}
              className="
                w-full rounded-2xl bg-slate-900/60 border border-white/10
                px-4 py-3 text-white placeholder-slate-400
                focus:ring-2 focus:ring-[#ffd78a] outline-none
              "
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>

          <button
            onClick={addWin}
            disabled={loading}
            className="
              w-full rounded-full bg-gradient-to-r
              from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
              px-8 py-4 text-black font-semibold text-lg
              shadow-[0_0_18px_rgba(255,255,255,0.35)]
              hover:scale-[1.04] active:scale-[0.97]
              transition-transform disabled:opacity-50
            "
          >
            {loading ? "Posting…" : "Post Win"}
          </button>
        </div>
      </section>

      {/* MANUAL BACK-TO-TOP (Button A) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
          cb-reveal mx-auto block rounded-full
          bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] via-[#f7ff8c] to-[#6fffc2]
          px-10 py-3 text-black font-semibold text-lg
          shadow-[0_0_12px_rgba(255,255,255,0.45)]
          hover:scale-[1.03] transition-transform
        "
      >
        ⬆ Back to top
      </button>

      {/* FLOATING FAB (Button B) */}
      <button
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
          fixed bottom-6 right-6 z-[9999]
          h-14 w-14 rounded-full text-black text-2xl flex items-center justify-center
          bg-gradient-to-br from-[#ff9aea] via-[#ffd78a] via-[#f7ff8c] to-[#6fffc2]
          shadow-[0_0_15px_rgba(255,255,255,0.45)]
          transition-all duration-300
          opacity-0 pointer-events-none hover:scale-[1.07]
        "
      >
        ↑
      </button>
    </main>
  );
}
