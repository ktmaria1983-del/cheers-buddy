import { cookies } from "next/headers";

export default function DebugCookies() {
  const c = cookies();

  return (
    <pre className="text-white p-6">
      {JSON.stringify(c, null, 2)}
    </pre>
  );
}
