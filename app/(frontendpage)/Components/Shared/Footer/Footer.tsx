"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  User2,
  MapPin,
  Link2,
  GraduationCap,
  Share2,
  Building,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#028237] text-white">
      {/* Top grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Us */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-to-br from-purple-600 to-indigo-500 p-2 rounded-md">
              <MapPin className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Building className="text-[#f5c542]" size={16} />
              Bandarban University
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="text-[#f5c542]" size={16} />
              Bandarban, Chattogram, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-[#f5c542]" size={16} />
              +880 1XXXXXXXXX
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-[#f5c542]" size={16} />
              bucseclub@bu.edu.bd
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-to-br from-green-500 to-teal-400 p-2 rounded-md">
              <Link2 className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" />
              <Link href="/" className="hover:text-[#f5c542]">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" />
              <Link href="/about" className="hover:text-[#f5c542]">
                About Us
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" />
              <Link href="/wings" className="hover:text-[#f5c542]">
                Courses
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" />
              <Link href="/events" className="hover:text-[#f5c542]">
                Events
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" />
              <Link href="/about" className="hover:text-[#f5c542]">
                Our Team
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Courses */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-to-br from-pink-500 to-purple-500 p-2 rounded-md">
              <GraduationCap className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-semibold">Our Courses</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" /> Apps
              Development
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" /> Software
              Development
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" /> Web
              Development
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" /> Machine
              Learning
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={16} className="text-[#f5c542]" /> Robotics &
              IoT
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-to-br from-pink-500 to-red-400 p-2 rounded-md">
              <Share2 className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-semibold">Connect With Us</h3>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="bg-[#1877F2] p-2 rounded-md hover:scale-105 transition"
            >
              <Facebook className="text-white" size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="bg-[#1DA1F2] p-2 rounded-md hover:scale-105 transition"
            >
              <Twitter className="text-white" size={20} />
            </Link>
            <Link
              href="https://youtube.com"
              aria-label="YouTube"
              className="bg-[#d10808] p-2 rounded-md hover:scale-105 transition"
            >
              <Youtube className="text-white" size={20} />
            </Link>
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="bg-[#0077B5] p-2 rounded-md hover:scale-105 transition"
            >
              <Linkedin className="text-white" size={20} />
            </Link>
          </div>

          <Link
            href="/member/register"
            className="bg-linear-to-r  from-[#ff6900] to-[#ffaa00] text-white px-4 py-2 rounded-md  font-semibold flex justify-center items-center gap-2 uppercase border border-amber-50 hover:from-[#ffaa00] hover:to-[#ff6900] transition"
          >
            <User2 /> Become a Member
          </Link>
        </div>
      </div>
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.5248526229866!2d92.16805981137543!3d22.131938645704025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad6b2819643f39%3A0x769c49f9d228c2a9!2sBandarban%20University%20Campus!5e1!3m2!1sen!2sbd!4v1768161984160!5m2!1sen!2sbd"
        className="mt-4 bg mx-16 w-[90%] rounded"
        height="300"
        loading="lazy"
      ></iframe> */}

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} BU CSE Club. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-[#f5c542]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#f5c542]">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
