/* eslint-disable react/no-unescaped-entities */
/*
"use client";
import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import EventCard from "../Components/Cards/EventCard";
import { events } from "./data/eventData";

const tabs = ["All Events", "Workshops", "Seminars", "Competitions"];

export default function Page() {
  const [activeTab, setActiveTab] = useState("All Events");

  const filteredEvents =
    activeTab === "All Events"
      ? events
      : events.filter((event) => event.type === activeTab);

  return (
    <div className="md:w-[95%]  mx-auto ms:px-6 px-5 py-16  text-[#028237]">

      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 md:w-[20%]  justify-center px-4 py-2 rounded-full bg-[#028237]/20 text-[#028237] font-semibold text-sm shadow-md border border-amber-50">
          <CalendarDays className="w-4 h-4" />
          Event Gallery
        </div>
      </div>

      <h2 className="text-center text-3xl md:text-5xl font-extrabold mb-4">
        Our <span className="text-[#ff6900]">Events</span>
      </h2>


      <p className="text-center text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed mb-10">
        Explore our past workshops, seminars, hackathons, and more. See what
        we've accomplished together as a tech community.
      </p>


      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-[#028237] text-white shadow-md"
                  : "bg-white border border-[#028237] text-[#028237] hover:bg-[#028237]/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>


        <div className="text-sm text-gray-700">
          Sort by:{" "}
          <select className="ml-2 px-3 py-1 rounded-md border border-gray-300 text-sm">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} id={String(event.id)} />
        ))}
      </div>
    </div>
  );
}
  */

"use client";
import { useState, useMemo } from "react";
import { events } from "./data/eventData";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [eventCat, setEventCat] = useState("All Events");
  const itemsPerPage = 6;
  const [results, setResults] = useState();
  const categories = ["All Events", "Workshops", "Seminars", "Competitions"];

  const processedEvents = useMemo(() => {
    let result = [...events.data];
    if (filter !== "All") {
    }
    // Tab filter logic
    if (eventCat !== "All Events") {
      result = result.filter((event) => event.category === eventCat);
    }
    if (filter !== "All") {
      result = result.filter((event) => event.location.type === filter);
    }
    // Sort Logic
    result.sort((a, b) => {
      const dateA = new Date(a.startDateTime || "2099-01-01").getTime();
      const dateB = new Date(b.startDateTime || "2099-01-01").getTime();
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [filter, sortOrder, events.data, eventCat]);

  // 2. Pagination Logic
  const totalPages = Math.ceil(processedEvents.length / itemsPerPage);
  const paginatedEvents = processedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-left text-3xl md:text-5xl text-[#028237] font-extrabold mb-4">
            CSE Club <span className="text-[#ff6900]">Activities</span>
          </h1>
          <p className="text-gray-500">
            Join Us To Explore Latest Technologies
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <select
            className="border rounded-lg px-4 py-2 bg-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setEventCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              eventCat === cat
                ? "bg-[#028237] text-white shadow-md"
                : "bg-white border border-[#028237] text-[#028237] hover:bg-[#028237]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {paginatedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === idx + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
