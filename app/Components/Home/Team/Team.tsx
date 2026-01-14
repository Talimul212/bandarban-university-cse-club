"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Member = {
  name: string;
  role: string;
  skills: string[];
  image: string;
};

const teamMembers: Member[] = [
  {
    name: "Talimul Islam",
    role: "President",
    skills: ["React", "Next.js", "NodeJS", "AWS"],
    image: "https://i.ibb.co.com/s1nTTSR/talimul.jpg",
  },
  {
    name: "Annonymous",
    role: "Backend Engineer",
    skills: ["Node.js", "PostgreSQL", "API Design"],
    image: "/images/idea.png",
  },
  {
    name: "Uhai Mong",
    role: "Full Stack Developer",
    skills: ["NodeJs", "React", "Next.Js", "CI/CD"],
    image: "https://i.ibb.co.com/gJmbQS0/uhai.jpg",
  },
  {
    name: "Sara Khan",
    role: "ML Engineer",
    skills: ["Python", "TensorFlow", "Data Science"],
    image: "/images/webdesign.jpg",
  },
];

export default function OurTeam() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto w-[95%]">
        {/* Header */}
        <div data-aos="fade-down" className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Our <span className="text-[#09c558]">Executive</span> Members
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Passionate individuals driving innovation, collaboration, and
            growth.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-team-button-next",
              prevEl: ".swiper-team-button-prev",
            }}
            spaceBetween={32}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="group h-full rounded-2xl bg-[#DAFBE7] p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                  {/* Image */}
                  <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="mb-4 text-sm text-[#09c558]">{member.role}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#09c558]/10 px-3 py-1 text-xs font-medium text-[#09c558]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation buttons */}
          <div className="absolute -bottom-7 left-6 z-20 flex gap-3">
            <button className="swiper-team-button-prev h-10 w-10 rounded-full bg-[#09c558] shadow text-center flex items-center justify-center cursor-pointer">
              <ChevronLeft className="text-[#ff6900]" />
            </button>
            <button className="swiper-team-button-next h-10 w-10 rounded-full bg-[#09c558] shadow text-center flex items-center justify-center cursor-pointer">
              <ChevronRight className="text-[#ff6900]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
