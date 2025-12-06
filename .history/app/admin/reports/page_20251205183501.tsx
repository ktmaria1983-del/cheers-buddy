import { supabase } from "@/lib/supabase";

// ---------------------
// GET – fetch wins
// ---------------------
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const order = searchParams.get("order") || "created_at"; 
  const dir = (searchParams.get("dir") || "desc").toLowerCase();
  const ascending = dir === "asc";

  let q = supabase
    .from("wins")
    .select("id, user_id, category, title, body, cheer_count, created_at");

  if (order === "cheers") {
    q =




