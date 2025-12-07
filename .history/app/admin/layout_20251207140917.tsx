// @ts-nocheck
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export default async function AdminLayout({ children }) {
  // NEW: cookies() is async in Next 16 → must await
  const cookieStore = await cookies();

  const cookie = cookieStore.get("sb-uwdwtcukjkilybpkpwto-auth-token");

  const accessToken = cookie ? cookie.value : "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/profile");

  return <>{children}</>;
}
