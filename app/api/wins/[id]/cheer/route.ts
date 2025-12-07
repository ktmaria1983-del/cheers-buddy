import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(_req: Request, ctx: any) {
  const { id } = ctx.params;
  const winId = decodeURIComponent(id || "");

  if (!winId) {
    return Response.json(
      { error: "Missing win ID" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        }
      }
    }
  );

  // ---------- AUTH ----------
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return Response.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // ---------- GET CURRENT WIN ----------
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

  // ---------- UPDATE CHEER COUNT ----------
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

  return Response.json(updated, { status: 200 });
}
