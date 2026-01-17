"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  User2,
  Home,
  Info,
  CalendarDays,
  BookOpen,
  Images,
  Users,
  Mail,
  Monitor,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { primaryColors } from "@/utils/Color";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "About", href: "/about", icon: <Info size={18} /> },
  { name: "Events", href: "/events", icon: <CalendarDays size={18} /> },
  { name: "Courses", href: "/courses", icon: <BookOpen size={18} /> },
  { name: "Gallery", href: "/gallery", icon: <Images size={18} /> },
  { name: "Contributors", href: "/contributors", icon: <Mail size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  React.useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [drawerOpen]);

  return (
    <nav className="bg-[#dafbe7] sticky top-0 z-50 text-black font-[Inter,sans-serif] px-6 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/CSE_Club_Logo.png"
            alt="BU CSE Club Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <span className={`uppercase text-xs text-[${primaryColors}]`}>
              Bandarban University
            </span>
            <span className="text-sm text-[#195734] font-bold">CSE CLUB</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`hover:text-[#195734] text-sm uppercase text-[#028237] ${
                  pathname === link.href ? "font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Join Button */}
        <Link
          href="/member/register"
          className="hidden md:flex bg-linear-to-r from-[#ff6900] to-[#ffaa00] text-white px-4 py-2 rounded-full font-semibold items-center gap-2 uppercase border border-amber-50 hover:from-[#ffaa00] hover:to-[#ff6900] transition"
        >
          <User2 /> Get Involved
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-[#028237]"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {/* Overlay (modal background) */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#dafbe7]/95 shadow-xl z-50 
    transform transition-transform duration-500 overflow-y-auto
    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 mt-2 border-b border-amber-50">
          <div className="flex items-center gap-2">
            <Monitor
              size={35}
              className="bg-linear-to-br text-white from-green-500 to-teal-400 p-2 rounded-md"
            />
            <p className="text-[#028237] font-bold text-lg flex flex-col">
              BU
              <span className="text-xs">CSE CLUB</span>
            </p>
          </div>
          <button onClick={() => setDrawerOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col gap-10 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 text-[#028237] text-sm uppercase font-medium ${
                  pathname === link.href ? "font-bold" : ""
                }`}
                onClick={() => setDrawerOpen(false)}
              >
                {link.icon} {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Join Button */}
        <div className="px-6 mt-4 mb-10">
          <Link
            href="/member/register"
            className="bg-linear-to-r from-[#ff6900] to-[#ffaa00] text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 uppercase border border-amber-50 hover:from-[#ffaa00] hover:to-[#ff6900] transition"
            onClick={() => setDrawerOpen(false)}
          >
            <User2 />
            Get Involved
          </Link>
        </div>
      </div>
    </nav>
  );
}
