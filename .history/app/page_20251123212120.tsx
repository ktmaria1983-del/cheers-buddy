"use client";
import ClientOnly from "./components/ClientOnly";
import Hero from "./components/Hero";
import IntroHero from "./components/IntroHero";
import React, { useState, useEffect, useRef } from "react";
import BigSelect from "./components/BigSelect";

const CATEGORIES = [
  "Sewing","Coding","Fitness","Music","Writing","Study Skills",
  "Career","Mindset","Confidence","English","Parenting","Health",
  "Habits","Creativity","Public Speaking","Finance","Spiritual",
  "Productivity","Relationships","Nutrition","Sleep","Meditation",
  "Learning","Job Search","Design","Art"
];

function fmtUTC(utcString: string) {
  if (!utcString) return "";
  const d = new Date(utcString);
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ClientTime({ iso, className = "" }: { iso: string; className?: string }) {
  const [txt, setTxt] = useState("");

  useEffect(() => {
    if (!iso) return;
    const d = new Date(iso);
    setTxt(
      d.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [iso]);

  return (
    <time suppressHydrationWarning dateTime={iso} className={className}>
      {txt}
    </time>
  );
}

export default function Home() {
  const [wins, setWins] = useState<any[]>([]);
  const [category, setCategory] = useState("Sewing");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [popping, setPopping] = useState<string | null>(null);

  // still loads wins for data consistency but does NOT show them
  async function loadWins() {
    const res = await fetch("/api/wins", { cache: "no-store" });
    const data = await res.json();
    setWins(Array.isArray(data) ? data : []);
  }
  useEffect(() => { loadWins(); }, []);
  // Show/hide floating Back-to-Top button
useEffect(() => {
  const btn = document.getElementById("back-to-top");

  function onScroll() {
    if (!btn) return;

    if (window.scrollY > 400) {
      btn.classList.remove("hidden");
      btn.classList.remove("opacity-0", "pointer-events-none");
      btn.classList.add("opacity-100");
    } else {
      btn.classList.add("opacity-0", "pointer-events-none");
    }
  }

  window.addEventListener("scroll", onScroll);
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

  function playPop() {
    try {
      const audio = new Audio("/pop.mp3");
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch {}
  }

  function emojiBurst(target: HTMLElement) {
    const EMOJIS = ["✨","💫","🎉","🌟","🫶","👏","💥","🪄","⭐️","💖"];
    target.style.position ||= "relative";
    target.style.overflow = "visible";
    const sparks = 12;
    for (let i = 0; i < sparks; i++) {
      const span = document.createElement("span");
      span.className = "cb-emoji-spark";
      span.textContent = EMOJIS[(Math.random()*EMOJIS.length)|0];
      const angle = (Math.PI * 2 * i) / sparks + Math.random() * 0.6;
      const distance = 24 + Math.random() * 28;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      span.style.setProperty("--x", `${x}px`);
      span.style.setProperty("--y", `${y}px`);
      target.appendChild(span);
      setTimeout(() => span.remove(), 820);
    }
  }

  async function cheer(winId: string, btn: HTMLButtonElement) {
  // Play your home-page animations first
  setPopping(winId);
  emojiBurst(btn);
  playPop();

  // After animation finishes, redirect to Explore
  setTimeout(() => {
    window.location.href = "/explore";
  }, 600); // 600ms = enough time for the burst + pop
}


  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-20 space-y-24"> 
        <Hero />
        <IntroHero />

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">🎉</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Cheers <span className="text-sky-400">Buddy</span>
            </h1>
          </div>
          <p className="mt-2 text-slate-300">
            Real people cheering real progress — especially beginners.
          </p>
        </header>

        {/* Post a Win */}
        <div id="post-win-anchor" className="h-4"></div>

        <section 
        id="post-win"
        className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur">
          <h2 className="mb-4 text-lg font-semibold">Post a small win</h2>

          <form onSubmit={addWin} className="grid gap-4">

            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Category</span>
              <BigSelect
                value={category}
                onChange={setCategory}
                options={CATEGORIES}
                placeholder="Pick a category"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Finished my first zigzag seam!"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder-slate-400 outline-none ring-1 ring-transparent focus:ring-sky-400/40"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Details (optional)</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="1–2 lines about what you did"
                className="w-full resize-y rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder-slate-400 outline-none ring-1 ring-transparent focus:ring-sky-400/40"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 font-semibold text-slate-900 transition active:scale-[.98] disabled:opacity-60"
              >
                {loading ? "Posting…" : "Post Win"}
              </button>
              <span className="text-xs text-slate-400">Be specific. Small wins count.</span>
            </div>

          </form>
        </section>
        {/* Floating Back-to-Top Button */}
<button
  id="back-to-top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 z-50 h-14 w-14 
             rounded-full bg-gradient-to-r from-sky-400 to-purple-500 
             shadow-lg text-white text-2xl flex items-center justify-center
             transition-opacity duration-300 opacity-0 pointer-events-none
             animate-pulse-soft"
>
  ↑
</button>

        {/* Floating Back-to-Top Button */}
<button
  id="back-to-top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="hidden fixed bottom-6 right-6 z-50 h-12 w-12 
             rounded-full bg-gradient-to-r from-sky-400 to-purple-500 
             shadow-lg text-white text-xl flex items-center justify-center
             transition-opacity duration-300 opacity-0 pointer-events-none"
>
  ↑
</button>

        {/* Return to Top Button */}
<button
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="mx-auto mt-6 block rounded-full bg-gradient-to-r from-sky-400 to-purple-500 
             px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl 
             transition active:scale-[.98]"
>
  ⬆ Back to top
</button>


        {/* 🧹 FEED REMOVED */}
        {/* This intentionally leaves the home page clean */}

      </main>
    </>
  );
}
