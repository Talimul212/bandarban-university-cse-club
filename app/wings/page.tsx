"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Star,
  BarChart2,
  X,
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { courses } from "./data/courses";
import { createPortal } from "react-dom";

// Sylabus view
function PdfModal({
  pdfUrl,
  title,
  onClose,
}: {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}) {
  // Lock body scroll when pdf view modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#028237]/10 rounded-lg">
              <FileText className="w-5 h-5 text-[#028237]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Syllabus
              </p>
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* PDF Embed */}
        <div className="flex-1 bg-gray-100">
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            className="w-full h-full"
            title={`${title} Syllabus`}
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-end">
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#028237] text-white text-sm font-semibold rounded-lg hover:bg-[#026d2f] transition-colors"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// Stat pill
function StatPill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
      <Icon className="w-4 h-4 text-[#028237]" />
      <span>{label}</span>
    </div>
  );
}

// Level wise badge colors
const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

// Main component
export default function WingsPage() {
  const [activePdf, setActivePdf] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <>
      <section className="relative py-10 px-4 sm:px-5 lg:py-20 lg:px-6 bg-white overflow-hidden">
        {/* Subtle background blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-32 -left-24 w-80 h-80 bg-green-100/60 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[175] h-[175] bg-gray-50 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Top Badge */}
          <div className="flex justify-center mb-5">
            <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#028237]/10 text-[#028237] font-bold text-xs uppercase tracking-widest border border-[#028237]/20">
              <Sparkles className="w-4 h-4" />
              Running Courses
            </span>
          </div>

          {/* Header */}
          <div className="mb-20 lg:mb-28 text-center" data-aos="zoom-in">
            <h2 className="mb-5 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
              High Demanded{" "}
              <span className="relative inline-block text-[#09c558]">
                Courses
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C50 1.5 100 7 150 3.5C175 2 190 4 199 5.5"
                    stroke="#09c558"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 text-lg font-medium leading-relaxed">
              Explore our diverse range of courses designed to equip you with
              practical skills and industry-ready knowledge.
            </p>
          </div>

          {/* Course Cards */}
          <div className="space-y-10 md:space-y-20">
            {courses.map((course, index) => {
              const seatsLeft = course.seats - course.enrolled;
              const fillPercent = Math.round(
                (course.enrolled / course.seats) * 100,
              );

              return (
                <div
                  key={course.id}
                  className={`flex flex-col md:flex-row items-center gap-5 lg:gap-10 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                  data-aos={index % 2 === 0 ? "fade-up" : "fade-up"}
                  data-aos-duration="500"
                  data-aos-delay={index * 100}
                >
                  {/* ── Image ── */}
                  <div className="w-full md:w-[48%]">
                    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-lg bg-[#028237] text-white text-xs font-bold uppercase tracking-wider shadow">
                          {course.badge}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-gray-800">
                          {course.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({course.reviews} reviews)
                        </span>
                      </div>

                      {/* Fee */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow">
                        <span className="text-sm font-black text-[#028237]">
                          {course.fee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="flex-1 flex flex-col items-start">
                    {/* Category & Level */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-500 font-bold text-xs uppercase tracking-widest">
                        {course.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                          levelColors[course.level]
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight">
                      {course.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="mb-4 text-[#028237] font-semibold text-sm">
                      {course.subtitle}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mb-5 flex-wrap">
                      <StatPill icon={Clock} label={course.duration} />
                      <StatPill
                        icon={Users}
                        label={`${course.enrolled}/${course.seats} enrolled`}
                      />
                      <StatPill icon={BarChart2} label={course.level} />
                      <StatPill icon={BookOpen} label={course.language} />
                    </div>

                    {/* Enrollment progress */}
                    <div className="w-full mb-6">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-400 font-medium">
                          Enrollment Progress
                        </span>
                        <span className="text-xs font-bold text-[#028237]">
                          {seatsLeft} seats left
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#09c558] to-[#028237] rounded-full transition-all duration-1000"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-gray-500 text-sm lg:text-base leading-relaxed text-justify hyphens-auto line-clamp-4">
                      {course.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mb-8 space-y-2">
                      {course.highlights.slice(0, 3).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <ChevronRight className="w-4 h-4 text-[#09c558] mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Start Date */}
                    <p className="mb-6 text-xs text-gray-400 font-medium">
                      🗓 Next batch starts:{" "}
                      <span className="text-gray-700 font-bold">
                        {course.startDate}
                      </span>
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Enroll Button → Course Detail Page */}
                      <Link
                        href={`/wings/${course.slug}`}
                        className="group flex items-center gap-2 px-6 py-3 bg-[#028237] hover:bg-[#026d2f] text-white font-bold text-sm rounded-xl shadow-md shadow-green-200 transition-all duration-200 hover:shadow-lg hover:shadow-green-300 hover:-translate-y-0.5"
                      >
                        Enroll Now
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {/* View Syllabus → PDF Modal */}
                      <button
                        onClick={() =>
                          setActivePdf({
                            url: course.syllabusPdf,
                            title: course.title,
                          })
                        }
                        className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#028237]/30 hover:border-[#028237] text-[#028237] font-bold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <FileText className="w-4 h-4" />
                        View Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {activePdf && (
        <PdfModal
          pdfUrl={activePdf.url}
          title={activePdf.title}
          onClose={() => setActivePdf(null)}
        />
      )}
    </>
  );
}
