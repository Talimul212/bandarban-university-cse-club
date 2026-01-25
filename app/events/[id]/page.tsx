/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Boxes, CalendarDays, MapPin } from "lucide-react";
import { events } from "../data/eventData";

export default function Page() {
  const params = useParams();
  const eventId = Number(params.id);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="text-center py-20 text-red-600 font-bold">
        Event not found.
      </div>
    );
  }

  return (
    <div className="w-full text-[#028237]">
      {/* Full-Width Banner */}
      <div className="relative w-full h-100 overflow-hidden shadow-lg">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 text-white">
          <span className="bg-[#ff6900] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
            {event.type}
          </span>
          <h1 className="text-3xl uppercase md:text-5xl font-extrabold mb-4 leading-tight">
            {event.title}
          </h1>
          <p className="text-sm md:text-base font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            {event.location}
          </p>
          <p className="text-lg italic text-white/90">
            Let's Join For Best Experience!
          </p>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="max-w-6xl mx-5 border rounded-xl my-10 md:mx-auto shadow px-6 py-8">
        {/* Title */}
        <h2 className="text-xl md:text-3xl font-extrabold mb-6">
          About This Event
        </h2>

        {/* Description */}
        <p className="text-black/80 leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
      {/* Event Details Section */}
      <div className="max-w-6xl md:mx-auto mx-5 border rounded-xl shadow px-6 py-8">
        {/* Title */}
        <h2 className="text-xl md:text-3xl font-extrabold mb-10 text-[#028237]">
          Event Details
        </h2>

        {/* Status */}
        {/* {event.status && (
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-10 ${
              event.status === "Completed"
                ? "bg-gray-500 text-white"
                : "bg-[#028237] text-white"
            }`}
          >
            {event.status}
          </span>
        )} */}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Date */}
          <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
            <CalendarDays className="w-10 h-10 bg-linear-to-br from-green-500 to-teal-400 p-2 rounded-md text-white" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-base font-semibold text-[#028237]">
                {event.date}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
            <CalendarDays className="bg-linear-to-br from-pink-500 to-purple-500 p-2 w-10 h-10 text-white rounded-md" />
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-base font-semibold text-[#028237]">
                {event.time}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#f7f7f7] rounded-xl p-5 shadow flex items-start gap-4">
            <MapPin className="w-10 h-10 p-2 rounded-md bg-linear-to-br from-purple-600 to-indigo-500 text-white" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-base font-semibold text-[#028237]">
                {event.location}
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
      </div>

      {/* Registration Status Section */}
      <div className="max-w-6xl mx-5 mt-10 flex flex-col justify-center items-center md:mx-auto bg-linear-to-r from-[#028237] to-green-200 text-white rounded-xl shadow-lg p-6 md:p-8 mb-10">
        <div className="flex items-center gap-3 mb-4 border border-amber-100 py-1 px-3 rounded-full">
          <CalendarDays className="w-5 h-5 text-[#ff6900]" />
          <h2 className="md:text-xl font-bold">Registration Status</h2>
        </div>
        <p className="text-xl md:text-3xl font-extrabold mb-2">
          Registration Closed
        </p>
        <p className="text-sm text-gray-300">
          Registration closed on{" "}
          <span className="text-white font-medium">December 1, 2025</span>
        </p>
      </div>
    </div>
  );
}
