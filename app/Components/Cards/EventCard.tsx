import React from "react";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  status?: string; // make optional
  image?: string;
}

export default function EventCard({
  id,
  title,
  date,
  time,
  location,
  tags,
  status,
  image,
}: EventCardProps) {
  return (
    <div className="bg-white border border-[#028237]/30 rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition">
      {/* Status Badge */}
      {status && (
        <div
          className={`absolute top-4 right-4 text-sm uppercase z-10 font-semibold px-3 py-1 rounded-full shadow-md ${
            status === "Completed"
              ? "bg-gray-500 text-white"
              : "bg-[#028237] text-white"
          }`}
        >
          {status}
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="relative w-full h-60">
          <Image src={image} alt={title} fill className="object-cover z-0" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-[#028237] mb-2">{title}</h4>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs text-white mb-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-[#028237] px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm mt-5 text-gray-600 mb-1">
          <CalendarDays className="w-4 h-4 text-[#028237]" />
          {date} • {time}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm mb-5 text-gray-600">
          <MapPin className="w-4 h-4 text-[#028237]" />
          {location}
        </div>

        {/* Button */}
        <a
          href={`/events/${id}`}
          className="inline-block px-5 py-2 rounded-full bg-[#028237] text-white text-sm font-semibold hover:bg-[#02662c] transition"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
