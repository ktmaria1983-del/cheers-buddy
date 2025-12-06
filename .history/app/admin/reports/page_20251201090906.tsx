import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export default async function ReportsDashboard() {
  // 1️⃣ Create Supabase Server Client using cookies
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 2️⃣ Get the logged-in user (server-side)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3️⃣ ADMIN LOCK
  if (!user || user.id !== "30a1def3-75ab-4d95-aacf-fad2559649ea") {
    redirect("/");
  }

  // 4️⃣ Fetch reports
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  // 5️⃣ Render dashboard
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-[#e4e4e7]">
      <h1 className="text-4xl font-bold mb-10">Reports Dashboard</h1>

      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10">
            <tr className="text-[#c6c6d1]">
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Page</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {reports?.map((r) => (
              <tr
                key={r.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3 max-w-md truncate">{r.description}</td>
                <td className="px-4 py-3">{r.page_url}</td>
                <td className="px-4 py-3">{r.user_id ?? "Anonymous"}</td>
                <td className="px-4 py-3">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
