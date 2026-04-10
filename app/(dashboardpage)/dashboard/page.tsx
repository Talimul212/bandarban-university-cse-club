"use client";
import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Trophy,
  Zap,
  Activity,
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  PlayCircle,
  Handshake,
  TrendingUp,
  Eye,
  Star,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Globe,
  Cpu,
  BrainCircuit,
  Flame,
  Award,
  Radio,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";

// ── Helpers ──────────────────────────────────────────────────────────────────
function Badge({
  children,
  color = "green",
}: {
  children: React.ReactNode;
  color?: "green" | "orange" | "blue" | "amber" | "pink" | "purple";
}) {
  const map = {
    green: "bg-green-50 text-green-700 border-green-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    pink: "bg-pink-50 text-pink-600 border-pink-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${map[color]}`}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  href,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#028237]/10 flex items-center justify-center">
          <Icon size={16} className="text-[#028237]" />
        </div>
        <div>
          <h2 className="text-base font-black text-gray-800 leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-bold text-[#028237] hover:underline"
        >
          View all <ChevronRight size={12} />
        </Link>
      )}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function DashboardHome() {
  const [chartPeriod, setChartPeriod] = useState("7d");

  // ── Data ──────────────────────────────────────────────────────────────────
  const stats = [
    {
      label: "Active Members",
      value: "1,284",
      delta: "+12%",
      icon: Users,
      color: "text-[#028237]",
      bg: "bg-[#028237]/10",
    },
    {
      label: "New Registrations",
      value: "124",
      delta: "+8%",
      icon: UserPlus,
      color: "text-[#ff6900]",
      bg: "bg-[#ff6900]/10",
    },
    {
      label: "Hackathons Won",
      value: "12",
      delta: "+2",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Active Projects",
      value: "8",
      delta: "Running",
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-600/10",
    },
  ];

  const topCourses = [
    {
      title: "Web Development Bootcamp",
      icon: Globe,
      members: 312,
      rating: 4.9,
      tag: "Most Popular",
      tagColor: "green" as const,
      progress: 88,
    },
    {
      title: "Machine Learning Fundamentals",
      icon: BrainCircuit,
      members: 245,
      rating: 4.8,
      tag: "Trending",
      tagColor: "orange" as const,
      progress: 74,
    },
    {
      title: "Competitive Programming",
      icon: Code2,
      members: 198,
      rating: 4.7,
      tag: "Hot",
      tagColor: "amber" as const,
      progress: 61,
    },
    {
      title: "Embedded Systems & IoT",
      icon: Cpu,
      members: 134,
      rating: 4.6,
      tag: "New",
      tagColor: "blue" as const,
      progress: 45,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Spring Hackathon 2025",
      date: "Apr 18–19",
      seats: 120,
      filled: 87,
      status: "upcoming",
      type: "Hackathon",
    },
    {
      id: 2,
      title: "Web Dev Workshop",
      date: "Apr 22",
      seats: 60,
      filled: 60,
      status: "full",
      type: "Workshop",
    },
    {
      id: 3,
      title: "ML Study Circle",
      date: "Apr 25",
      seats: 30,
      filled: 14,
      status: "upcoming",
      type: "Session",
    },
  ];

  const completedEvents = [
    {
      title: "Git & GitHub Bootcamp",
      date: "Mar 30",
      attendees: 74,
      rating: 4.8,
    },
    {
      title: "DSA Sprint — Arrays",
      date: "Mar 22",
      attendees: 88,
      rating: 4.9,
    },
    { title: "UI/UX Design Night", date: "Mar 10", attendees: 55, rating: 4.7 },
  ];

  const runningEvents = [
    {
      title: "Intra-Club Coding Contest",
      started: "2 hours ago",
      participants: 48,
      duration: "4h",
    },
    {
      title: "Project Showcase Review",
      started: "30 mins ago",
      participants: 22,
      duration: "2h",
    },
  ];

  const partners = [
    {
      name: "Bangladesh University",
      type: "Host University",
      icon: "🏛️",
      since: "2018",
    },
    {
      name: "IEEE Student Branch",
      type: "Technical Partner",
      icon: "⚡",
      since: "2020",
    },
    {
      name: "ACM ICPC Regional",
      type: "Competition Body",
      icon: "🏆",
      since: "2019",
    },
    { name: "Google DSC", type: "Program Partner", icon: "🔵", since: "2021" },
    { name: "Codeforces", type: "Platform Partner", icon: "🟠", since: "2022" },
    {
      name: "GitHub Education",
      type: "Tool Sponsor",
      icon: "🐙",
      since: "2021",
    },
  ];

  const logs = [
    {
      user: "Talimul Islam",
      action: "Approved new enrollment",
      time: "2m ago",
      avatar: "TI",
    },
    {
      user: "Uhai Mong",
      action: "Updated Dev Contributors page",
      time: "45m ago",
      avatar: "UM",
    },
    {
      user: "System",
      action: "Database backup completed",
      time: "2h ago",
      avatar: "SY",
    },
    {
      user: "Durjoy Barua",
      action: "Published Spring Hackathon event",
      time: "3h ago",
      avatar: "DB",
    },
    {
      user: "Admin",
      action: "Added Google DSC as new partner",
      time: "5h ago",
      avatar: "AD",
    },
  ];

  const chartData7d = [40, 70, 45, 90, 65, 80, 100];
  const chartData30d = [
    20, 35, 50, 40, 60, 45, 80, 70, 55, 90, 75, 85, 95, 60, 70, 80, 65, 55, 90,
    100, 85, 70, 60, 75, 88, 92, 78, 65, 80, 95,
  ];
  const chartData = chartPeriod === "7d" ? chartData7d : chartData30d;
  const maxVal = Math.max(...chartData);

  return (
    <div className="p-4 md:p-8 bg-gray-50/60 min-h-screen font-sans space-y-8">
      {/* ── Welcome Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="text-[#028237]" size={28} />
            Club <span className="text-[#028237]">Overview</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, Admin. Here's what's happening with BU CSE Club today.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 transition shadow-sm">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-[#028237] text-white rounded-xl font-bold text-xs hover:bg-[#026b2e] transition shadow-sm shadow-[#028237]/20">
            + New Event
          </button>
        </div>
      </div>

      {/* ── Stats Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight size={9} />
                {stat.delta}
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* ── Row 1: Chart + Running Events ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader
              icon={TrendingUp}
              title="Enrollment Growth"
              subtitle="Registrations over time"
            />
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {["7d", "30d"].map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    chartPeriod === p
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {p === "7d" ? "7 Days" : "30 Days"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 h-40">
            {chartData.map((val, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end gap-1 group/bar"
              >
                <div
                  className="w-full bg-[#028237]/10 rounded-t-md hover:bg-[#028237] transition-all relative cursor-pointer"
                  style={{
                    height: `${(val / maxVal) * 100}%`,
                    minHeight: "4px",
                  }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {chartPeriod === "7d"
              ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span
                    key={d}
                    className="text-[9px] text-gray-300 font-bold flex-1 text-center"
                  >
                    {d}
                  </span>
                ))
              : Array.from({ length: 30 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-[8px] text-gray-300 font-bold flex-1 text-center ${i % 5 !== 0 ? "opacity-0" : ""}`}
                  >
                    {i + 1}
                  </span>
                ))}
          </div>
        </div>

        {/* Running Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader
            icon={Radio}
            title="Live Now"
            subtitle="Currently running"
          />
          {runningEvents.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No events running
            </p>
          ) : (
            <div className="space-y-4">
              {runningEvents.map((ev, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-green-100 bg-green-50/40 relative overflow-hidden"
                >
                  {/* Pulse dot */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-[9px] font-bold text-green-600 uppercase">
                      Live
                    </span>
                  </div>
                  <p className="font-black text-sm text-gray-800 pr-12 leading-snug">
                    {ev.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={10} /> Started {ev.started}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Users size={10} /> {ev.participants}
                    </span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-green-100 overflow-hidden">
                    <div
                      className="h-full bg-[#028237] rounded-full transition-all"
                      style={{
                        width: `${Math.min((parseInt(ev.started) / parseInt(ev.duration)) * 100, 65)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Row 2: Top Courses ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <SectionHeader
          icon={BookOpen}
          title="Most Viewed Courses"
          subtitle="By active member enrollment"
          href="/dashboard/courses"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {topCourses.map((course, i) => (
            <div
              key={i}
              className="group p-4 rounded-xl border border-gray-100 hover:border-[#028237]/20 hover:bg-green-50/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                  <course.icon
                    size={18}
                    className="text-gray-500 group-hover:text-[#028237] transition-colors"
                  />
                </div>
                <Badge color={course.tagColor}>{course.tag}</Badge>
              </div>
              <h3 className="text-sm font-black text-gray-800 leading-snug mb-2">
                {course.title}
              </h3>
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                <span className="flex items-center gap-1">
                  <Users size={10} /> {course.members} enrolled
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={10} fill="currentColor" /> {course.rating}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#028237] to-[#09c558] rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-[9px] text-gray-400 mt-1 text-right">
                {course.progress}% capacity
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 3: Events (Upcoming + Completed) ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader
            icon={CalendarDays}
            title="Upcoming Events"
            subtitle="Next scheduled events"
            href="/dashboard/events"
          />
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-100 hover:border-[#028237]/20 hover:bg-green-50/20 transition-all"
              >
                <div className="text-center bg-[#028237]/8 rounded-xl px-3 py-2 min-w-[52px]">
                  <p className="text-[10px] font-black text-[#028237] uppercase">
                    {ev.date.split(" ")[0]}
                  </p>
                  <p className="text-sm font-black text-gray-800">
                    {ev.date.split(" ").slice(1).join(" ")}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-800 truncate">
                    {ev.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge color={ev.status === "full" ? "orange" : "green"}>
                      {ev.status === "full" ? "Full" : "Open"}
                    </Badge>
                    <span className="text-[10px] text-gray-400">{ev.type}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-gray-700">
                    {ev.filled}/{ev.seats}
                  </p>
                  <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ev.status === "full" ? "bg-[#ff6900]" : "bg-[#028237]"}`}
                      style={{ width: `${(ev.filled / ev.seats) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader
            icon={CalendarCheck}
            title="Completed Events"
            subtitle="Recently executed"
            href="/dashboard/events"
          />
          <div className="space-y-3">
            {completedEvents.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-700 truncate">
                    {ev.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {ev.date} · {ev.attendees} attended
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-black text-xs shrink-0">
                  <Star size={12} fill="currentColor" />
                  {ev.rating}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-[#028237]/30 hover:text-[#028237] transition-all">
            VIEW ALL COMPLETED
          </button>
        </div>
      </div>

      {/* ── Row 4: Partners + Activity Log ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Club Partners */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader
            icon={Handshake}
            title="Club Partners"
            subtitle="Our CSE community network"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {partners.map((p, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#028237]/20 hover:bg-green-50/20 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg shrink-0">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-gray-800 leading-tight truncate">
                    {p.name}
                  </p>
                  <p className="text-[9px] text-gray-400 truncate">{p.type}</p>
                  <p className="text-[9px] text-[#028237] font-bold">
                    Since {p.since}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader
            icon={ShieldCheck}
            title="Activity Log"
            subtitle="Recent admin actions"
          />
          <div className="space-y-4">
            {logs.map((log, i) => (
              <div
                key={i}
                className="flex gap-3 items-start pb-3.5 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div className="w-7 h-7 bg-[#028237]/10 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-black text-[#028237]">
                  {log.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-gray-800 leading-tight">
                    {log.user}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
                    {log.action}
                  </p>
                  <p className="text-[9px] text-gray-300 mt-0.5 font-bold uppercase tracking-wide">
                    {log.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-[#028237]/30 hover:text-[#028237] transition-all">
            VIEW ALL LOGS
          </button>
        </div>
      </div>
    </div>
  );
}
