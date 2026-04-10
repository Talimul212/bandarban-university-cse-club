import Image from "next/image";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  status?: string;
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
    <div className="bg-white border border-[#028237]/30 rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition flex flex-col h-full">
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
      <div className="p-6 flex flex-col grow">
        <h4 className="text-lg font-semibold text-[#028237] mb-2">{title}</h4>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs text-green-600 font-semibold mb-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-green-100 px-3 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm mt-5 text-gray-600 mb-1">
          <CalendarDays className="w-8 bg-linear-to-br from-pink-500 to-red-400 p-2 h-8 text-white rounded-md" />
          {date} • {time}
        </div>

        {/* Location */}
        <div className="flex mt-5 items-center gap-2 text-sm mb-5 text-gray-600">
          <MapPin className="w-8 bg-linear-to-br from-green-500 to-teal-400 p-2 h-8 text-white rounded-md" />
          {location}
        </div>

        {/* Button */}
        <a
          href={`/events/${id}`}
          className="mt-auto w-full flex gap-3 justify-center items-center px-5 py-2 rounded-md bg-[#028237] text-white text-sm font-semibold hover:bg-[#02662c] hover:shadow-[0_0_10px_#86efac] transition"
        >
          View Details
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
