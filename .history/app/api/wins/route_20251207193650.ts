import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function getServerSupabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

// GET ───────────────────────────────────────────────
export async function GET(req: Request) {
  const supabase = getServerSupabase();

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
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

// POST ───────────────────────────────────────────────
export async function POST(req: Request) {
  const supabase = getServerSupabase();

  // 🔒 Require session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { category, title, body } = await req.json();

  if (!category || !title) {
    return NextResponse.json(
      { error: "Category and title are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("wins")
    .insert([
      {
        category,
        title,
        body,
        cheer_count: 0,
        user_id: session.user.id,
      },
    ])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}
