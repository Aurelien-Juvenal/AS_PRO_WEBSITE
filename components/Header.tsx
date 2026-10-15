"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";

type HeaderProps = {
  active: NavItem["key"];
  variant?: "plain" | "bordered";
};

export default function Header({ active, variant = "plain" }: HeaderProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  // Menu de navigation ouvert (clé de l'item) et menu utilisateur
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Ferme les menus au clic extérieur et à la touche Échap
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setUserMenuOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  // Survol : ouverture immédiate, fermeture légèrement différée pour
  // laisser le temps de descendre la souris vers le panneau.
  const handleEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const displayName = user?.name || user?.email?.split("@")[0] || "Mon compte";
  const initial = displayName.charAt(0).toUpperCase();

  const wrapperClass =
    variant === "bordered"
      ? "bg-white border-b border-gray-100 relative z-50"
      : "bg-white relative z-50";

  return (
    <header className={wrapperClass}>
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-emerald-500 text-white font-bold px-3 py-2 rounded-lg text-sm">
            AS
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">AS PRO</h1>
            <p className="text-xs text-gray-400">Nettoyage professionnel</p>
          </div>
        </Link>

        {/* Navigation avec menus déroulants */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            const isOpen = openMenu === item.key;

            if (!item.children) {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={
                    isActive
                      ? "text-emerald-500 font-bold"
                      : "hover:text-emerald-500 transition"
                  }
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleEnter(item.key)}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(isOpen ? null : item.key)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 ${
                    isActive
                      ? "text-emerald-500 font-bold"
                      : "hover:text-emerald-500 transition"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Panneau déroulant, juste en dessous de l'entrée */}
                {isOpen && (
                  <div className="absolute left-0 top-full pt-3 w-72">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-2 overflow-hidden">
                      <Link
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        className="block px-3 py-2 rounded-xl text-xs font-bold text-emerald-500 hover:bg-emerald-50 transition"
                      >
                        Voir la page {item.label}
                      </Link>
                      <div className="h-px bg-gray-100 my-1.5 mx-3" />
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="block px-3 py-2 rounded-xl hover:bg-gray-50 transition"
                        >
                          <span className="block text-xs font-semibold text-gray-800">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="block text-[11px] text-gray-400 mt-0.5 leading-snug">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone droite : contact + compte */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            Contactez-nous
          </Link>

          {isLoading ? (
            <div className="w-32 h-9 rounded-full bg-gray-100 animate-pulse" />
          ) : user ? (
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setUserMenuOpen(true);
              }}
              onMouseLeave={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                closeTimer.current = setTimeout(
                  () => setUserMenuOpen(false),
                  150
                );
              }}
            >
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                    {initial}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-700 max-w-[10rem] truncate">
                  {displayName}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full pt-3 w-64">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-2">
                    <div className="px-3 py-2">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {isAdmin ? "Administrateur" : "Client"}
                      </span>
                    </div>

                    <div className="h-px bg-gray-100 my-1.5 mx-3" />

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                        Espace administrateur
                      </Link>
                    )}

                    <Link
                      href="/contact"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      Mon espace
                    </Link>

                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-full hover:bg-emerald-600 transition"
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
