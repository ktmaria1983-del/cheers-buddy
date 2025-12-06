import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function ReportsDashboard() {
  // 1️⃣ Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2️⃣ Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3️⃣ ADMIN PROTECTION (BEFORE return!)
  if (user?.id !== "YOUR_ADMIN_USER_ID") {
    redirect("/"); // send non-admins back home
  }

  // 4️⃣ Fetch all reports
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  // 5️⃣ Render JSX (safe to return now)
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-[#e4e4e7]">
      <h1 className="text-4xl font-bold mb-10">Reports Dashboard</h1>

      {error && (
        <p className="text-red-400">Error fetching reports: {error.message}</p>
      )}

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

