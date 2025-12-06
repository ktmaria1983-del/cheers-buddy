import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const order = searchParams.get("order") || "created_at"; 
  const dir = (searchParams.get("dir") || "desc").toLowerCase();
  const ascending = dir === "asc";

  let q = supabase
    .from("wins")
    .select("id, user_id, category, title, body, cheer_count, created_at");

  if (order === "cheers") {
    q = q.order("cheer_count", { ascending });
  } else {
    q = q.order(order, { ascending });
  }

  const { data, error } = await q;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

