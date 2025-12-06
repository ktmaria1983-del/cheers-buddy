// Premium Explore Page for CheersBuddy
// Replace your app/explore/page.tsx with this

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Win = {
  id: string;
  category: string;
  title: string;
  body: string | null;
  cheer_count: number;
  created_at: string;
};

type SortKey = "created_at" | "cheers";

export default function ExplorePremium() {
  const [wins, setWins] = useState<Win[]>([]);
  const [loading, setLoading] = useState(true);
  const [cheering, setCheering] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("created_at");

  const [showModal, setShowModal] = useState(false);
  const [newWin, setNewWin] = useState({ title: "", category: "", body: "" });
  const [saving, setSaving] = useState(false);

  async function loadWins(order: SortKey = "created_at") {
    setLoading(true);
    setSortBy(order);

    let q = supabase.from("wins").select("id, category, title, body, cheer_count, created_at");

    if (order === "cheers") {
      q = q.order("cheer_count", { ascending: false }).order("created_at", { ascending: false });
    } else {
      q = q.order("created_at", { ascending: false });
    }

    const { data, error } = await q.limit(50);
    if (!error && data) setWins(data);

    setLoading(false);
  }

  useEffect(() => {
    loadWins();
  }, []);

  async function createWin() {
    if (!newWin.title || !newWin.category) return alert("Title & category required.");

    setSaving(true);

    const res = await fetch("/api/wins", {
      method: "POST",
      body: JSON.stringify(newWin),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) return alert(data.error);

    setWins((prev) => [data, ...prev]);
    setShowModal(false);
  }

  function fireCheerAnimation(winId: string) {
    const el = document.getElementById(`cheer-btn-${winId}`);
    if (!el) return;

    el.animate(
      [
        { transform: "scale(1)", filter: "brightness(1)" },
        { transform: "scale(1.25)", filter: "brightness(1.4)" },
        { transform: "scale(1)", filter: "brightness(1)" },
      ],
      { duration: 320 }
    );

    const end = Date.now() + 250;
    const colors = ["#ff9aea", "#ffd78a", "#f7ff8c", "#6fffc2", "#8beaff"];

    (function frame() {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return;

      for (let i = 0; i < 8; i++) {
        const div = document.createElement("div");
        div.style.position = "fixed";
        div.style.width = "6px";
        div.style.height = "6px";
        div.style.borderRadius = "50%";
        div.style.background = colors[Math.floor(Math.random() * colors.length)];
        div.style.left = el.getBoundingClientRect().left + 20 + "px";
        div.style.top = el.getBoundingClientRect().top + 10 + "px";
        div.style.opacity = "0.9";
        document.body.appendChild(div);

        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 30;

        div.animate(
          [
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`, opacity: 0 },
          ],
          { duration: 500 }
        ).onfinish = () => div.remove();
      }

      requestAnimationFrame(frame);
    })();
  }

  async function cheer(winId: string) {
    if (cheering) return;
    setCheering(winId);

    const res = await fetch(`/api/wins/${winId}/cheer`, { method: "POST" });
    const updated = await res.json();

    setWins((prev) => prev.map((w) => (w.id === winId ? { ...w, ...updated } : w)));
    fireCheerAnimation(winId);
    setCheering(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f16] to-[#1a1b27] py-20 px-6">
      {/* Premium Header */}
      <div className="max-w-4xl mx-auto mb-14 text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
          Explore Wins 🎉
        </h1>
        <p className="text-slate-300 text-lg">See what everyone is celebrating today</p>
      </div>

      {/* Sorting Controls */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => loadWins("created_at")}
          className={`rounded-full px-5 py-2 text-sm font-semibold backdrop-blur bg-white/10 border border-white/20 transition hover:bg-white/20 ${
            sortBy === "created_at" ? "ring-2 ring-[#ffd78a] text-white" : "text-slate-300"
          }`}
        >
          ⬇ Newest
        </button>

        <button
          onClick={() => loadWins("cheers")}
          className={`rounded-full px-5 py-2 text-sm font-semibold backdrop-blur bg-white/10 border border-white/20 transition hover:bg-white/20 ${
            sortBy === "cheers" ? "ring-2 ring-[#ffd78a] text-white" : "text-slate-300"
          }`}
        >
          ⭐ Most Cheered
        </button>
      </div>

      {/* Premium Wins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {wins.map((win) => (
          <div
            key={win.id}
            className="rounded-2xl p-[2px] bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] shadow-[0_0_35px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-transform"
          >
            <div className="rounded-2xl bg-[#11121a]/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-black bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] px-3 py-1 rounded-full mb-3 inline-block shadow">
                  {win.category}
                </span>

                <h2 className="text-xl font-bold text-white mb-2">{win.title}</h2>

                {win.body && (
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{win.body}</p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400">
                  {new Date(win.created_at).toLocaleDateString()}
                </span>

                <button
                  id={`cheer-btn-${win.id}`}
                  onClick={() => cheer(win.id)}
                  disabled={cheering === win.id}
                  className="rounded-full bg-gradient-to-br from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black text-sm px-4 py-2 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-[1.07] transition-transform disabled:opacity-50"
                >
                  🎉 {win.cheer_count}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}