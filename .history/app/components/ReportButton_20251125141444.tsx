"use client";

import { useState } from "react";

export default function ReportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed right-6 bottom-[max(0.25rem,env(safe-area-inset-bottom))]
mb-[calc(var(--footer-height,4rem))]
 z-50
          bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
          text-black font-semibold
          px-4 py-3 rounded-full
          shadow-xl shadow-black/50
          hover:scale-[1.05] active:scale-[0.97]
          transition-all
          backdrop-blur-xl
        "
      >
        Report a problem
      </button>

      {/* Modal */}
      {open && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/60 backdrop-blur-sm
          "
        >
          <div
            className="
              soft-glass max-w-md w-[90%] rounded-2xl p-6
              bg-[#0f0f16]/90 backdrop-blur-2xl border border-white/10
            "
          >
            <h2 className="text-xl font-semibold mb-4 text-[#e4e4e7]">
              Report a Problem
            </h2>

            <textarea
              placeholder="Describe the issue..."
              className="
                w-full h-32 rounded-xl bg-white/5 border border-white/10
                text-[#e4e4e7] p-3 text-sm
                focus:outline-none focus:border-[#ffd78a]
                placeholder:text-[#8f90a6]
              "
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="soft-button-ghost"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  alert("Thanks! Your report was sent.");
                  setOpen(false);
                }}
                className="soft-button-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
