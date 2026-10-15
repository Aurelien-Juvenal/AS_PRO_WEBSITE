"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  SlidersHorizontal,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/services", label: "Prestations", icon: SlidersHorizontal },
  { href: "/admin/messages", label: "Messages", icon: Mail, badgeKey: "messages" },
] as const;

export default function AdminSidebar({
  unreadMessages = 0,
}: {
  unreadMessages?: number;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-emerald-950 text-white flex flex-col justify-between shrink-0 p-6 min-h-screen">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-lg text-xs">
            AS
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none">AS PRO</h1>
            <p className="text-[10px] text-gray-400">Admin Portal</p>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-medium">
          {links.map(({ href, label, icon: Icon, badgeKey }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  isActive
                    ? "flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-900/50 text-emerald-400 font-bold"
                    : "flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:bg-emerald-900/30 transition"
                }
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4" /> {label}
                </span>
                {badgeKey === "messages" && unreadMessages > 0 && (
                  <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {unreadMessages}
                  </span>
                )}
              </Link>
            );
          })}
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-emerald-900/30 transition"
          >
            <Settings className="w-4 h-4" /> Paramètres
          </a>
        </nav>
      </div>

      <div className="pt-6 border-t border-emerald-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div>
            <p className="text-xs font-bold leading-none">Administrateur</p>
            <p className="text-[10px] text-gray-400">Admin Principal</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-gray-400 hover:text-white"
          aria-label="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
