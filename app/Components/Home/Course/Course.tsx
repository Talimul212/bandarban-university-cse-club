import {
  ArrowRight,
  BookDown,
  Box,
  DatabaseZap,
  FolderCode,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn modern web development with real-world projects.",
    icon: <FolderCode />,
  },
  {
    id: 2,
    title: "Data Structures",
    description: "Master core DSA concepts for interviews and problem solving.",
    icon: <DatabaseZap />,
  },
  {
    id: 3,
    title: "DevOps Basics",
    description: "CI/CD, Docker, and cloud fundamentals for developers.",
    icon: <Box />,
  },
];

export default function OurCourses() {
  return (
    <section className=" bg-linear-to-r from-[#DDF5E7] to-[#DDF5E7]/50 py-16 mt-12 px-6">
      <div className="w-[95%] mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="mb-12 text-center text-[#09c558]">
          {/* Top Button */}
          <div className="flex justify-center mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
              <BookDown className="w-4 h-4" />
              Our Course
            </button>
          </div>
          <p className="mx-auto max-w-2xl">
            Industry-focused courses designed to build real skills, not just
            theory.
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
              className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#09c558]/10 text-2xl">
                {course.icon}
              </div>

              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {course.title}
              </h3>

              <p className="mb-6 text-gray-600">{course.description}</p>

              <a
                href={`/courses/${course.id}`}
                className="font-medium text-[#09c558] hover:gap-3 transition-all flex justify-between items-center"
              >
                <span>Learn more</span>{" "}
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
            href="/courses"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#09c558] shadow-md transition hover:bg-gray-100"
          >
            See all courses
          </a>
        </div>
      </div>
    </section>
  );
}
