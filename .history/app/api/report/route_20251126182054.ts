import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { type, description, pageUrl, userId } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // this must stay server-only
  );

  const { data, error } = await supabase.from("reports").insert({
    type,
    description,
    page_url: pageUrl,
    user_id: userId || null,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
