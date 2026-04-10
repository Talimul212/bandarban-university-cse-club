"use client";
import React from "react";

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="relative bg-white border border-green-100 rounded-2xl px-5 py-4 flex items-center gap-4 overflow-hidden shadow-sm hover:shadow-md hover:border-green-200 transition-all group">
      {/* Subtle glow behind icon */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-green-100/60 blur-xl group-hover:bg-green-200/60 transition-colors" />

      {/* Icon */}
      <div className={`relative shrink-0 p-3 rounded-xl ${accent}`}>
        <Icon size={20} className="text-white" />
      </div>

      {/* Text */}
      <div className="relative min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
          {label}
        </p>
        <p className="text-2xl font-black text-gray-800 leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

export default StatCard;
