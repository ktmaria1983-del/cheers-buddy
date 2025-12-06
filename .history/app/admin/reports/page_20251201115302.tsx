import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function ReportsDashboard() {
  const supabase = createSupabaseServer();

  // 1) Load user server-side
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2) ADMIN LOCK — REPLACE THIS WITH YOUR USER ID
  if (!user || user.id !== "YOUR_ADMIN_USER_ID") {
    redirect("/");
  }

  // 3) Fetch reports server-side
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-[#e4e4e7]">
      <h1 className="text-4xl font-bold mb-10">Reports Dashboard</h1>

      {error && (
        <p className="text-red-400 mb-4">Error: {error.message}</p>
      )}

      {!reports || reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
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
              {reports.map((r: any) => (
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
      )}
    </div>
  );
}
