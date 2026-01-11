"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { primaryColors } from "@/utils/Color";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Courses", href: "/courses" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#dafbe7] sticky top-0 z-50 text-black font-[Inter,sans-serif] px-6 py-0.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/CSE_Club_Logo.png"
            alt="BU CSE Club Logo"
            width={70}
            height={60}
            className="rounded-full"
          />
          <p className="font-bold flex flex-col text-xl tracking-wide">
            <span className={`uppercase text-sm text-[${primaryColors}]`}>
              Bandarban University
            </span>
            <span className="text-sm text-[#195734]">CSE CLUB</span>
          </p>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-8 font-medium items-center ">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`hover:text-[#195734] text-sm uppercase text-[#028237] ${
                  pathname === link.href ? "font-bold " : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Team Dropdown */}
        </ul>

        {/* Join Us Button */}
        <Link
          href="/join"
          className="bg-linear-to-r border-amber-50 border uppercase from-[#ff6900]  to-[#ffaa00] 
             text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 
             hover:from-[#ffaa00]  hover:to-[#ff6900] transition"
        >
          <User2 /> Get Involved
        </Link>
        {/* <Link
          href="/join"
          className="bg-linear-to-r from-[#028237] to-[#195734] 
             text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 
             uppercase border border-amber-50 
             hover:from-[#195734] hover:to-[#028237] transition"
        >
          <User2 /> Get Involved
        </Link> */}
      </div>
    </nav>
  );
}
