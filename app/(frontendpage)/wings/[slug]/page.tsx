/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  BarChart2,
  CheckCircle2,
  ChevronDown,
  FileText,
  ExternalLink,
  Calendar,
  Globe,
  Tag,
  X,
} from "lucide-react";
import { courses } from "../data/courses";
import { createPortal } from "react-dom";

// Syllabus view
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

// Course Module
function ModuleAccordion({
  title,
  topics,
}: {
  title: string;
  topics: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-bold text-gray-800 text-sm">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="px-5 py-4 space-y-2 bg-white">
          {topics.map((topic, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <CheckCircle2 className="w-4 h-4 text-[#09c558] mt-0.5 shrink-0" />
              {topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Page Component
export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const course = courses.find((c) => c.slug === slug);
  const [pdfOpen, setPdfOpen] = useState(false);

  if (!course) notFound();

  const seatsLeft = course.seats - course.enrolled;
  const fillPercent = Math.round((course.enrolled / course.seats) * 100);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* content header */}
        <section className="relative bg-linear-to-br from-gray-900 via-gray-800 to-[#022b14] text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover opacity-15"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 to-[#022b14]/80" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Breadcrumb */}
            <Link
              href="/wings"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Wings
            </Link>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Left: course content */}
              <div className="flex-1">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 rounded-lg bg-[#09c558]/20 text-[#09c558] border border-[#09c558]/30 font-bold text-xs uppercase tracking-wider">
                    {course.badge}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-gray-200 font-bold text-xs uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
                  {course.title}
                </h1>
                <p className="text-[#09c558] font-semibold text-lg mb-6">
                  {course.subtitle}
                </p>
                <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-2xl">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    {
                      icon: Star,
                      label: `${course.rating} (${course.reviews} reviews)`,
                    },
                    { icon: Clock, label: course.duration },
                    { icon: BarChart2, label: course.level },
                    { icon: Globe, label: course.language },
                    { icon: Calendar, label: `Starts ${course.startDate}` },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <Icon className="w-4 h-4 text-[#09c558]" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Enrollment Card Side bar*/}
              <div className="w-full lg:w-80 xl:w-96 bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden shrink-0">
                {/* Card Image */}
                <div className="relative aspect-video w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  {/* Fee */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-[#028237]">
                      {course.fee}
                    </span>
                    {course.type === "wings" && (
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        Scholarship
                      </span>
                    )}
                  </div>

                  {/* Progress of seats */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>{course.enrolled} enrolled</span>
                      <span className="font-bold text-[#028237]">
                        {seatsLeft} seats left
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-[#09c558] to-[#028237] rounded-full"
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Enroll: Form Submission */}
                  <Link
                    href={`/enroll?courseId=${course.id}&title=${encodeURIComponent(course.title)}&fee=${course.fee}&type=${course.type}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#028237] hover:bg-[#026d2f] text-white font-bold text-base rounded-xl shadow-md shadow-green-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 mb-3"
                  >
                    Enroll Now
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* View Syllabus */}
                  <button
                    onClick={() => setPdfOpen(true)}
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#028237]/30 hover:border-[#028237] text-[#028237] font-bold text-sm rounded-xl transition-all duration-200"
                  >
                    <FileText className="w-4 h-4" />
                    View Full Syllabus
                  </button>

                  {/* Quick data facts */}
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                    {[
                      {
                        icon: Clock,
                        label: "Duration",
                        value: course.duration,
                      },
                      {
                        icon: Users,
                        label: "Class Size",
                        value: `${course.seats} students max`,
                      },
                      {
                        icon: BookOpen,
                        label: "Language",
                        value: course.language,
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2 text-gray-400">
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </div>
                        <span className="font-semibold text-gray-700">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course details body */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Highlights */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-gray-900 mb-6">
                  What You'll Gain
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#028237] mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum and Modules */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  Course Curriculum
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  {course.modules.length} modules •{" "}
                  {course.modules.reduce((acc, m) => acc + m.topics.length, 0)}{" "}
                  topics
                </p>
                <div className="space-y-3">
                  {course.modules.map((mod, i) => (
                    <ModuleAccordion
                      key={i}
                      title={mod.title}
                      topics={mod.topics}
                    />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">
                  Topics Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium border border-gray-200"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar – Instructor */}
            <div className="w-full lg:w-72 xl:w-80 shrink-0">
              <div className="sticky top-24">
                <h2 className="text-xl font-black text-gray-900 mb-4">
                  Your Instructor
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
                      <Image
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {course.instructor.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Our instructors are seasoned professionals and educators
                    committed to your growth.
                  </p>
                </div>

                {/* CTA for mobile convenience */}
                <div className="mt-6 lg:hidden">
                  <Link
                    href={`/enroll?courseId=${course.id}&title=${encodeURIComponent(course.title)}&fee=${course.fee}&type=${course.type}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#028237] hover:bg-[#026d2f] text-white font-bold text-base rounded-xl shadow-md shadow-green-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 mb-3"
                  >
                    Enroll Now
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PDF Modal */}
      {pdfOpen && (
        <PdfModal
          pdfUrl={course.syllabusPdf}
          title={course.title}
          onClose={() => setPdfOpen(false)}
        />
      )}
    </>
  );
}
