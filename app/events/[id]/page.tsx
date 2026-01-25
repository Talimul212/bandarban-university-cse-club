"use client";
import { events } from "../data/eventData";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventStatus, formatRange } from "../../../utils/eventHelper";
import CountdownTimer from "@/components/CountdownTimer";
import { MapPin } from "lucide-react";

// This is a Server Component
export default function Page() {
  const params = useParams();
  const id = params.id;

  const event = events.data.find((e) => e.id === id);

  if (!event) {
    return <div>Event not found (ID: {id})</div>;
  }

  const status = getEventStatus(event);
  const isUpcoming = status === "Upcoming" && !event.isTba;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/events"
        className="text-green-600 hover:underline mb-6 inline-block"
      >
        ← Back to Events
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Top hero section */}
        <div className="relative h-100 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold w-fit mb-3">
              {event.category}
            </span>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <span className="text-lg flex items-center justify-start gap-x-2 opacity-90">
              <MapPin /> {event.location.venue}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About this Event
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Countdown Section */}
            {isUpcoming && event.startDateTime && (
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-green-900 font-semibold mb-4">
                  Event Starts In:
                </h3>
                <CountdownTimer targetDate={event.startDateTime} />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar / Info Panel */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Event Details
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-right max-w-[60%]">
                    {event.isTba
                      ? "TBA"
                      : formatRange(event.startDateTime!, event.endDateTime!)}
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`font-bold ${status === "Upcoming" ? "text-green-600" : "text-gray-600"}`}
                  >
                    {status}
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Fees</span>
                  <span
                    className={`font-bold ${event.registration.fee === 0 ? "text-green-600" : "text-gray-600"}`}
                  >
                    Tk. {event.registration.fee}
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Capacity</span>
                  <span className="font-medium">
                    {event?.registration.capacity} Seats
                  </span>
                </li>
              </ul>

              {/* Registration Logic */}
              <button
                disabled={event.registration.status === "Closed"}
                className={`w-full mt-6 py-3 rounded-lg font-bold text-center transition ${
                  event.registration.status === "Open"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {event.registration.status === "Open"
                  ? "Register Now"
                  : "Registration Closed"}
              </button>
            </div>

            {/* Organizer Info */}
            <div className="p-6 border rounded-xl">
              <h4 className="font-bold mb-2">Organizer</h4>
              <p className="text-gray-700">{event.organizer.name}</p>
              <a
                href={`mailto:${event.organizer.contactEmail}`}
                className="text-green-600 text-sm hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
