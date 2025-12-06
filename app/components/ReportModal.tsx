"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function ReportModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("bug");

  // Create Supabase client using SSR package
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <>
      {/* Trigger link */}
      <button
        onClick={() => setOpen(true)}
        className="
          text-sm text-[#c6c6d1]
          hover:text-white
          transition
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
              rounded-2xl p-6 w-[90%] max-w-lg
              bg-[#0f0f16]/90 backdrop-blur-2xl border border-white/10
              shadow-xl
            "
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#e4e4e7]">
              Report a Problem
            </h2>

            {/* Type Selector */}
            <label className="text-sm text-[#c6c6d1]">Type of issue</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="
                w-full mt-1 mb-4 p-2 rounded-lg
                bg-white/5 border border-white/10
                text-[#e4e4e7] text-sm
                focus:outline-none focus:border-[#ffd78a]
              "
            >
              <option value="bug">Bug / Something broken</option>
              <option value="harassment">Harassment / Abuse</option>
              <option value="privacy">Privacy concern</option>
              <option value="feedback">General feedback</option>
              <option value="other">Other</option>
            </select>

            {/* Description */}
            <textarea
              id="report-textarea"
              placeholder="Describe the issue..."
              className="
                w-full h-32 rounded-xl bg-white/5 border border-white/10
                text-[#e4e4e7] p-3 text-sm
                placeholder:text-[#8f90a6]
                focus:outline-none focus:border-[#ffd78a]
              "
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="
                  px-4 py-2 rounded-full border border-white/20
                  text-[#e4e4e7] hover:bg-white/10 transition
                "
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  const textarea = document.querySelector(
                    "#report-textarea"
                  ) as HTMLTextAreaElement;

                  const description = textarea?.value || "";

                  // Fetch logged-in user with new client
                  const {
                    data: { user },
                  } = await supabase.auth.getUser();

                  const payload = {
                    type,
                    description,
                    pageUrl: window.location.pathname,
                    userId: user?.id || null,
                  };

                  const res = await fetch("/api/report", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                  });

                  if (res.ok) {
                    alert("Thank you! Your report has been submitted.");
                    setOpen(false);
                  } else {
                    alert("Error sending report.");
                  }
                }}
                className="
                  px-4 py-2 rounded-full font-semibold
                  bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                  text-black shadow-md hover:scale-[1.02] active:scale-[0.98]
                  transition
                "
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

