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
          <h1 className="text-left text-2xl md:text-3xl text-[#028237] font-extrabold mb-4">
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
      <div className="flex flex-wrap gap-3 mb-5">
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
