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

export default function WinsPage() {
  // -------------------------------------------------------------
  // STATE
  // -------------------------------------------------------------
  const [wins, setWins] = useState<Win[]>([]);
  const [loading, setLoading] = useState(true);
  const [cheering, setCheering] = useState<string | null>(null);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [newWin, setNewWin] = useState({
    title: "",
    category: "",
    body: "",
  });
  const [saving, setSaving] = useState(false);

  // sorting state
  const [sortBy, setSortBy] = useState<SortKey>("created_at"); // "created_at" = newest, "cheers" = most cheered

  // -------------------------------------------------------------
  // LOAD WINS WITH SORTING
  // -------------------------------------------------------------
  async function loadWins(order: SortKey = "created_at") {
    setLoading(true);
    setSortBy(order);

    let q = supabase
      .from("wins")
      .select("id, category, title, body, cheer_count, created_at");

    if (order === "cheers") {
      // most cheered first, then newest
      q = q
        .order("cheer_count", { ascending: false })
        .order("created_at", { ascending: false });
    } else {
      // newest first
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

    // add new win at top
    setWins((prev) => [data, ...prev]);

    const modal = document.getElementById("new-win-modal");
    if (modal) {
      modal.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.05)" },
          { transform: "scale(1)" },
        ],
        { duration: 300 }
      );
    }

    closeModal();
  }

  // -------------------------------------------------------------
  // HYBRID CHEER ANIMATION
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
      { duration: 320, easing: "ease-out" }
    );

    const end = Date.now() + 250;
    const colors = ["#ff6ec7", "#ffcf33", "#6ee7ff", "#a78bfa", "#ff8a4a"];

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

    const res = await fetch(`/api/wins/${winId}/cheer`, {
      method: "POST",
    });
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
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-6">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
        Explore Wins 🎉
      </h1>

      {/* SORTING BUTTONS */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => loadWins("created_at")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            sortBy === "created_at"
              ? "bg-purple-600 text-white shadow"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          ⬇ Newest
        </button>

        <button
          onClick={() => loadWins("cheers")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            sortBy === "cheers"
              ? "bg-pink-600 text-white shadow"
              : "bg-pink-100 text-pink-700 hover:bg-pink-200"
          }`}
        >
          ⭐ Most Cheered
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading wins...</p>
      )}

      {/* Floating Add Win Button */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl transition-all"
      >
        ➕ Add Win
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            id="new-win-modal"
            className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md border border-purple-200 animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
              Add a New Win 🎉
            </h2>

            <label className="text-sm text-gray-600">Category</label>
            <input
              type="text"
              placeholder="Coding, Fitness, Sewing..."
              value={newWin.category}
              onChange={(e) =>
                setNewWin({ ...newWin, category: e.target.value })
              }
              className="w-full mt-1 mb-3 p-2 border rounded-lg"
            />

            <label className="text-sm text-gray-600">Title *</label>
            <input
              type="text"
              placeholder="I learned loops today!"
              value={newWin.title}
              onChange={(e) => setNewWin({ ...newWin, title: e.target.value })}
              className="w-full mt-1 mb-3 p-2 border rounded-lg"
            />

            <label className="text-sm text-gray-600">Details (optional)</label>
            <textarea
              placeholder="Explain your small win…"
              value={newWin.body}
              onChange={(e) => setNewWin({ ...newWin, body: e.target.value })}
              className="w-full mt-1 mb-4 p-2 border rounded-lg h-24"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                onClick={createWin}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-4">
        {wins.map((win) => (
          <div
            key={win.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow"
          >
            <div className="text-xs uppercase tracking-wider text-purple-500 mb-2">
              {win.category || "General"}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {win.title}
            </h2>

            {win.body && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {win.body}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(win.created_at).toLocaleDateString()}
              </span>

              <button
                id={`cheer-btn-${win.id}`}
                onClick={() => cheer(win.id)}
                disabled={cheering === win.id}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎉 Cheer ({win.cheer_count})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
