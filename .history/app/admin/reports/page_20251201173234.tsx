import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function ReportsPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
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
          cookieStore.delete({ name, ...options });
        }
      }
    }
  );

  const { data } = await supabase.auth.getUser();

  // Redirect if not admin
  if (!data.user || data.user.id !== "30a1def3-75ab-4d95-aacf-fad2559649ea") {
    return <div className="text-white p-10">Access denied</div>;
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Reports Dashboard</h1>
      {/* Content here */}
    </div>
  );
}


