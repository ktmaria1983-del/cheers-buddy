import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const order = searchParams.get("order") || "created_at";
  const dir = (searchParams.get("dir") || "desc").toLowerCase();
  const ascending = dir === "asc";

  let q = supabase
    .from("wins")
    .select("id, user_id, category, title, body, cheer_count, created_at");

  if (order === "cheers") {
    q = q.order("cheer_count", { ascending }).order("created_at", { ascending: !ascending });
  } else {
    q = q.order("created_at", { ascending });
  }

  const { data, error } = await q.limit(50);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}

export async function POST(req) {
  // Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { category, title, body } = await req.json();

  if (!category || !title) {
    return Response.json({ error: "Category and title are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("wins")
    .insert([
      {
        category,
        title,
        body,
        cheer_count: 0,
        user_id: user.id, // 🔥 FIX: user_id is required
      },
    ])
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(data);
}

