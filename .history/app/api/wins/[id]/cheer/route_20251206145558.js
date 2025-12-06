import { supabase } from "@/lib/supabase";

export async function POST(_req, ctx) {
  // Next.js params are NOT async
  const { id } = ctx.params;
  const winId = decodeURIComponent(id || "");

  if (!winId) {
    return Response.json({ error: "Missing win ID" }, { status: 400 });
  }

  // Step 1 — Read current cheer_count
  const { data: current, error: readErr } = await supabase
    .from("wins")
    .select("id, category, title, body, cheer_count, created_at")
    .eq("id", winId)
    .single();

  if (readErr || !current) {
    return Response.json(
      { error: readErr?.message || "Win not found" },
      { status: 404 }
    );
  }

  // Step 2 — Increment cheer_count
  const newCount = (current.cheer_count ?? 0) + 1;

  const { data: updated, error: updateErr } = await supabase
    .from("wins")
    .update({ cheer_count: newCount })
    .eq("id", winId)
    .select("id, category, title, body, cheer_count, created_at")
    .single();

  if (updateErr) {
    return Response.json(
      { error: updateErr.message },
      { status: 500 }
    );
  }

  // Step 3 — Always return a complete object
  return Response.json(updated);
}

