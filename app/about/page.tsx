"use client";
import React from "react";
import { Star, CalendarDays } from "lucide-react";
import All_Executives from "./components/All_Executives";

const timelineEvents = [
  {
    id: 1,
    year: "2020",
    title: "Foundation of BU CSE Club",
    description:
      "BU CSE Club was established in 2020 with a vision to ignite curiosity, collaboration, and innovation among tech-driven students. Since then, it has evolved into a dynamic platform for aspiring developers, designers, and thinkers to explore computer science through workshops, seminars, hackathons, and community events.",
    borderColor: "#dafbe7",
  },
  {
    id: 2,
    year: "2023",
    title: "National Achievement: BDapps Hackathon",
    description:
      "Team 'The Sangu' from BU CSE Club achieved 🥉 2nd Runner-Up in the BDapps National Hackathon 2023, organized by ICT Division & Robi Axiata. Their project, a CHT-based Tourism Android App, showcased innovation and problem-solving skills on a national stage.",
    borderColor: "#dafbe7",
  },
  {
    id: 3,
    year: "2025",
    title: "Cybersecurity Awareness Seminars",
    description:
      "In January 2025, BU CSE Club organized two seminars on Cybersecurity Awareness & IT Career. Held at Bandarban Govt. Women College and Bandarban Govt. College, the sessions were presented by BDapps, sponsored by Success Academic & Admission Care, and guided students toward safe internet practices and IT career opportunities.",
    borderColor: "#dafbe7",
  },
  {
    id: 4,
    year: "2025",
    title: "CSE Fest & Strategic Collaboration",
    description:
      "CSE Fest 2025 (25–27 Jan) was a three-day celebration of creativity and collaboration at BU. Events included a Programming Contest, Information Olympiad, Gaming Contest, Photo Exhibition, and Project Showcase. On 27 Jan, BU CSE Club also signed an MoU with Youth Upskill Network (YUNet) during the 'Safe Internet for Career Empowerment' session.",
    borderColor: "#dafbe7",
  },
  {
    id: 5,
    year: "2025",
    title: "Industry Collaboration & Inspiration",
    description:
      "On 15 May 2025, BU CSE Club hosted the BDApps Innovation Summit Roadshow, inspiring students in app development. Later, the Programming Hero Campus Session featured Dr. M. Zahirul Hoque, Mr. Abdur Rakib (COO, Programming Hero), BU Faculty, and Club Leaders, motivating students with insights on coding, teamwork, and innovation.",
    borderColor: "#dafbe7",
  },
  {
    id: 6,
    year: "2026",
    title: "Official Website Launch",
    description:
      "In 2026, BU CSE Club launched its official website, creating a central hub for events, archives, leadership records, and resources. The platform strengthened the club’s digital presence, ensuring transparency, engagement, and recognition across Bandarban University.",
    borderColor: "#dafbe7",
  },
];

export default function Page() {
  return (
    <div className="w-full text-[#028237]  py-16">
      {/* Badge */}
      <div className=" flex justify-center mb-4">
        <div className="flex items-center border border-amber-50 gap-2 px-4 py-2 rounded-full bg-[#028237]/20 text-[#028237] font-semibold text-sm shadow-md">
          <Star className="w-4 h-4" />
          Journey Through Innovation
        </div>
      </div>

      {/* Title */}
      <h1 className="px-6 text-center text-3xl md:text-5xl text-[#028237] font-extrabold mb-4">
        The Story of <span className="text-[#ff6900]">BU CSE Club</span>
      </h1>

      {/* Subtitle */}
      <p className="px-6 text-center text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed mb-16">
        From its foundation in 2025 to leading university-wide tech festivals,
        BU CSE Club has grown into a powerhouse of innovation, collaboration,
        and student-led excellence.
      </p>

      {/* Timeline */}
      <div className="px-6 mb-14 relative w-[90%] mx-auto">
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
                    <div className="md:w-1/2 md:pr-8 md:h-[30vh] text-right md:text-left">
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
                        <p className="text-black/80 text-justify">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block w-1/2 md:h-[30vh] " />
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
                        <p className="text-black/80 text-justify">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <All_Executives />
    </div>
  );
}
