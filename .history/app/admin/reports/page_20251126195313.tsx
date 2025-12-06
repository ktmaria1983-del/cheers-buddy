import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function ReportsDashboard() {
  // Create Supabase client (server-side)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get the current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ADMIN PROTECTION
  if (!user || user.id !== "2397f755-d87c-42c2-8b94-32813137f789") {
    redirect("/"); // kick non-admins out
  }

  // Fetch reports
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

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


