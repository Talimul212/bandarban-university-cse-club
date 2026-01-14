/* eslint-disable react/no-unescaped-entities */
"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { HeartHandshake, Info } from "lucide-react";
import Image from "next/image";

const images = [
  { src: "/images/idea1.png", title: "Workshops" },
  { src: "/images/Python-logo-notext.svg.png", title: "Hackathons" },
  { src: "/images/cse_club.png", title: "Team Building" },
  { src: "/CSE_Club_Logo.png", title: "CSE_Club" },
];

export default function OurCommunity() {
  return (
    <section className="py-20 md:px-8 w-[96%] mx-auto px-4">
      {/* Top Button */}
      <div data-aos="fade-down">
        <div className="flex justify-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
            <HeartHandshake className="w-4 h-4" />
            Our Community
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Where Code Meets Connection
        </h2>
      </div>
      {/* Gradient Lines */}
      <div className="flex justify-center gap-2 mb-10">
        <div className="h-1 w-16 rounded-full bg-linear-to-r from-white to-[#028237]" />
        <div className="h-1 w-24 rounded-full bg-[#028237]" />
        <div className="h-1 w-16 rounded-full bg-linear-to-r from-[#028237] to-white" />
      </div>
      <div className="mx-auto grid  grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* Left Side: Text */}
        <div data-aos="fade-right">
          <h3 className="text-xl font-extrabold md:text-4xl  text-[#028237]">
            Building Together,{" "}
            <span className="text-[#ff6900]">Learning Together</span>
          </h3>
          <p className="mb-4 text-lg text-gray-600">
            We are a{" "}
            <span className="font-semibold text-black">
              collaborative tech community
            </span>{" "}
            focused on learning, building, and sharing real-world knowledge.
          </p>
          <p className="text-gray-600 text-justify">
            We're more than just a club—we're a diverse community of curious
            minds, problem-solvers, and innovators. Whether you're debugging
            your first program, designing interactive web apps, or exploring
            cutting-edge AI, you'll find support, inspiration, and friendship
            here. Our community thrives on collaboration, creativity, and the
            shared excitement of building the future together.
          </p>
        </div>

        {/* Right Side: */}
        <div
          // data-aos="fade-left"
          className="flex w-52 md:w-full  items-center ms-16 justify-center md:mt-5  "
        >
          <div className="relative grid grid-cols-2  md:gap-6 gap-2 rotate-45">
            {images.map((img, i) => (
              <Tooltip.Provider key={i}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div
                      className="group relative h-24 w-24 overflow-hidden bg-[#09c558]/30 transition-all duration-300 hover:-rotate-45 hover:scale-110 hover:rounded-lg md:h-40 md:w-40 rounded-md
                 border-2 border-[#09c558]"
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-125 -rotate-45 hover:rotate-0 "
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="rounded-md bg-black px-3 py-1 text-sm text-white shadow-lg "
                      sideOffset={8}
                    >
                      {img.title}
                      <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
