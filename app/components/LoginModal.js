"use client";

import { useEffect } from "react";

export default function LoginModal({ show, onClose }) {
  if (!show) return null;

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-neutral-900 w-[90%] max-w-[400px] rounded-xl p-6 shadow-xl border border-white/20">
        
        <h2 className="text-xl font-bold mb-4 text-center">
          Log in to cheer 🎉
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center mb-6">
          You need an account to cheer for wins and support others.
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="w-full py-3 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold shadow-lg active:scale-[0.98]"
        >
          Log in / Sign up
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 mt-3 text-neutral-600 dark:text-neutral-400 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
