"use client";
import React from "react";
import { GraduationCap } from "lucide-react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import Image from "next/image";

export default function Page() {
  const contributors = [
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
        github: "/contributors",
        facebook: "/contributors",
      },
    },
  ];

  return (
    <div className="w-full px-6 py-16 text-[#028237] bg-white">
      {/* Badge Title */}
      <div className="flex justify-center mb-8">
        <div className="relative flex justify-center w-[90%] md:w-[30%] mx-auto">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-6 md:w-[65%] bg-[#028237ba]/30 blur-md rounded-full z-0" />
          <div className="relative flex justify-start items-center px-4 py-2 rounded-full bg-[#028237]/10 border border-amber-50 text-[#028237] font-semibold text-sm z-10">
            <GraduationCap className="w-4 h-4 mr-2" />
            Building Excellence Since Inception
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-5xl font-extrabold mb-5">
        Dev <span className="text-[#ff6900]">Contributors</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed mb-10">
        The builders driving BU CSE Club’s functionality and performance.
      </p>

      {/* Contributors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="group relative h-80 rounded-xl overflow-hidden shadow-md border border-[#028237]/30 hover:shadow-xl transition"
          >
            {/* Background Image */}
            <Image
              src={contributor.image}
              alt={contributor.name}
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Default Bottom Content (Name + Role) */}
            <div className="absolute bottom-0 left-0 text-center right-0 z-20 p-4 text-white bg-linear-to-t from-[#d9ffdca1] to-transparent ">
              <h3 className="text-lg font-bold">{contributor.name}</h3>
              <p className="text-sm font-medium">{contributor.role}</p>
            </div>

            {/* Hover Content */}
            <div className="absolute duration-500 backdrop-blur-sm inset-0 z-30 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity ">
              {/* Batch & Session */}
              <div className="text-center text-sm  mb-4">
                <p>
                  <span className="font-semibold">Batch:</span>{" "}
                  {contributor.batch}
                </p>
                <p>
                  <span className="font-semibold">Session:</span>{" "}
                  {contributor.session}
                </p>
              </div>{" "}
              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href={contributor.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#09c558]"
                >
                  <FaLinkedin className="w-8 h-8" />
                </a>
                <a
                  href={contributor.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#09c558]"
                >
                  <FaGithub className="w-8 h-8" />
                </a>
                <a
                  href={contributor.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#09c558]"
                >
                  <FaFacebook className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
