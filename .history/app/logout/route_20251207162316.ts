import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies,
    }
  );

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/", req.url));
}
