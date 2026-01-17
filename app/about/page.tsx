"use client";
import React from "react";
import { Star, CalendarDays } from "lucide-react";

const timelineEvents = [
  {
    year: "2022",
    title: "Foundation",
    description:
      "Foundation of BU CSE Club — established to unite tech enthusiasts and empower students through coding, design, and innovation.",
    borderColor: "#dafbe7", // highlight first card
  },
  {
    year: "2023",
    title: "Early Growth & Recognition",
    description:
      "Hosted workshops, contests, and launched the BU CSE Club website and Bus Tracking App.",
    borderColor: "#dafbe7",
  },
  {
    year: "2024",
    title: "Expansion & Collaboration",
    description:
      "Partnered with other clubs, organized inter-university tech events, and grew the development committee.",
    borderColor: "#dafbe7",
  },
  {
    year: "2025",
    title: "Leading with Innovation",
    description:
      "Launched new platforms, contributed to open-source, and became a recognized tech force at BU.",
    borderColor: "#dafbe7",
  },
];

export default function Page() {
  return (
    <div className="w-full text-[#028237] px-6 py-16">
      {/* Badge */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center border border-amber-50 gap-2 px-4 py-2 rounded-full bg-[#028237]/20 text-[#028237] font-semibold text-sm shadow-md">
          <Star className="w-4 h-4" />
          Journey Through Innovation
        </div>
      </div>

      {/* Title */}
      <h1 className="text-center text-3xl md:text-5xl text-[#028237] font-extrabold mb-4">
        The Story of <span className="text-[#ff6900]">BU CSE Club</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed mb-16">
        From its foundation in 2022 to leading university-wide tech festivals,
        BU CSE Club has grown into a powerhouse of innovation, collaboration,
        and student-led excellence.
      </p>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#028237]/40" />

        {/* Timeline Items */}
        <div className="space-y-16">
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0; // alternate left/right
            const delay = index * 200; // staggered animation delay

            return (
              <div
                key={event.year}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="flex flex-col md:flex-row items-center md:items-start relative"
              >
                {/* Dot */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 rounded-full bg-[#028237] border-4 border-white shadow-md animate-pulse" />

                {/* Content */}
                {isLeft ? (
                  <>
                    <div className="md:w-1/2 md:pr-8 md:h-[50vh] text-right md:text-left">
                      <div
                        className="relative bg-white rounded-xl p-6 shadow-md"
                        style={{ border: `2px solid ${event.borderColor}` }}
                      >
                        {/* Glow */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-2 bg-[#028237]/20 blur-lg " />
                        <div className="flex justify-end md:justify-start items-center gap-2 mb-2">
                          <CalendarDays className="w-5 h-5 text-[#028237]" />
                          <h3 className="text-xl font-bold">{event.year}</h3>
                        </div>
                        <p className="text-black/80">{event.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:block w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block w-1/2 md:h-[50vh] " />
                    <div className="md:w-1/2 md:pl-8 text-left">
                      <div
                        className="relative bg-white rounded-xl p-6 shadow-md"
                        style={{ border: `2px solid ${event.borderColor}` }}
                      >
                        {/* Glow */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-2 bg-[#028237]/20 blur-lg rounded-full" />
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarDays className="w-5 h-5 text-[#028237]" />
                          <h3 className="text-xl font-bold">{event.year}</h3>
                        </div>
                        <p className="text-black/80">{event.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
