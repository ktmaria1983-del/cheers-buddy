"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// -------------------------------------------------------------
// TYPES
// -------------------------------------------------------------
type Win = {
  id: string;
  category: string;
  title: string;
  body: string | null;
  cheer_count: number;
  created_at: string;
};

type SortKey = "created_at" | "cheers";

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export default function ExplorePremium() {
  // Wins state
  const [wins, setWins] = useState<Win[]>([]);
  const [loading, setLoading] = useState(true);

  // Cheering state
  const [cheering, setCheering] = useState<string | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<SortKey>("created_at");

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [newWin, setNewWin] = useState({
    title: "",
    category: "",
    body: "",
  });
  const [saving, setSaving] = useState(false);

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

    const { data, error } = await q.limit(50);
    if (!error && data) setWins(data);

    setLoading(false);
  }

  useEffect(() => {
    loadWins();
  }, []);

  // -------------------------------------------------------------
  // MODAL HELPERS
  // -------------------------------------------------------------
  function openModal() {
    setNewWin({ title: "", category: "", body: "" });
    setShowModal(true);
  }

  function closeModal() {
    if (!saving) setShowModal(false);
  }

  // -------------------------------------------------------------
  // CREATE WIN
  // -------------------------------------------------------------
  async function createWin() {
    if (!newWin.title || !newWin.category) {
      alert("Title and category are required.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/wins", {
      method: "POST",
      body: JSON.stringify(newWin),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    setWins((prev) => [data, ...prev]);
    closeModal();
  }

  // -------------------------------------------------------------
  // CHEER ANIMATION
  // -------------------------------------------------------------
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
        div.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        div.style.left = el.getBoundingClientRect().left + 20 + "px";
        div.style.top = el.getBoundingClientRect().top + 10 + "px";
        div.style.opacity = "0.9";
        document.body.appendChild(div);

        const angle = Math.random() * 2 * Math.PI;
        const distance = 60 + Math.random() * 30;

        div.animate(
          [
            { transform: "translate(0,0)", opacity: 1 },
            {
              transform: `translate(${Math.cos(angle) * distance}px, ${
                Math.sin(angle) * distance
              }px)`,
              opacity: 0,
            },
          ],
          { duration: 500 }
        ).onfinish = () => div.remove();
      }

      requestAnimationFrame(frame);
    })();
  }

  // -------------------------------------------------------------
  // CHEER
  // -------------------------------------------------------------
  async function cheer(winId: string) {
    if (cheering) return;
    setCheering(winId);

    const res = await fetch(`/api/wins/${winId}/cheer`, { method: "POST" });
    const updated = await res.json();

    setWins((prev) =>
      prev.map((w) => (w.id === winId ? { ...w, ...updated } : w))
    );

    fireCheerAnimation(winId);
    setCheering(null);
  }

  // -------------------------------------------------------------
  // UI
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f16] to-[#1a1b27] py-20 px-6">

      {/* PREMIUM HEADER */}
      <div className="max-w-4xl mx-auto mb-14 text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
          Explore Wins 🎉
        </h1>
        <p className="text-slate-300 text-lg">See what everyone is celebrating today</p>
      </div>

      {/* SORTING */}
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

      {/* ADD WIN BUTTON */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-lg
                   bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                   text-black font-semibold hover:scale-[1.07] transition-transform"
      >
        ➕ Add Win
      </button>

      {/* PREMIUM MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
          <div
            id="new-win-modal"
            className="relative w-[90%] max-w-md rounded-3xl p-[2px]
                       bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                       shadow-[0_0_45px_rgba(0,0,0,0.4)] animate-[scaleIn_.35s_ease-out]"
          >
            <div className="rounded-3xl bg-[#0f0f16]/90 backdrop-blur-2xl p-7">
              
              {/* CLOSE BUTTON */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 h-9 w-9 rounded-full
                           bg-white/10 border border-white/20 text-white text-lg
                           flex items-center justify-center hover:bg-white/20
                           hover:scale-[1.08] transition shadow-[0_0_15px_rgba(255,255,255,0.25)]"
              >
                ✕
              </button>

              {/* MODAL TITLE */}
              <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] bg-clip-text text-transparent">
                Add a New Win 🎉
              </h2>

              {/* CATEGORY */}
              <label className="block mb-3">
                <span className="text-sm text-slate-300">Category</span>
                <input
                  type="text"
                  value={newWin.category}
                  onChange={(e) =>
                    setNewWin({ ...newWin, category: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-400 focus:ring-2 focus:ring-[#ffd78a] outline-none"
                />
              </label>

              {/* TITLE */}
              <label className="block mb-3">
                <span className="text-sm text-slate-300">Title *</span>
                <input
                  type="text"
                  value={newWin.title}
                  onChange={(e) =>
                    setNewWin({ ...newWin, title: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-400 focus:ring-2 focus:ring-[#ffd78a] outline-none"
                />
              </label>

              {/* BODY */}
              <label className="block mb-5">
                <span className="text-sm text-slate-300">Details (optional)</span>
                <textarea
                  value={newWin.body}
                  onChange={(e) =>
                    setNewWin({ ...newWin, body: e.target.value })
                  }
                  rows={4}
                  className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-400 resize-none
                             focus:ring-2 focus:ring-[#ffd78a] outline-none"
                />
              </label>

              {/* MODAL BUTTONS */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-white/10 text-slate-300
                             border border-white/20 hover:bg-white/20 hover:scale-[1.03]
                             transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={createWin}
                  disabled={saving}
                  className="px-5 py-2 rounded-full text-black font-semibold
                             bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                             shadow-[0_0_15px_rgba(255,255,255,0.3)]
                             hover:scale-[1.05] active:scale-[0.98] transition disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM WINS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {wins.map((win) => (
          <div
            key={win.id}
            className="rounded-2xl p-[2px] bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                       shadow-[0_0_35px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-transform"
          >
            <div className="rounded-2xl bg-[#11121a]/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between">

              {/* CATEGORY CHIP */}
              <span className="text-xs font-semibold text-black bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                               px-3 py-1 rounded-full shadow inline-block mb-3">
                {win.category}
              </span>

              {/* TITLE */}
              <h2 className="text-xl font-bold text-white mb-2">{win.title}</h2>

              {/* BODY */}
              {win.body && (
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {win.body}
                </p>
              )}

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400">
                  {new Date(win.created_at).toLocaleDateString()}
                </span>

                {/* CHEER BUTTON */}
                <button
                  id={`cheer-btn-${win.id}`}
                  onClick={() => cheer(win.id)}
                  disabled={cheering === win.id}
                  className="rounded-full bg-gradient-to-br from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                             text-black text-sm px-4 py-2 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)]
                             hover:scale-[1.07] transition-transform disabled:opacity-50"
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
