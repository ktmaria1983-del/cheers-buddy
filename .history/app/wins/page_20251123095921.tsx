"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WinsPage() {
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cheering, setCheering] = useState(null); // win being cheered

  // -------------------------------------------------------------
  // FETCH ALL WINS
  // -------------------------------------------------------------
  async function loadWins() {
    setLoading(true);
    const { data, error } = await supabase
      .from("wins")
      .select("id, category, title, body, cheer_count, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) setWins(data);
    setLoading(false);
  }

  useEffect(() => {
    loadWins();
  }, []);

  // -------------------------------------------------------------
  // HYBRID ANIMATION (SOFT POP + MINI CONFETTI)
  // -------------------------------------------------------------
  function fireCheerAnimation(winId) {
    const el = document.getElementById(`cheer-btn-${winId}`);
    if (!el) return;

    // Soft pop
    el.animate(
      [
        { transform: "scale(1)", filter: "brightness(1)" },
        { transform: "scale(1.25)", filter: "brightness(1.4)" },
        { transform: "scale(1)", filter: "brightness(1)" },
      ],
      { duration: 320, easing: "ease-out" }
    );

    // Mini confetti burst
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
        div.style.background = colors[Math.floor(Math.random() * colors.length)];
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
  // CHEER FUNCTION
  // -------------------------------------------------------------
  async function cheer(winId) {
    if (cheering) return; // Prevent spam
    setCheering(winId);

    // API route: /api/wins/[id]/cheer
    const res = await fetch(`/api/wins/${winId}/cheer`, { method: "POST" });
    const updated = await res.json();

    // Update local state instantly
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
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-8">
        Explore Wins 🎉
      </h1>

      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading wins...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {wins.map((win) => (
          <div
            key={win.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow"
          >
            {/* Category */}
            <div className="text-xs uppercase tracking-wider text-purple-500 mb-2">
              {win.category || "General"}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {win.title}
            </h2>

            {/* Body */}
            {win.body && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {win.body}
              </p>
            )}

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(win.created_at).toLocaleDateString()}
              </span>

              {/* Cheer button */}
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
