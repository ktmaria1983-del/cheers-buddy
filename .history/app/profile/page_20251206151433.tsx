import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="text-white p-10">
        <h1 className="text-2xl font-bold">Not Logged In</h1>
        <p className="mt-2 text-slate-300">
          You need to log in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <div className="bg-[#0f0f16] p-6 rounded-xl border border-white/10 space-y-3">
        <p><span className="text-slate-400">Email:</span> {user.email}</p>
        <p><span className="text-slate-400">User ID:</span> {user.id}</p>
      </div>
    </div>
  );
}
