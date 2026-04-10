"use client";
import Image from "next/image";
import { BookDown, Code, FolderCode, NotebookPenIcon } from "lucide-react";
const courses = [
  {
    id: 1,
    title: "Introduction to Competitive Programming",
    description:
      "Sharpen problem-solving skills with algorithms, data structures, and contests.",
    icon: <Code />,
    image: "/images/copetitiveProgramming.jpg",
    colorClass: "bg-gradient-to-br from-purple-600 to-indigo-500",
  },
  {
    id: 2,
    title: "Web Development with Laravel",
    description:
      "Learn modern web development with real-world projects and frameworks.",
    icon: <FolderCode />,
    image: "/images/course_1711349001.jpg",
    colorClass: "bg-gradient-to-br from-pink-500 to-red-400",
  },
  {
    id: 3,
    title: "Thesis Paper Fundamentals",
    description:
      "Explore the structure, methodology, and academic writing techniques essential for crafting impactful thesis papers.",
    icon: <NotebookPenIcon />,
    image: "/images/IntroductionToResearch.jpg",
    colorClass: "bg-gradient-to-br from-green-500 to-teal-400",
  },
];

export default function Wings() {
  return (
    <section className="bg-linear-to-r from-[#DDF5E7] to-[#DDF5E7]/50 py-16 px-6">
      <div className="w-[95%] mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="mb-12 text-center text-[#09c558]">
          {/* Top Button */}
          <div className="flex justify-center mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
              <BookDown className="w-4 h-4" />
              Available Courses
            </button>
          </div>
          <p className="mx-auto max-w-3xl text-gray-700">
            All courses listed below are offered under the specialized wings of
            BU CSE Club. Each wing focuses on empowering students with
            industry-relevant skills through hands-on learning and mentorship.
          </p>
        </div>

        {/* Cards */}
        <div
          data-aos="fade-up"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col rounded-xl border border-transparent duration-700 hover:border-green-500 overflow-hidden bg-white shadow-xl transition hover:shadow-2xl hover:-translate-y-1 h-full"
            >
              {/* Top Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />

                {/* Icon absolutely positioned in middle bottom */}
                <div className="absolute bg-white p-3 rounded-full -bottom-6 left-1/2 transform -translate-x-1/2 shadow">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-md text-white shadow-md ${course.colorClass}`}
                  >
                    {course.icon}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">
                    {course.description}
                  </p>
                </div>

                {/* CTA Button always at bottom */}
                <a
                  href={`/wings`}
                  className="inline-block text-sm font-semibold text-white bg-[#09c558] px-4 py-2 rounded-md hover:bg-green-600 transition mt-auto"
                >
                  VIEW DETAILS ➝
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* See More */}
        <div className="mt-14 text-center">
          <a
            href="/wings"
            className="inline-block border border-green-100 rounded-md bg-white px-8 py-2 font-semibold text-[#09c558] shadow-md transition duration-500 hover:text-amber-50 hover:bg-green-500"
          >
            See all Wings
          </a>
        </div>
      </div>
    </section>
  );
}
