"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
};

export default function BigSelect({ value, onChange, options, placeholder = "Choose…" }: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left text-xl font-semibold text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      >
        {value || <span className="text-slate-400">{placeholder}</span>}
        <span className="float-right align-middle">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl p-[1px] bg-gradient-to-r from-fuchsia-500 via-amber-400 to-emerald-400">
          <div className="rounded-xl border border-white/10 bg-slate-950/95 shadow-xl">
            {/* BIG + scrollable list */}
            <div className="max-h-80 overflow-y-auto p-1">
              {options.map(opt => {
                const active = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={
                      "block w-full rounded-lg px-4 py-3 text-left text-xl font-semibold transition " +
                      (active
                        ? "bg-sky-500/20 text-sky-300"
                        : "text-slate-100 hover:bg-white/10")
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
