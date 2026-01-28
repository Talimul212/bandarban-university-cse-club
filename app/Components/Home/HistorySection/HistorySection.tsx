import React from "react";
import {
  Info,
  Users,
  BookOpenCheck,
  Star,
  GraduationCap,
  Award,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

export default function HistorySection() {
  return (
    <section className="md:w-[95%] px-6 md:py-12 bg-white mx-auto ">
      {/* Top Button */}
      <div className="flex justify-center mb-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
          <Info className="w-4 h-4" />
          ABOUT BU CSE Club
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
        Our History
      </h2>

      {/* Gradient Lines */}
      <div className="flex justify-center gap-2 mb-10">
        <div className="h-1 w-16 rounded-full bg-linear-to-r from-white to-[#028237]" />
        <div className="h-1 w-24 rounded-full bg-[#028237]" />
        <div className="h-1 w-16 rounded-full bg-linear-to-r from-[#028237] to-white" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        {/* Left Text Content */}
        <div className="text-gray-700 space-y-4">
          <div className="relative w-[90%] md:w-[50%] mb:mb-2 mb-5">
            {/* Glow Layer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-6 w-full bg-[#028237ba]/30 blur-md rounded-full z-0" />

            {/* Badge Content */}
            <div className="relative flex justify-start items-center px-4 py-2 rounded-full bg-[#028237]/10 border border-amber-50 text-[#028237] font-semibold text-sm z-10">
              <GraduationCap className="w-4 h-4 mr-2" />
              Building Excellence Since Inception
            </div>
          </div>

          <h3 className="text-xl font-extrabold md:text-4xl  text-[#028237]">
            Bandarban University Computer Science &{" "}
            <span className="text-[#ff6900]">Engineering Club</span>
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            The BU CSE Computer Club was established with a vision to create a
            vibrant community of tech enthusiasts and aspiring computer
            scientists. Over the years, we have grown from a small group of
            passionate students to a thriving organization with hundreds of
            contributors.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Our journey has been marked by successful tech events, workshops,
            and competitions. We foster innovation, collaboration, and
            real-world problem solving through student-led initiatives and
            development projects.
          </p>
        </div>
        <div>
          {/* Right Visuals */}
          <div className="grid grid-cols-2 justify-center items-center gap-3">
            {/* Top Left: App UI */}
            <Image
              src="/images/4.jpg"
              alt="App UI 1"
              width={200}
              height={230}
              className="rounded-xl shadow-md w-full h-57.5 object-cover"
            />
            {/* Top Right: Innovation Tile */}
            <div className="bg-[#dafbe7] hover:scale-105 transition duration-500 text-[#028237] rounded-xl flex items-center justify-center h-40 w-full font-bold text-lg hover:text-green-600 drop-shadow-[0_0_10px_#16a34a]">
              <span className="flex items-center gap-2">
                <Star className="w-6 h-6" />
                Innovation
              </span>
            </div>

            {/* Bottom Left: Excellence Tile */}
            <div className="bg-[#16a34a] -mt-7.5 hover:scale-105 transition duration-500 text-[#dafbe7] rounded-xl flex items-center justify-center h-40 w-full font-bold text-lg drop-shadow-[0_0_10px_#dafbe7]">
              <span className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                Excellence
              </span>
            </div>

            {/* Bottom Right: App UI */}
            <Image
              src="/images/4.jpg"
              alt="App UI 2"
              width={200}
              height={230}
              className="rounded-xl -mt-7.5 shadow-md w-full h-57.5 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats & Actions Section */}
      <div className="md:flex mt-5 md:mt-0">
        <div className=" md:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stat 1: Active Members */}
          <div className="bg-[#028237] md:h-30  rounded-xl p-4 shadow-md text-white hover:scale-[1.02] transition duration-300">
            <div className="flex w-full  justify-between items-center">
              <Users className=" bg-white/40 p-2 rounded-md backdrop-blur-sm border border-amber-50 text-start w-10 h-10 mb-2" />
              <h4 className="text-3xl ms-30 font-extrabold text-center">50+</h4>
            </div>
            <p className="text-sm text-start font-semibold pb-3">
              Active Members
            </p>
            <div className="w-full h-1 bg-white/30 rounded-full">
              <div className="h-full bg-white rounded-full w-[90%] transition-all duration-500" />
            </div>
          </div>

          {/* Stat 2: Committee Members */}
          <div className="bg-[#dafbe7] md:h-30   rounded-xl p-4 shadow-md text-[#028237] hover:scale-[1.02] transition duration-300">
            <div className="flex w-full  justify-between items-center">
              <BookOpenCheck className=" bg-white p-2 rounded-md backdrop-blur-sm border border-[#028237] text-start w-10 h-10 mb-2" />
              <h4 className="text-3xl ms-30 font-extrabold text-center">15+</h4>
            </div>
            <p className="text-sm text-start font-semibold mb-3">
              Committee Members
            </p>
            <div className="w-full h-1 mb-2 bg-white  rounded-full">
              <div className="h-full bg-[#028237] rounded-full w-[80%] transition-all duration-500" />
            </div>
          </div>

          <div className="mt-0   flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* CTA 2: View Courses */}
            <a
              href="/wings"
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-md border border-[#028237] text-[#028237] font-semibold text-sm shadow-md hover:bg-[#028237]/10 transition"
            >
              <BookOpen className="w-4 h-4" />
              View Courses
            </a>
          </div>
          <div className="mt-0   md:flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* CTA 1: Learn More About Us */}
            <a
              href="/about"
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#028237] text-white font-semibold text-sm shadow-md hover:bg-[#02662c] transition"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}
