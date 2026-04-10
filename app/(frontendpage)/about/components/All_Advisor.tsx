import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";
export default function All_Advisor() {
  const advisors = [
    {
      name: "Dr. Mohammad Mohibullah Siddiquee",
      role: "Vice Chancellor",
      organization: "Bandarban University",
      title: "Professor",
      image: "/advisorImg/vc-bubban.jpg",
    },
    {
      name: "Dr. Rashed Mustafa",
      role: "Professor",
      organization: "University of Chittagong",
      department: "Computer Science & Engineering",
      image: "/advisorImg/Rashed-Mustafasir.jpg",
    },
    {
      name: "Dr. Kaushik Deb",
      role: "Professor",
      organization: "Chittagong University of Engineering & Technology (CUET)",
      image: "/advisorImg/Kaushiksir.png",
    },
    {
      name: "Syed Mohammad Minhaj Hossain",
      role: "Chairman",
      organization: "Premier University",
      department: "Department of CSE",
      image: "/advisorImg/minhazsir.jpg",
    },
    {
      name: "Mohammad Amir Saadat",
      role: "Lecturer",
      organization: "Bandarban University",
      image: "/advisorImg/Amirsir.jpeg",
    },
    {
      name: "Swaraj Kumar Sharma",
      role: "Lecturer",
      organization: "Bandarban University",
      image: "/advisorImg/swarajsir.jpeg",
    },
    {
      name: "Tarakashar Das",
      role: "Mentor / Lecturer",
      organization: "Bandarban University",
      image: "/advisorImg/tarakasharsir.jpeg",
    },
  ];
  return (
    <section className="pt-16 px-6 bg-gray-50">
      <div className="md:w-[95%] w-full mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#028237] text-center mb-4">
            Our Honorable <span className="text-[#ff6900]">Advisors</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Guided by the wisdom and expertise of distinguished academicians and
            industry leaders.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#028237]/20 transition-all duration-300"
              >
                <div className="relative w-full aspect-square mb-5 overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                      <GraduationCap className="w-4 h-4 text-[#028237]" />
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-[#028237] transition-colors">
                  {advisor.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-[#ff6900] font-semibold">
                    <Briefcase className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{advisor.role}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500 leading-snug">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>{advisor.organization}</span>
                  </div>
                  {advisor.department && (
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium pl-6">
                      {advisor.department}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
