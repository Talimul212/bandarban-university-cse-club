"use client";
import React, { useState } from "react";
import { ChevronDown, User, Calendar } from "lucide-react";
import Image from "next/image";

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface Member {
  name: string;
  role: string;
  term: string;
  photo: string;
}

interface Committee {
  year: string;
  description: string;
  members: Member[];
}

const committees: Committee[] = [
  {
    year: "2024",
    description:
      "This team laid the foundation for a new era of engagement, organizing key workshops and seminars that expanded the club’s reach and visibility.",
    members: [
      {
        name: "Yeasin Arafath",
        role: "President",
        term: "2024",
        photo: "/member/1.1.png",
      },
      {
        name: "Sajjadul Islam",
        role: "Vice President",
        term: "2024",
        photo: "/member/3.1.png",
      },
      {
        name: "Talimul Islam",
        role: "General Secretary",
        term: "2024",
        photo: "/member/1.2.png",
      },
    ],
  },
  {
    year: "2025",
    description:
      "Under this dynamic leadership, the club scaled its activities, introduced new initiatives, and strengthened its presence in the tech community of Bandarban.",
    members: [
      {
        name: "Talimul Islam",
        role: "President",
        term: "2025",
        photo: "/member/1.png",
      },
      {
        name: "Mamun Uddin",
        role: "Vice President",
        term: "2025",
        photo: "/member/2.png",
      },
      {
        name: "Md. Jahed Hossen",
        role: "Vice President",
        term: "2025",
        photo: "/member/3.png",
      },
      {
        name: "Durjoy Barua",
        role: "General Secretary",
        term: "2025",
        photo: "/member/4.png",
      },
      {
        name: "Enamul Hoque Sifat",
        role: "Joint General Secretary",
        term: "2025",
        photo: "/member/5.png",
      },
      {
        name: "Hasan Imam Uddin Mehedi",
        role: "Finance Secretary",
        term: "2025",
        photo: "/member/6.png",
      },
      {
        name: "Prema Das",
        role: "Assistant Finance Secretary",
        term: "2025",
        photo: "/member/7.png",
      },
      {
        name: "Pratush Barua",
        role: "Office Secretary",
        term: "2025",
        photo: "/member/8.png",
      },
      {
        name: "Himel Paul",
        role: "Publicity Secretary",
        term: "2025",
        photo: "/member/9.png",
      },
      {
        name: "Tretakka Tanchangya",
        role: "Organizing Secretary",
        term: "2025",
        photo: "/member/10.png",
      },
      {
        name: "Sadman Sakib Rashid",
        role: "Member",
        term: "2025",
        photo: "/member/11.png",
      },
    ],
  },
];

// ─── SUB-COMPONENT: MEMBER CARD ──────────────────────────────────────────────
const MemberCard = ({ member }: { member: Member }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
    <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-50">
      <Image
        src={member.photo}
        alt={member.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow text-center bg-[#f0fff4]">
      <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 mb-1">
        {member.name}
      </h4>
      <p className="text-[#028237] font-semibold text-xs mb-2 uppercase tracking-wide">
        {member.role}
      </p>
      <div className="mt-auto pt-2 border-t border-[#028237]/10 flex items-center justify-center gap-1.5 text-gray-500 text-[10px] font-bold">
        <Calendar className="w-3 h-3" />
        <span>SESSION {member.term}</span>
      </div>
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ExecutiveCommittee() {
  // Default to opening the most recent year
  const [openYear, setOpenYear] = useState<string | null>("2025");

  const toggleYear = (year: string) => {
    setOpenYear(openYear === year ? null : year);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#028237] mb-4">
            Executive Committees
          </h2>
          <div className="w-20 h-1.5 bg-[#ff6900] mx-auto rounded-full" />
        </div>

        <div className="space-y-6">
          {committees.map((committee) => {
            const isOpen = openYear === committee.year;

            return (
              <div
                key={committee.year}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleYear(committee.year)}
                  className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors ${
                    isOpen
                      ? "bg-[#028237] text-white"
                      : "bg-white text-[#028237] hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg md:text-xl font-bold tracking-tight">
                    Executive Committee – {committee.year}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 md:p-10">
                    <p className="text-gray-600 mb-10 max-w-3xl leading-relaxed italic border-l-4 border-[#ff6900] pl-4">
                      {committee.description}
                    </p>

                    <div className="grid grid-cols-1  md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                      {committee.members.map((member, i) => (
                        <MemberCard key={i} member={member} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
