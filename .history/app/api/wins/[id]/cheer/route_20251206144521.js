import { supabase } from "@/lib/supabase";

export async function POST(_req, ctx) {
  // FIX: ctx.params is NOT async
  const { id } = ctx.params;

  const winId = decodeURIComponent(id || "");
  if (!winId) return Response.json({ error: "Missing id" }, { status: 400 });

  // Try RPC if created
  const { data: row, error: rpcErr } = await supabase
    .rpc("cheer_win", { win_id: winId })
    .single();

  if (!rpcErr && row) return Response.json(row);

  // Fallback: read current cheer_count
  const { data: cur, error: e1 } = await supabase
    .from("wins")
    .select("cheer_count")
    .eq("id", winId)
    .single();

  if (e1 || !cur)
    return Response.json({ error: e1?.message || "Win not found" }, { status: 400 });

  const next = (cur.cheer_count ?? 0) + 1;

  const { data: updated, error: e2 } = await supabase
    .from("wins")
    .update({ cheer_count: next })
    .eq("id", winId)
    .select("id, category, title, body, cheer_count, created_at")
    .single();

  if (e2) return Response.json({ error: e2.message }, { status: 400 });

  return Response.json(updated);
}

