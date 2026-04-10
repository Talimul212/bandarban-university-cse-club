"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  FileDown,
  Edit3,
  Trash2,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { courses } from "@/app/(frontendpage)/wings/data/courses";

export default function CourseTableDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Filtering Logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || course.tab === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 md:p-10 bg-gray-50/50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <GraduationCap className="text-[#028237]" size={32} />
            Course <span className="text-[#028237]">Catalog</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">
            Academic_Wings // Management_Console
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all shadow-sm">
            <FileDown size={16} /> Generate Report
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#028237] text-white rounded-xl font-bold text-xs hover:shadow-lg hover:shadow-[#028237]/20 transition-all">
            <Plus size={16} /> Add New Course
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by course title or instructor..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#028237]/10 outline-none transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          {["All", "Development", "Research", "CP"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
                activeTab === tab
                  ? "bg-[#028237] text-white shadow-md"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1d21] text-white">
                <th className="px-8 py-5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                  Course Details
                </th>
                <th className="px-6 py-5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                  Instructor
                </th>
                <th className="px-6 py-5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                  Duration/Fee
                </th>
                <th className="px-6 py-5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                  Enrollment
                </th>
                <th className="px-8 py-5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-green-50/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#028237]/10 text-[#028237] uppercase tracking-tighter">
                            {course.level}
                          </span>
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase tracking-tighter">
                            {course.tab}
                          </span>
                        </div>
                        <p className="font-bold text-gray-900 leading-tight group-hover:text-[#028237] transition-colors">
                          {course.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={course.instructor.avatar}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover border border-gray-200"
                        alt={course.instructor.name}
                      />
                      <span className="text-xs font-bold text-gray-700">
                        {course.instructor.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-800">
                        {course.duration}
                      </span>
                      <span className="text-[10px] font-medium text-[#ff6900]">
                        {course.fee}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-900">
                          {Math.round((course.enrolled / course.seats) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#028237] rounded-full"
                          style={{
                            width: `${(course.enrolled / course.seats) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {course.enrolled} / {course.seats} students
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#028237] hover:bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="px-8 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            showing {filteredCourses.length} of {courses.length} entries
          </p>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold hover:bg-white transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
