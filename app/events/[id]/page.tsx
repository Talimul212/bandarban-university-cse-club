"use client";
import { events } from "../data/eventData";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventStatus, formatRange } from "../../../utils/eventHelper";
import CountdownTimer from "@/components/CountdownTimer";
import { Boxes, CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// This is a Server Component
export default function Page() {
  const params = useParams();
  const id = params.id;
  const [openLightbox, setOpenLightbox] = useState(false);
  const event = events.data.find((e) => e.id === id);

  if (!event) {
    return <div>Event not found (ID: {id})</div>;
  }

  const status = getEventStatus(event);
  const isUpcoming = status === "Upcoming" && !event.isTba;

  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-xl overflow-hidden">
        {/* Top hero section */}
        <div className="relative h-100  ">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0  bg-black/60  to-transparent flex flex-col justify-center items-center  text-white">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold w-fit mb-3">
              {event.category}
            </span>
            <h1 className="text-2xl uppercase md:text-5xl text-center font-bold mb-2 md:px-10">
              {event.title}
            </h1>
            <span className="text-lg flex items-center justify-start gap-x-2 opacity-90">
              <MapPin /> {event.location.venue}
            </span>
            <Link
              href="/events"
              className="bg-green-100 text-green-600 p-2 rounded mt-5 flex justify-center items-center hover:underline mb-6 "
            >
              ← Back to Events
            </Link>
          </div>
        </div>
        <div className="md:w-[95%] md:mx-auto ">
          {/* Event Details Section */}
          <div className="md:w-[95%] mx-5 my-10 md:mx-auto flex flex-col md:flex-row gap-5  overflow-hidden">
            {/* Left: About Text */}
            <div className="md:flex-3 border rounded-xl shadow  bg-white p-6 md:flex md:flex-col justify-between">
              <h2 className="text-xl md:text-3xl font-extrabold mb-6">
                About This Event
              </h2>

              <p className="text-black/80 leading-relaxed mb-6 text-justify">
                {event.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-600 px-3 py-1 font-semibold rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image with Lightbox Trigger */}
            {/* Sidebar / Info Panel */}
            <div className="space-y-2 md:flex-1">
              {/* Countdown Section */}
              {isUpcoming && event.startDateTime && (
                <div className="bg-green-50 md:px-6 p-2 md:py-3 rounded-md border border-green-100">
                  <h3 className="text-black font-semibold mb-4">
                    Event Starts In:
                  </h3>
                  <CountdownTimer targetDate={event.startDateTime} />
                </div>
              )}
              <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  Event Details
                </h3>
                <ul className="space-y-4">
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
            </div>
          </div>

          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 md:w-[95%] md:mx-auto mx-5">
            {/* Main Content */}

            <div className="lg:col-span-2 space-y-2 ">
              {/* Organizer Info */}

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5 shadow p-4 border border-gray-100 rounded-md">
                {/* Date */}
                <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
                  <CalendarDays className="w-10 h-10 bg-linear-to-br from-green-500 to-teal-400 p-2 rounded-md text-white" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-base font-semibold text-[#028237]">
                      {event.isTba
                        ? "TBA"
                        : formatRange(event.startDateTime, event.endDateTime)}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
                  <CalendarDays className="bg-linear-to-br from-pink-500 to-purple-500 p-2 w-10 h-10 text-white rounded-md" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-base font-semibold text-[#028237]">
                      {formatRange(event.startDateTime, event.endDateTime)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
                  <MapPin className="w-10 h-10 p-2 rounded-md bg-linear-to-br from-purple-600 to-indigo-500 text-white" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-base font-semibold text-[#028237]">
                      {event.location.venue}
                    </p>
                  </div>
                </div>

                {/* Attendees */}
                <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
                  <Boxes className="bg-linear-to-br from-pink-500 to-red-400 w-10 h-10 text-white rounded-md p-2" />
                  <div>
                    <p className="text-sm text-gray-500">Attendees</p>
                    <p className="text-base font-semibold text-[#028237]">
                      Not specified
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-xl">
                <h4 className="font-bold mb-1">Organizer</h4>
                <p className="text-gray-700">{event.organizer.name}</p>
                <a
                  href={`mailto:${event.organizer.contactEmail}`}
                  className="text-green-600 text-sm hover:underline"
                >
                  Contact Support
                </a>
              </div>
            </div>
            <Lightbox
              open={openLightbox}
              close={() => setOpenLightbox(false)}
              slides={[{ src: event.image }]}
              render={{
                buttonPrev: () => null,
                buttonNext: () => null,
              }}
            />
            {/* Sidebar / Info Panel */}
            <div
              className="md:flex-1 hidden md:flex relative cursor-pointer md:overflow-hidden  border rounded-xl shadow  group"
              onClick={() => setOpenLightbox(true)}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition duration-500 ease-in-out group-hover:blur-sm"
              />

              {/* Hover Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white font-semibold text-lg">
                  Click to preview
                </p>
              </div>
            </div>
            <div
              className="block md:hidden  rounded-md cursor-pointer bg-cover bg-center backdrop-blur-xl"
              style={{
                backgroundImage: `url("${event.image}")`,
                objectFit: "cover",
              }}
              onClick={() => setOpenLightbox(true)}
            >
              <p className="text-white p-4 uppercase rounded-md font-bold bg-black/40 text-center  text-lg">
                Click to preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
