import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/profile");
  }

  return <>{children}</>;
}
