"use client";
import React from "react";
import Image from "next/image";
import { Handshake } from "lucide-react";

export default function PartnersSection() {
  const partners = [
    {
      name: "bdapps",
      logo: "/images/f8768ed99192e041abda13b05_4b6f4b8ca6e09773d8e3bfc08_images.png", // place logo in /public/partners
      link: "https://bdapps.com/",
    },
    {
      name: "YUNet",
      logo: "/images/logo.png",
      link: "https://yunet.asia/",
    },
    {
      name: "ICT Olympiad Bangladesh",
      logo: "/images/logo_1747042969.png",
      link: "https://ictolympiad.org/",
    },
    {
      name: "BASIS",
      logo: "/images/668b673940a1fBasis_logo.jpeg",
      link: "https://basis.org.bd/",
    },
    {
      name: "বান্দরবান জেলা পরিষদ",
      logo: "/images/বান্দরবান_জেলা_পরিষদ.png",
      link: "https://bhdc.gov.bd/",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="flex justify-center mb-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
          <Handshake className="w-4 h-4" />
          Our Partners
        </button>
      </div>

      <div className="mx-auto max-w-6xl text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-blacK">
          Our Partners, Events & Sponsors
        </h2>
        {/* Gradient Lines */}
        <div className="flex justify-center gap-2 mb-10">
          <div className="h-1 w-16 rounded-full bg-linear-to-r from-white to-[#028237]" />
          <div className="h-1 w-24 rounded-full bg-[#028237]" />
          <div className="h-1 w-16 rounded-full bg-linear-to-r from-[#028237] to-white" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We are proud to collaborate with leading organizations and events that
          empower innovation and technology in Bangladesh.
        </p>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex  border-b border-green-400 flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="w-28 h-28 relative mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
