"use client";

import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Topbanner() {
  return (
    <section className="relative w-full bg-linear-to-br from-[#2b1055] via-[#3c1e70] to-[#1f083e] text-white py-20 px-6 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          NUB CSE Excursion III.0
        </h1>
        <p className="text-lg md:text-xl font-medium mb-8">
          Join us for an amazing tech journey with industry experts
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6900] to-[#ffaa00] text-white px-6 py-3 rounded-full font-semibold uppercase hover:from-[#ffaa00] hover:to-[#ff6900] transition"
          >
            <Users size={20} /> Join Our Community
          </Link>

          <Link
            href="/register"
            className="inline-block bg-white text-[#2b1055] font-bold px-6 py-3 rounded-full uppercase hover:bg-[#f0f0f0] transition"
          >
            Register Now
          </Link>
        </div>

        {/* Registration Date */}
        <p className="mt-6 text-sm text-amber-300 font-semibold">
          Registration Opens: 2 November
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative z-10 mt-16 max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="flex gap-4">
            {["AI Workshop", "Hackathon", "Startup Panel", "Tech Quiz"].map(
              (item, index) => (
                <CarouselItem
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white font-semibold text-lg shadow-md"
                >
                  {item}
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
