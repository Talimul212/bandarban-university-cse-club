"use client";
import React from "react";
import { GraduationCap, ExternalLink } from "lucide-react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import Image from "next/image";

export default function ContributorsPage() {
  const contributors = [
    {
      name: "Yeasin Arafath",
      batch: "3rd",
      role: "Designer",
      session: "Spring-2020",
      image:
        "https://i.ibb.co.com/FkqFFv3n/485800532-659051059868155-5247869984741140708-n-removebg-preview.png", // Using the path from your previous committee data
      isDesigner: true,
      socials: {
        linkedin: "https://www.linkedin.com/in/yeasin-arafath-shahin/",
        github: "#",
        facebook: "https://www.facebook.com/yeasinarafathshahin",
      },
    },
    {
      name: "Uhai Mong",
      batch: "3rd",
      role: "Full Stack Developer",
      session: "Spring-2020",
      image: "https://i.ibb.co.com/gJmbQS0/uhai.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/uhai-mong/",
        github: "https://github.com/UhaiMong",
        facebook: "https://www.facebook.com/uhaimong.bd",
      },
    },
    {
      name: "Talimul Islam",
      batch: "5th",
      session: "Spring-2022",
      role: "Software Engineer",
      image: "https://i.ibb.co.com/s1nTTSR/talimul.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/talimul-islam-77965a22a/",
        github: "https://github.com/Talimul212",
        facebook: "https://www.facebook.com/talimul.islam.52493/",
      },
    },
    {
      name: "Durjoy Barua",
      batch: "7th",
      session: "Autumn-2023",
      role: "Software Developer",
      image: "https://i.ibb.co.com/DDvFS8v9/durjoy.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/durjoy-barua-2615b2345/",
        github: "#",
        facebook: "#",
      },
    },
  ];

  return (
    <div className="w-full px-4 md:px-6 py-12 text-[#028237] bg-gray-50/30">
      {/* Badge Title */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#028237]/10 border border-[#028237]/20 text-[#028237] font-bold text-[10px] md:text-xs tracking-widest uppercase z-10">
          <GraduationCap className="w-3.5 h-3.5 mr-2" />
          Building Excellence Since Inception
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black mb-3">
          Dev <span className="text-[#ff6900]">Contributors</span>
        </h2>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          The brilliant minds architecting the digital future of BU CSE Club.
        </p>
      </div>

      {/* Contributors Grid */}
      <div className="grid grid-cols-1  md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            tabIndex={0} // Makes card focusable on mobile tap
            className="group relative h-87.5 md:h-105 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            {/* Background Image */}
            <Image
              src={contributor.image}
              alt={contributor.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-focus:scale-110"
            />

            {/* Dark Gradient Overlay (Static for readability) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-10" />

            {/* Default Info (Visible initially, slides up on mobile focus/hover) */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white transition-transform duration-500 group-hover:-translate-y-24 group-focus:-translate-y-24">
              <h3 className="text-xl md:text-2xl font-bold mb-1 tracking-tight">
                {contributor.name}
              </h3>
              <p className="text-[#02c35a] text-sm font-bold uppercase tracking-wider">
                {contributor.role}
              </p>
            </div>

            {/* Mobile-Friendly Reveal Section */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-10 px-6 text-white opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
              <div className="w-full space-y-3 mb-6 border-t border-white/20 pt-4">
                <div className="flex justify-between text-xs uppercase tracking-widest font-medium text-gray-300">
                  <span>Batch</span>
                  <span className="text-white">{contributor.batch}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest font-medium text-gray-300">
                  <span>Session</span>
                  <span className="text-white">{contributor.session}</span>
                </div>
              </div>

              {/* Social Icons - Larger Tappable Area for Mobile */}
              <div className="flex gap-6">
                <a
                  href={contributor.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-[#028237] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                  href={contributor.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-[#028237] transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href={contributor.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-[#028237] transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Mobile Hint Icon */}
            <div className="absolute top-4 right-4 z-20 md:hidden bg-gray-700 backdrop-blur-md p-2 rounded-full">
              <ExternalLink className="w-4 h-4 text-white opacity-70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
