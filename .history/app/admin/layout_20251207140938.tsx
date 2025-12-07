// @ts-nocheck
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export default async function AdminLayout({ children }) {
  // Next.js 16: cookies() must be awaited
  const cookieStore = await cookies();

  // Use YOUR Supabase project’s cookie name:
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

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/profile");
  }

  return <>{children}</>;
}
