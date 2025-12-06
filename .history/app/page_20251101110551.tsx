"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [wins, setWins] = useState<any[]>([]);
  const [category, setCategory] = useState("Sewing");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [popping, setPopping] = useState<string | null>(null);

  async function loadWins() {
    const res = await fetch("/api/wins", { cache: "no-store" });
    const data = await res.json();
    setWins(Array.isArray(data) ? data : []);
  }
  useEffect(() => { loadWins(); }, []);

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
    setTitle(""); setDetails(""); loadWins();
  }

  function playPop() {
    try {
      const audio = new Audio("/pop.mp3"); // put this file in /public/pop.mp3
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
    // visuals first so you can see the burst
    setPopping(winId);
    emojiBurst(btn);
    playPop();
    setTimeout(() => setPopping(null), 250);

    // backend update
    const res = await fetch(`/api/wins/${encodeURIComponent(winId)}/cheer`, { method: "POST" });
    if (res.ok) loadWins();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20">{/* space for fixed nav */}
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">🎉</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Cheers <span className="text-sky-400">Buddy</span>
            </h1>
          </div>
          <p className="mt-2 text-slate-300">Real people cheering real progress — especially beginners.</p>
        </header>

        {/* Post a Win */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur">
          <h2 className="mb-4 text-lg font-semibold">Post a small win</h2>
          <form onSubmit={addWin} className="grid gap-4">
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Category</span>
              <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-slate-900/70 text-slate-100 px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400/50"
>
  <option className="text-lg">Sewing</option>
  <option className="text-lg">Coding</option>
  <option className="text-lg">Fitness</option>
  <option className="text-lg">Music</option>
  <option className="text-lg">Writing</option>
  <option className="text-lg">Study Skills</option>
</select>

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

        {/* Feed */}
        <section className="space-y-4">
          {wins.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400 backdrop-blur">
              No wins yet. Post your first one! 🎯
            </div>
          ) : (
            wins.map((w) => (
              <article
                key={w.id}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-sky-400/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                <header className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    <span className="rounded-full bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300">
                      {w.category}
                    </span>
                  </span>
                  <time
                    dateTime={w.created_at}
                    className="text-[0.7rem] font-medium text-slate-400/80
                               bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500
                               bg-[length:200%_100%] bg-left bg-clip-text text-transparent
                               transition-all duration-700 group-hover:bg-right select-none"
                  >
                    {fmtUTC(w.created_at)}
                  </time>
                </header>

                <h3 className="mt-2 text-lg font-semibold">{w.title}</h3>
                {w.body && <p className="mt-1 text-slate-300">{w.body}</p>}

                <footer className="mt-4 flex items-center justify-between">
                  <button
                    onClick={(e) => cheer(w.id, e.currentTarget)}
                    className={cx(
                      "relative overflow-visible inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-1.5 text-slate-100 transition hover:bg-sky-500/15 hover:border-sky-400/30 active:scale-[.98]",
                      popping === w.id && "animate-pop"
                    )}
                    aria-label="Cheer this win"
                    title="Cheer this win"
                  >
                    <span>👏</span>
                    <span className="text-sm">Cheer</span>
                  </button>

                  <div className="text-sm text-slate-300">
                    <span className="font-semibold text-sky-300">{w.cheer_count ?? 0}</span> cheers
                  </div>
                </footer>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
}

