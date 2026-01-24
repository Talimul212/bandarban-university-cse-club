"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const committees = [
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
        photo: "/member/1.png",
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

export default function ExecutiveCommittee() {
  const [openYear, setOpenYear] = useState<string | null>(null);

  const toggleYear = (year: string) => {
    setOpenYear(openYear === year ? null : year);
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="md:w-[95%] w-full mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#028237] text-center mb-12">
          Executive Committees
        </h2>

        {committees.map((committee) => (
          <div
            key={committee.year}
            className="mb-6 border rounded bg-white shadow"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleYear(committee.year)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-[#028237] cursor-pointer bg-[#028237]/10 transition"
            >
              <span>Executive Committee – {committee.year}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openYear === committee.year ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Content */}
            {openYear === committee.year && (
              <div className="px-6 pb-6 pt-2">
                <p className="text-sm text-gray-700 hidden md:block mb-6">
                  {committee.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {committee.members.map((member, i) => (
                    <div
                      key={i}
                      className="bg-[#E3F9E7]   rounded shadow hover:shadow-md transition flex flex-col items-center text-center"
                    >
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-full rounded-t object-cover mb-3 border-2 border-[#028237]/30"
                      />

                      <span className="text-lg uppercase mb-3 text-black font-bold mt-1">
                        Session- {member.term}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
