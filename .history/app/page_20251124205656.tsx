// Premium-styled CheersBuddy Home Page (updated)
// Paste this into app/page.tsx

"use client";
import ClientOnly from "./components/ClientOnly";
import Hero from "./components/Hero";
import IntroHero from "./components/IntroHero";
import React, { useState, useEffect } from "react";
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
  const [category, setCategory] = useState("Sewing");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadWins() {
    const res = await fetch("/api/wins", { cache: "no-store" });
    const data = await res.json();
    setWins(Array.isArray(data) ? data : []);
  }
  useEffect(() => { loadWins(); }, []);

  // Floating button fade logic
  useEffect(() => {
    function onScroll() {
      const btn = document.getElementById("back-to-top") as HTMLButtonElement | null;
      if (!btn) return;
      if (window.scrollY > 400) {
        btn.classList.remove("opacity-0", "pointer-events-none");
        btn.classList.add("opacity-100");
      } else {
        btn.classList.add("opacity-0", "pointer-events-none");
        btn.classList.remove("opacity-100");
      }
    }
    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 50);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function addWin(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    const res = await fetch("/api/wins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, title: title.trim(), body: details.trim() }),
    });
    setLoading(false);
    if (!res.ok) return;
    setTitle("");
    setDetails("");
    loadWins();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 space-y-20">
      <Hero />
      <IntroHero />

      {/* Header */}
      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Cheers <span className="bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">Buddy</span>
        </h1>
        <p className="text-slate-300 text-lg">Real people cheering real progress — especially beginners.</p>
      </header>

      {/* Post a Win Card */}
      <section className="rounded-2xl p-[2px] bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] shadow-[0_0_35px_rgba(0,0,0,0.25)]">
        <div className="rounded-2xl bg-slate-900/70 backdrop-blur-xl p-6 space-y-4">
          <h2 className="font-semibold text-lg text-white">Post a small win</h2>

          <form onSubmit={addWin} className="space-y-4">
            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Category</span>
              <BigSelect value={category} onChange={setCategory} options={CATEGORIES} />
            </label>

            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Title</span>
              <input className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#ffd78a] outline-none" value={title} onChange={e=>setTitle(e.target.value)} />
            </label>

            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Details (optional)</span>
              <textarea rows={3} className="w-full rounded-2xl bg-slate-900/60 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#ffd78a] outline-none" value={details} onChange={e=>setDetails(e.target.value)} />
            </label>

            <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] px-6 py-2 text-black font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-transform disabled:opacity-50">
              {loading ? "Posting…" : "Post Win"}
            </button>
          </form>
        </div>
      </section>

      {/* Premium Back-to-Top (Pill) */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mx-auto block rounded-full bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] via-[#f7ff8c] to-[#6fffc2] px-10 py-3 text-black font-semibold text-lg shadow-[0_0_12px_rgba(255,255,255,0.45)] hover:scale-[1.03] transition-transform">
        ⬆ Back to top
      </button>

      {/* Floating Back-to-Top (FAB) */}
      <button id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-gradient-to-br from-[#ff9aea] via-[#ffd78a] via-[#f7ff8c] to-[#6fffc2] shadow-[0_0_15px_rgba(255,255,255,0.45)] text-black text-2xl flex items-center justify-center transition-all duration-300 opacity-0 pointer-events-none hover:scale-[1.07]">
        ↑
      </button>

    </main>
  );
}
