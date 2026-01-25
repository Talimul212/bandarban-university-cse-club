import Link from "next/link";
import Image from "next/image";
import { getEventStatus, formatRange } from "../utils/eventHelper";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }: { event: any }) {
  const status = getEventStatus(event);

  //   Condtional style for status Upcomming, Running and Completed
  const statusStyles = {
    Upcoming: "bg-blue-100 text-blue-800 border-blue-200",
    Running: "bg-green-100 text-green-800 border-green-200 animate-pulse",
    Completed: "bg-gray-100 text-gray-500 border-gray-200",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[status as keyof typeof statusStyles]}`}
        >
          {status}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-green-600 font-semibold mb-2 uppercase tracking-wide">
          {event.category}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <span className="flex justify-start items-center gap-x-2">
            <Calendar />
            {event.isTba
              ? "To Be Announced"
              : formatRange(event.startDateTime, event.endDateTime)}
          </span>
          <span className="flex justify-start items-center gap-x-2">
            <MapPin /> {event.location.venue}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 cursor-pointer">
          <Link
            href={`/events/${event.id}`}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
