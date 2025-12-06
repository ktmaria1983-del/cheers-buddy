import { supabase } from "../../../../../lib/supabase";
import { getOrSetSessionId } from "../../../../../lib/session";

export async function POST(request, ctx) {
  const { id } = await ctx.params;                 // Next 16: params is a Promise
  const winId = decodeURIComponent(id || "");
  const resHeaders = new Headers();

  if (!winId) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });

  // 1) get browser session id via cookie
  const sessionId = getOrSetSessionId(request.headers, resHeaders);

  // 2) Try to record this cheer (one per (win, session_id))
  const { data: cheerRow, error: cheerErr } = await supabase
    .from("cheers")
    .insert([{ win_id: winId, session_id: sessionId }])
    .select("id")
    .single();

  // If duplicate, stop here — don’t increment twice
  if (cheerErr && /duplicate key/i.test(cheerErr.message)) {
    return new Response(JSON.stringify({ ok: true, alreadyCheered: true }), {
      status: 409,
      headers: resHeaders,
    });
  }
  if (cheerErr) {
    return new Response(JSON.stringify({ error: cheerErr.message }), {
      status: 400,
      headers: resHeaders,
    });
  }

  // 3) Increment the counter (RPC) only when insert succeeds
  const { data, error } = await supabase.rpc("cheer_win", { win_id: winId });
  if (error) {
    // rollback the cheer row if increment failed (keep things consistent)
    await supabase.from("cheers").delete().eq("id", cheerRow.id);
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: resHeaders });
  }

  return new Response(JSON.stringify(data), { status: 200, headers: resHeaders });
}
