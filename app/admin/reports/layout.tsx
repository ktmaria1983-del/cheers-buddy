"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Reports", href: "/admin/reports" },
    { name: "Users", href: "/admin/users" },
  ];

  return (
    <div className="min-h-screen flex bg-[#0f0f16] text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  block px-4 py-2 rounded-lg font-semibold
                  transition-all
                  ${active
                    ? "bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black"
                    : "text-slate-300 hover:bg-white/10"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
