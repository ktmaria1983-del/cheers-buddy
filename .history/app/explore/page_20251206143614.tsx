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

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newWin, setNewWin] = useState({
    title: "",
    category: "",
    body: "",
  });

  const [sortBy, setSortBy] = useState<SortKey>("created_at");

  // -------------------------------------------------------------
  // LOAD WINS
  // -------------------------------------------------------------
  async function loadWins(order: SortKey = "created_at") {
    setLoading(true);
    setSortBy(order);

    let q = supabase
      .from("wins")
      .select("id, category, title, body, cheer_count, created_at");

    if (order === "cheers") {
      q = q
        .order("cheer_count", { ascending: false })
        .order("created_at", { ascending: false });
    } else {
      q = q.order("created_at", { ascending: false });
    }

    const { data } = await q.limit(50);
    if (data) setWins(data);

    setLoading(false);
  }

  useEffect(() => {
    loadWins();
  }, []);

  // -------------------------------------------------------------
  // CREATE WIN
  // -------------------------------------------------------------
  async function createWin() {
    if (!newWin.title || !newWin.category) {
      alert("Title and category required.");
      return;
    }

setSaving(true);

const res = await fetch("/api/wins", {
  method: "POST",
  body: JSON.stringify(newWin),
});

const data = await res.json();
setSaving(false);
setShowModal(false);

if (data?.id) {
  setWins((prev) => [data, ...prev]);
  setNewWin({ title: "", category: "", body: "" });
}
  }

  // -------------------------------------------------------------
  // CHEER ANIMATION
  // -------------------------------------------------------------
  function fireCheerAnimation(id: string) {
    const el = document.getElementById(`cheer-btn-${id}`);
    if (!el) return;

    el.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.17)" },
        { transform: "scale(1)" },
      ],
      { duration: 240, easing: "ease-out" }
    );

    // tiny sparkles
    const rect = el.getBoundingClientRect();
    const colors = ["#ff9aea", "#ffd78a", "#f7ff8c", "#6fffc2"];

    for (let i = 0; i < 8; i++) {
      const s = document.createElement("div");
      s.className = "cb-emoji-spark";
      s.textContent = ["✨", "💫", "🌟", "💖"][Math.floor(Math.random() * 4)];

      s.style.left = rect.left + 22 + "px";
      s.style.top = rect.top + 10 + "px";
      s.style.setProperty("--x", `${Math.random() * 50 - 25}px`);
      s.style.setProperty("--y", `${Math.random() * -55}px`);

      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  }

  async function cheer(id: string) {
    if (cheering) return;

    setCheering(id);

    const res = await fetch(`/api/wins/${id}/cheer`, { method: "POST" });
    const updated = await res.json();

   setWins((prev) =>
  prev.map((w) =>
    w.id === id ? { ...w, cheer_count: updated.cheer_count } : w
  )
);


    fireCheerAnimation(id);

    setCheering(null);
  }

  // -------------------------------------------------------------
  // UI
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen pt-28 pb-32 px-6 relative">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold gradient-text animate-shimmer bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
          Explore Wins 🎉
        </h1>
        <p className="text-slate-300 mt-2">
          Discover what people are celebrating today.
        </p>
      </div>

      {/* SORTING */}
      <div className="flex justify-center gap-4 mb-10">
        {[
          { key: "created_at", label: "⬇ Newest" },
          { key: "cheers", label: "⭐ Most Cheered" },
        ].map((o) => (
          <button
            key={o.key}
            onClick={() => loadWins(o.key as SortKey)}
            className={`
              px-5 py-2 text-sm rounded-full font-medium border backdrop-blur
              transition-all
              ${
                sortBy === o.key
                  ? "bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }
            `}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* ADD WIN FLOATING BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="
          fixed bottom-6 right-6 z-[9999]
          h-16 w-16 rounded-full text-3xl font-extrabold
          bg-gradient-to-br from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
          text-black shadow-[0_0_35px_rgba(255,255,255,0.35)]
          animate-pulse-soft hover:scale-[1.12] active:scale-[0.97]
          transition-all
        "
      >
        ➕
      </button>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-slate-400 mt-10">Loading wins…</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {wins
          .filter(win => !!win.title) 
          .map((win, index) => (
            <div
              key={win.id ?? index}
              className="
                rounded-2xl p-[2px]
                bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                shadow-[0_0_35px_rgba(255,255,255,0.2)]
                hover:scale-[1.02] transition-transform
              "
            >
              <div className="rounded-2xl bg-[#0f0f16]/85 backdrop-blur-xl p-6 flex flex-col h-full justify-between">

                {win.category && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black font-semibold w-fit mb-3">
                    {win.category}
                  </span>
                )}

                <h2 className="text-xl font-bold text-white mb-2">{win.title}</h2>

                {win.body && (
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {win.body}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3">
                  <span className="text-xs text-slate-400">
                    {win.created_at ? new Date(win.created_at).toLocaleDateString() : "No date"}
                  </span>

                  <button
                    id={`cheer-btn-${win.id}`}
                    onClick={() => cheer(win.id)}
                    disabled={cheering === win.id}
                    className="
                      px-4 py-2 rounded-full text-sm font-semibold text-black
                      bg-gradient-to-br from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                      shadow-[0_0_15px_rgba(255,255,255,0.35)]
                      hover:scale-[1.08] transition-all disabled:opacity-50
                    "
                  >
                    🎉 {win.cheer_count}
                  </button>
                </div>

              </div>
            </div>
          ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center animate-fadeIn">
          <div
            className="
              rounded-3xl p-[2px] max-w-md w-[90%]
              bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
              shadow-[0_0_45px_rgba(255,255,255,0.35)]
              animate-scaleIn
            "
          >
            <div className="rounded-3xl bg-[#0f0f16]/90 backdrop-blur-2xl p-7 relative">

              <button
                onClick={() => setShowModal(false)}
                className="
                  absolute top-3 right-3 h-10 w-10 rounded-full
                  bg-white/10 border border-white/20 text-white text-lg
                  flex items-center justify-center transition
                  hover:bg-white/20 hover:scale-[1.07]
                "
              >
                ✕
              </button>

              <h2 className="text-2xl text-center font-bold mb-6 gradient-text bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
                Add a New Win 🎉
              </h2>

              <label className="block mb-3">
                <span className="text-sm text-slate-300">Category</span>
                <input
                  type="text"
                  value={newWin.category}
                  onChange={(e) =>
                    setNewWin({ ...newWin, category: e.target.value })
                  }
                  className="
                    w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-slate-400 outline-none
                    focus:ring-2 focus:ring-[#ffd78a]
                  "
                />
              </label>

              <label className="block mb-3">
                <span className="text-sm text-slate-300">Title *</span>
                <input
                  type="text"
                  value={newWin.title}
                  onChange={(e) =>
                    setNewWin({ ...newWin, title: e.target.value })
                  }
                  className="
                    w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-slate-400 outline-none
                    focus:ring-2 focus:ring-[#ffd78a]
                  "
                />
              </label>

              <label className="block mb-5">
                <span className="text-sm text-slate-300">Details (optional)</span>
                <textarea
                  value={newWin.body}
                  onChange={(e) =>
                    setNewWin({ ...newWin, body: e.target.value })
                  }
                  rows={4}
                  className="
                    w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-slate-400 outline-none resize-none
                    focus:ring-2 focus:ring-[#ffd78a]
                  "
                />
              </label>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className="
                    px-5 py-2 rounded-full bg-white/10 text-slate-300
                    border border-white/20
                    hover:bg-white/20 hover:scale-[1.03]
                    transition disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={createWin}
                  disabled={saving}
                  className="
                    px-5 py-2 rounded-full text-black font-semibold
                    bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                    shadow-[0_0_15px_rgba(255,255,255,0.3)]
                    hover:scale-[1.05] active:scale-[0.98]
                    transition disabled:opacity-50
                  "
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
