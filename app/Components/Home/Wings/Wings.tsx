"use client";
import {
  ArrowRight,
  BookDown,
  Code,
  FolderCode,
  Smartphone,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Competitive Programming",
    description:
      "Sharpen problem-solving skills with algorithms, data structures, and contests.",
    icon: <Code />,
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Learn modern web development with real-world projects and frameworks.",
    icon: <FolderCode />,
  },
  {
    id: 3,
    title: "Mobile Application",
    description: "Build Android and iOS apps with modern tools and frameworks.",
    icon: <Smartphone />,
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
              Club Wings
            </button>
          </div>
          <p className="mx-auto max-w-2xl text-gray-700">
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
              className="rounded-xl border-b-2 hover:border-yellow-500 border-green-300 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#09c558]/10 text-2xl">
                {course.icon}
              </div>

              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {course.title}
              </h3>

              <p className="mb-6 text-gray-600">{course.description}</p>

              <a
                href={`/wings`}
                className="font-medium text-[#09c558] hover:gap-3 transition-all flex justify-between items-center"
              >
                <span>Learn more</span>
                <span>
                  <ArrowRight size={18} />
                </span>
              </a>
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
