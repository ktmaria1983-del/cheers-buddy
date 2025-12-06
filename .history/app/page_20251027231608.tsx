"use client";
import { useEffect, useMemo, useState } from "react";

/* ---------------------- small utilities ---------------------- */

// Hydration-safe timestamp (use this OR your suppressHydrationWarning route)
const fmtUTC = (iso: string) =>
  new Date(iso).toISOString().replace("T", " ").slice(0, 16) + " UTC";

// Tiny cx helper
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/* ---------------------- toast (professional) ---------------------- */
/** Usage:
 *  const { toast, showToast } = useCheerToast();
 *  showToast("Saved!", "success");
 */
type ToastKind = "success" | "error" | "info";

function useCheerToast() {
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    kind: ToastKind;
  } | null>(null);

  function showToast(message: string, kind: ToastKind = "info", ms = 1500) {
    const id = Date.now();
    setToast({ id, message, kind });
    window.setTimeout(() => setToast((t) => (t?.id === id ? null : t)), ms);
  }

  // a11y: announce changes
  const liveText = useMemo(() => (toast ? toast.message : ""), [toast]);

  return { toast, showToast, liveText };
}

/* ---------------------- page component ---------------------- */

export default function Home() {
  const { toast, showToast, liveText } = useCheerToast();

  const [wins, setWins] = useState<any[]>([]);
  const [category, setCategory] = useState("Sewing");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  // holds the id of the post we’re “popping” so your existing CSS anim runs
  const [popping, setPopping] = useState<string | null>(null);

  async function loadWins() {
    const res = await fetch("/api/wins", { cache: "no-store" });
    if (!res.ok) {
      showToast("Couldn’t load wins.", "error");
      return;
    }
    setWins(await res.json());
  }

  useEffect(() => {
    loadWins();
  }, []);

  /* ---------------------- create a win ---------------------- */
  async function addWin(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Add a short title first.", "info");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/wins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        title: title.trim(),
        body: details.trim(),
      }),
    });
    setLoading(false);

    if (!res.ok) {
      const err = await safeJson(res);
      showToast(err?.error ?? "Failed to post.", "error");
      return;
    }

    setTitle("");
    setDetails("");
    showToast("Posted 🎉", "success");
    loadWins();
  }

  /* ---------------------- cheer a win ---------------------- */
  async function cheer(winId: string) {
    // trigger your existing CSS pop on this button
    setPopping(winId);
    window.setTimeout(() => setPopping((v) => (v === winId ? null : v)), 260);

    const res = await fetch(`/api/wins/${encodeURIComponent(winId)}/cheer`, {
      method: "POST",
    });

    if (!res.ok) {
      const err = await safeJson(res);
      // If your API returns 409 for “already cheered”, this becomes an info toast
      const msg = String(err?.error || "Failed to cheer.");
      showToast(
        /already/i.test(msg) ? "👏 Already cheered" : msg,
        /already/i.test(msg) ? "info" : "error",
      );
      return;
    }

    showToast("👏 Cheered!", "success");
    loadWins();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl md:text-4xl">🎉</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Cheers <span className="text-sky-400">Buddy</span>
          </h1>
        </div>
        <p className="mt-2 text-slate-300">
          Real people cheering real progress — especially beginners.
        </p>
      </header>

      {/* post form */}
      <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur">
        <h2 className="mb-4 text-lg font-semibold">Post a small win</h2>
        <form onSubmit={addWin} className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm text-slate-300">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none ring-1 ring-transparent focus:ring-sky-400/40"
            >
              <option>Sewing</option>
              <option>Coding</option>
              <option>Fitness</option>
              <option>Music</option>
              <option>Writing</option>
              <option>Study Skills</option>
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
              className="w-full resize-y rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder-slate-400 outline-none ring-1 ring-transparent focus:ring-sky-400/40"
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
            <span className="text-xs text-slate-400">
              Be specific. Small wins count.
            </span>
          </div>
        </form>
      </section>

      {/* feed */}
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

                {/* choose ONE — here we show UTC to avoid hydration warnings */}
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

              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {w.title}
              </h3>
              {w.body && <p className="mt-1 text-slate-300">{w.body}</p>}

              <footer className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => cheer(w.id)}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl border border-white/10",
                    "bg-slate-800/60 px-3 py-1.5 text-slate-100 transition",
                    "hover:bg-sky-500/15 hover:border-sky-400/30 active:scale-[.98]",
                    // 👇 this class is what your existing CSS animation hooks onto
                    popping === w.id ? "animate-pop" : "",
                  )}
                  aria-label="Cheer this win"
                  title="Cheer this win"
                >
                  <span>👏</span>
                  <span className="text-sm">Cheer</span>
                </button>

                <div className="text-sm text-slate-300">
                  <span className="font-semibold text-sky-300">
                    {w.cheer_count ?? 0}
                  </span>{" "}
                  cheers
                </div>
              </footer>
            </article>
          ))
        )}
      </section>

      {/* 🔔 professional toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={cx(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
            "rounded-xl px-4 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-opacity-80",
            toast.kind === "error"
              ? "bg-red-500/90 text-white"
              : toast.kind === "success"
              ? "bg-emerald-500/90 text-slate-900"
              : "bg-slate-800/90 text-slate-100",
          )}
        >
          <div className="flex items-center gap-2">
            <span aria-hidden>
              {toast.kind === "error" ? "⛔" : toast.kind === "success" ? "✅" : "🔔"}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* screen reader live region (hidden) */}
      <span className="sr-only" aria-live="polite">
        {liveText}
      </span>
    </main>
  );
}

/* ---------------------- helpers ---------------------- */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
