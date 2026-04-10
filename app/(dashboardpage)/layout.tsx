// app/dashboard/layout.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Wrench,
  FileText,
  Users,
  Settings,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Home,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

// ─── Nav config ────────────────────────────────────────────────────────────────
const navItems = [
  // { href: "/", label: "Visit Site", icon: Home, external: true },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Services",
    icon: Wrench,
    key: "services",
    children: [{ href: "/dashboard/services", label: "All Services" }],
  },
  {
    label: "Blog",
    icon: FileText,
    key: "blog",
    children: [{ href: "/dashboard/blog", label: "All Posts" }],
  },
  { href: "/dashboard/users", label: "Users", icon: Users },
  {
    label: "Offerings",
    icon: Briefcase,
    key: "offerings",
    children: [{ href: "/dashboard/offerings", label: "All Offerings" }],
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

// ─── Types ──────────────────────────────────────────────────────────────────────
type NavChild = { href: string; label: string };
type NavItem = {
  href?: string;
  label: string;
  icon: React.ElementType;
  key?: string;
  children?: NavChild[];
  external?: boolean;
};

// ─── NavLink ────────────────────────────────────────────────────────────────────
function NavLink({
  item,
  collapsed,
  pathname,
  openMenu,
  toggleMenu,
}: {
  item: NavItem;
  collapsed: boolean;
  pathname: string;
  openMenu: string | null;
  toggleMenu: (key: string) => void;
}) {
  const Icon = item.icon;
  const isActive = item.href ? pathname === item.href : false;
  const isOpen = item.key ? openMenu === item.key : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => item.key && toggleMenu(item.key)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
            ${isOpen ? "bg-white/10 text-white" : "text-white hover:bg-white/5 hover:text-white"}`}
        >
          <span className="flex items-center gap-3">
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && item.label}
          </span>
          {!collapsed && (
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </button>
        {!collapsed && isOpen && (
          <div className="mt-1 ml-4 pl-3 border-l border-white/10 space-y-0.5">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`block text-xs py-1.5 px-2 rounded-lg transition-colors
                  ${pathname === child.href ? "text-white font-medium" : "text-white hover:text-gray-300"}`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const Comp = item.external ? "a" : Link;
  return (
    <Comp
      href={item.href!}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
        ${isActive ? "bg-white/15 text-white" : "text-white hover:bg-white/5 hover:text-white"}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {!collapsed && item.label}
    </Comp>
  );
}

// ─── Layout ─────────────────────────────────────────────────────────────────────
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleMenu = (menu: string) =>
    setOpenMenu(openMenu === menu ? null : menu);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isLoginPage = pathname === "/wp-admin";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex-1 p-6">{children}</div>
      </div>
    );
  }

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "A";

  return (
    <div className="min-h-screen flex ">
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`${collapsed ? "w-17 sticky" : "w-60 fixed sm:sticky"} shrink-0 top-0 h-screen z-50 flex flex-col bg-gray-900 border-r border-white/5 transition-all duration-300`}
      >
        {/* Logo / Header */}
        <div
          className={`flex items-center h-16 border-b border-white/5 px-4 ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Wrench className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                QuickCarpentry
              </span>
            </div>
          )}
          {collapsed && (
            <div
              onClick={() => setCollapsed(false)}
              className="w-7 h-7 cursor-pointer rounded-lg bg-primary flex items-center justify-center"
            >
              <ChevronRight className="w-3.5 h-3.5  text-white" />
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="text-white hover:text-white/90 cursor-pointer transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-none text-white  hover:text-white/70">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              item={item}
              collapsed={collapsed}
              pathname={pathname}
              openMenu={openMenu}
              toggleMenu={toggleMenu}
            />
          ))}
        </nav>

        {/* Collapse expand button (collapsed state) */}
        {collapsed && (
          <div className="px-3 py-2">
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex justify-center text-white  hover:text-white/40 p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/5">
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">{initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {session?.user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session?.user?.email ?? ""}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">
                  {initials}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 shrink-0 sticky top-0 z-40 flex items-center justify-between px-6 bg-gray-900 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-2">
            {/* Visit Site pill */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium text-white hover:text-white
               bg-primary/40 hover:bg-white/10 border border-white/5 hover:border-white/10
               px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              <Home className="w-3.5 h-3.5" />
              <p className="hidden sm:block">Visit Site</p>
            </Link>

            {/* Separator */}
            <ChevronRight className="w-3 h-3 text-white shrink-0" />

            {/* Breadcrumb crumbs */}
            {pathname
              .replace(/^\/dashboard\/?/, "")
              .split("/")
              .filter(Boolean)
              .map((segment, i, arr) => (
                <React.Fragment key={segment}>
                  <span
                    className={`text-xs capitalize px-2 py-1 rounded-md font-medium
            ${
              i === arr.length - 1
                ? "text-white bg-white/8 border border-white/10"
                : "text-white"
            }`}
                  >
                    {segment.replace(/-/g, " ")}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-white shrink-0" />
                  )}
                </React.Fragment>
              ))}

            {/* Fallback when at /dashboard root */}
            {pathname === "/dashboard" && (
              <span className="text-xs capitalize px-2 py-1 rounded-md font-medium text-white bg-white/8 border border-white/10">
                Home
              </span>
            )}
          </div>

          {/* User dropdown */}
          <div ref={dropdownRef} className="relative flex items-center">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors
                         bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-xl"
            >
              <span className="text-xs">
                <span className="hidden md:block">Howdy, </span>
                <span className="font-semibold text-white">
                  {session?.user?.name?.split(" ")[0] ?? "Admin"}
                </span>
              </span>
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 hidden sm:flex items-center justify-center">
                <span className="text-white text-xs font-bold">{initials}</span>
              </div>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm font-bold">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {session?.user?.name ?? "Admin"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session?.user?.email ?? "admin@handyman.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-2 py-2 space-y-0.5">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 bg-white ">{children}</div>
      </main>
    </div>
  );
}
