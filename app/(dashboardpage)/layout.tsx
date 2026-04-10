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
  CalendarDays,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

// ─── Nav config ────────────────────────────────────────────────────────────────
const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    label: "Members",
    icon: Users,
    key: "members",
    children: [
      { href: "/dashboard/enrollManagement", label: "Registration List" },
      { href: "/dashboard/students", label: "Student Database" },
    ],
  },
  {
    label: "Academic",
    icon: Briefcase,
    key: "academic",
    children: [
      { href: "/dashboard/courses", label: "Manage Courses" },
      { href: "/dashboard/wings", label: "Learning Wings" },
    ],
  },
  { href: "/dashboard/events", label: "Events", icon: CalendarDays },
  {
    label: "Media",
    icon: FileText,
    key: "media",
    children: [
      { href: "/dashboard/banner", label: "Hero Banner" },
      { href: "/dashboard/gallery", label: "Gallery Photos" },
      { href: "/dashboard/events", label: "Club Events" },
    ],
  },
  { href: "/dashboard/users", label: "Users", icon: Users },
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
            ${
              isOpen
                ? "bg-[#09c558]/20 text-[#09c558]"
                : "text-white/70 hover:bg-[#09c558]/10 hover:text-white"
            }`}
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
          <div className="mt-1 ml-4 pl-3 border-l border-[#09c558]/20 space-y-0.5">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`block text-xs py-1.5 px-2 rounded-lg transition-colors
                  ${
                    pathname === child.href
                      ? "text-[#09c558] font-semibold"
                      : "text-white/50 hover:text-white/80"
                  }`}
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
        ${
          isActive
            ? "bg-[#09c558]/20 text-[#09c558] border border-[#09c558]/20"
            : "text-white/70 hover:bg-[#09c558]/10 hover:text-white"
        }`}
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
      <div className="min-h-screen bg-[#050f0a] flex flex-col">
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
    <div className="min-h-screen flex">
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`${
          collapsed ? "w-17 sticky" : "w-60 fixed sm:sticky"
        } shrink-0 top-0 h-screen z-50 flex flex-col bg-[#050f0a] border-r border-[#09c558]/10 transition-all duration-300`}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#09c558] to-transparent opacity-40" />

        {/* Logo / Header */}
        <div
          className={`flex items-center h-16 border-b border-[#09c558]/10 px-4 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#09c558]/20 border border-[#09c558]/30 flex items-center justify-center shrink-0">
                <Wrench className="w-3.5 h-3.5 text-[#09c558]" />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                BU CSE Club
              </span>
            </div>
          )}
          {collapsed && (
            <div
              onClick={() => setCollapsed(false)}
              className="w-7 h-7 cursor-pointer rounded-lg bg-[#09c558]/20 border border-[#09c558]/30 flex items-center justify-center"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#09c558]" />
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="text-white/40 hover:text-white cursor-pointer transition-colors p-1 rounded-lg hover:bg-[#09c558]/10"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-none">
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

        {/* Collapse/expand button (collapsed state) */}
        {collapsed && (
          <div className="px-3 py-2">
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex justify-center text-white/40 hover:text-[#09c558] p-2 rounded-xl hover:bg-[#09c558]/10 transition-colors"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-3 py-4 border-t border-[#09c558]/10">
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2">
              <div className="w-7 h-7 rounded-full bg-[#09c558]/20 border border-[#09c558]/30 flex items-center justify-center shrink-0">
                <span className="text-[#09c558] text-xs font-bold">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {session?.user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-white/30 truncate">
                  {session?.user?.email ?? ""}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-full bg-[#09c558]/20 border border-[#09c558]/30 flex items-center justify-center">
                <span className="text-[#09c558] text-xs font-bold">
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
        <header className="h-16 shrink-0 sticky top-0 z-40 flex items-center justify-between px-6 bg-[#050f0a] border-b border-[#09c558]/10">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#09c558] to-transparent opacity-30" />

          <div className="flex items-center gap-2">
            {/* Visit Site pill */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium text-[#09c558]
               bg-[#09c558]/10 hover:bg-[#09c558]/20 border border-[#09c558]/20 hover:border-[#09c558]/40
               px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              <Home className="w-3.5 h-3.5" />
              <p className="hidden sm:block">Visit Site</p>
            </Link>

            {/* Separator */}
            <ChevronRight className="w-3 h-3 text-white/30 shrink-0" />

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
                          ? "text-[#09c558] bg-[#09c558]/10 border border-[#09c558]/20"
                          : "text-white/50"
                      }`}
                  >
                    {segment.replace(/-/g, " ")}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-white/30 shrink-0" />
                  )}
                </React.Fragment>
              ))}

            {pathname === "/dashboard" && (
              <span className="text-xs capitalize px-2 py-1 rounded-md font-medium text-[#09c558] bg-[#09c558]/10 border border-[#09c558]/20">
                Home
              </span>
            )}
          </div>

          {/* User dropdown */}
          <div ref={dropdownRef} className="relative flex items-center">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors
                         bg-[#09c558]/10 hover:bg-[#09c558]/20 border border-[#09c558]/20 px-3 py-1.5 rounded-xl"
            >
              <span className="text-xs">
                <span className="hidden md:inline text-white/40">Howdy, </span>
                <span className="font-semibold text-white">
                  {session?.user?.name?.split(" ")[0] ?? "Admin"}
                </span>
              </span>
              <div className="w-6 h-6 rounded-full bg-[#09c558]/20 border border-[#09c558]/30 hidden sm:flex items-center justify-center">
                <span className="text-[#09c558] text-xs font-bold">
                  {initials}
                </span>
              </div>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-[#050f0a] border border-[#09c558]/15 rounded-2xl shadow-2xl shadow-black/50 py-2 z-50 overflow-hidden">
                {/* Top glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#09c558] to-transparent opacity-40" />

                {/* User info */}
                <div className="px-4 py-3 border-b border-[#09c558]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#09c558]/20 border border-[#09c558]/30 flex items-center justify-center shrink-0">
                      <span className="text-[#09c558] text-sm font-bold">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {session?.user?.name ?? "Admin"}
                      </p>
                      <p className="text-xs text-white/30 truncate">
                        {session?.user?.email ?? "admin@bucse.club"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-2 py-2 space-y-0.5">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-[#09c558]/10 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#ff6900]/70 hover:text-[#ff6900] hover:bg-[#ff6900]/10 transition-colors"
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
        <div className="flex-1 p-6 bg-[#080f0b]">{children}</div>
      </main>
    </div>
  );
}
