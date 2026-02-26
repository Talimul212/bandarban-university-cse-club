"use client";

import { useEffect, useState, useRef } from "react";
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
  Code2,
  Globe,
  FlaskConical,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { courses } from "./data/courses";
import { createPortal } from "react-dom";

// Tab config and Tab Data field
const TABS = [
  {
    key: "Research",
    label: "Research",
    icon: FlaskConical,
    h_title: "Research Programs",
    h_description:
      "Dive deep into cutting-edge research tracks. Build real-world expertise alongside industry mentors and publish meaningful work.",
  },
  {
    key: "CP",
    label: "Competitive Programming",
    icon: Code2,
    h_title: "Competitive Programming",
    h_description:
      "Sharpen your algorithmic thinking, conquer data structures, and dominate coding contests from local to international stages.",
  },
  {
    key: "Development",
    label: "Development",
    icon: Globe,
    h_title: "Development Tracks",
    h_description:
      "From frontend to backend, mobile to cloud — master the full development stack with hands-on projects and real deployments.",
  },
  // {
  //   key: "Courses",
  //   label: "Courses",
  //   icon: GraduationCap,
  //   h_title: "Structured Courses",
  //   h_description:
  //     "Follow a carefully designed curriculum, earn certifications, and advance your skills through structured, mentor-guided learning.",
  // },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// PDF Modal
function PdfModal({
  pdfUrl,
  title,
  onClose,
}: {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}) {
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
        {/* Header */}
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

        {/* Footer */}
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

// Stat Pill Design
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

// Level badge colors Fetching
const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

// Tab Bar Component
function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLButtonElement>(
      `[data-tab="${active}"]`,
    );
    if (!btn) return;
    const { offsetLeft, offsetWidth } = btn;
    setPillStyle({ left: offsetLeft, width: offsetWidth });
  }, [active]);

  return (
    <div className="flex justify-center items-center mb-12">
      <div
        ref={containerRef}
        className="relative flex items-center gap-1 p-1.5 bg-gray-100 rounded-lg border border-gray-200 shadow-inner overflow-x-auto scrollbar-hide"
      >
        {/* Sliding pill */}
        {pillStyle && (
          <span
            className="absolute top-1.5 bottom-1.5 bg-[#028237] rounded-lg shadow-md transition-all duration-300 ease-in-out"
            style={{ left: pillStyle.left, width: pillStyle.width }}
          />
        )}

        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              data-tab={key}
              onClick={() => onChange(key)}
              className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl md:text-lg text-sm font-bold tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 uppercase
                ${isActive ? "text-white" : "text-gray-500 hover:text-gray-800"}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
// Course/Wings Card Section Header
function SectionHeader({ tabKey }: { tabKey: TabKey }) {
  const tab = TABS.find((t) => t.key === tabKey)!;
  const Icon = tab.icon;

  return (
    <div className="flex flex-col items-start justify-start text-left mb-10 transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2.5 bg-[#028237]/10 rounded-xl">
          <Icon className="md:w-5 md:h-5 h-4 w-4 text-[#028237]" />
        </div>
        <h2 className="text-2xl lg:text-4xl font-extrabold text-gray-900">
          {tab.h_title}
        </h2>
      </div>
      <p className="max-w-2xl text-gray-500 text-base text-justify leading-relaxed">
        {tab.h_description}
      </p>
      {/* Underline accent */}
      <div className="mt-4 w-16 h-1 rounded-full bg-[#028237]" />
    </div>
  );
}

//  Main Component From here
export default function WingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Research");
  const [visibleTab, setVisibleTab] = useState<TabKey>("Research");
  const [fadeIn, setFadeIn] = useState(true);
  const [activePdf, setActivePdf] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Smooth fade transition when switching tabs
  function handleTabChange(key: TabKey) {
    if (key === activeTab) return;
    setFadeIn(false);
    setTimeout(() => {
      setActiveTab(key);
      setVisibleTab(key);
      setFadeIn(true);
    }, 180);
  }

  const filtered = courses.filter((c) => c.tab === visibleTab);

  return (
    <>
      <section className="relative py-5 px-2 lg:py-10 lg:px-4 bg-white overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-32 -left-24 w-80 h-80 bg-green-100/60 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-43.75 h-43.75 bg-gray-50 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-3 lg:px-6">
          {/* Top Badge */}
          <div className="flex justify-center mb-3">
            <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#028237]/10 text-[#028237] font-bold text-xs uppercase tracking-widest border border-[#028237]/20">
              <Sparkles className="w-4 h-4" />
              Our Wings
            </span>
          </div>

          {/* Tab Navigation */}
          <TabBar active={activeTab} onChange={handleTabChange} />

          {/* Animated Content Area */}
          <div
            style={{
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 220ms ease, transform 220ms ease",
            }}
          >
            {/* Section Header */}
            <SectionHeader tabKey={visibleTab} />

            {/* Course Cards */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <BookOpen className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-lg font-semibold">
                  No courses available yet.
                </p>
                <p className="text-sm mt-1">Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-10 md:space-y-20">
                {filtered.map((course, index) => {
                  const seatsLeft = course.seats - course.enrolled;
                  const fillPercent = Math.round(
                    (course.enrolled / course.seats) * 100,
                  );

                  return (
                    <div
                      key={course.id}
                      className={`flex flex-col md:flex-row items-start justify-between gap-5 lg:gap-10 ${
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Image */}
                      <div className="w-full md:w-[48%]">
                        <div className="group relative aspect-video w-full overflow-hidden rounded-lg border-[1px] border-[#09c558] shadow-xl ring-1 ring-black/5">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover  transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
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
                        {/* Start Date */}
                        <p className="mb-6 text-xs mt-10 text-gray-400 font-medium">
                          🗓 Next batch starts:{" "}
                          <span className="text-gray-700 font-bold">
                            {course.startDate}
                          </span>
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <Link
                            href={`/wings/${course.slug}`}
                            className="group flex items-center w-full justify-center gap-2 px-6 py-3 bg-[#028237] hover:bg-[#026d2f] text-white font-bold text-sm rounded-lg shadow-md shadow-green-200 transition-all duration-200 hover:shadow-lg hover:shadow-green-300 hover:-translate-y-0.5"
                          >
                            Enroll Now
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>

                          <button
                            onClick={() =>
                              setActivePdf({
                                url: course.syllabusPdf,
                                title: course.title,
                              })
                            }
                            className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#028237]/30 hover:border-[#028237] text-[#028237] font-bold text-sm rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                          >
                            <FileText className="w-4 h-4" />
                            View Syllabus
                          </button>
                        </div>
                      </div>

                      {/* Content */}
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
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

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
