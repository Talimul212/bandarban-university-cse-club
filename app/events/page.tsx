/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import EventCard from "../Components/Cards/EventCard";

const tabs = ["All Events", "Workshops", "Seminars", "Competitions"];

const events: Array<{
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  status: "Completed" | "Upcoming";
  image: string;
}> = [
  {
    id: 2,
    title: "React Workshop for Beginners",
    type: "Workshops",
    date: "12 January 2026",
    time: "10:00 AM – 1:00 PM",
    location: "CSE Lab 3",
    tags: ["React", "Frontend", "Workshop"],
    status: "Upcoming",
    image: "/images/react_workshop.webp",
  },
  {
    id: 3,
    title: "AI Ethics Seminar",
    type: "Seminars",
    date: "20 February 2026",
    time: "2:00 PM – 4:00 PM",
    location: "Auditorium Hall",
    tags: ["AI", "Ethics", "Seminar"],
    status: "Upcoming",
    image: "/images/ai_ethics_seminar.jpg",
  },
  {
    id: 4,
    title: "bdapps Bootcamp for Indigenous Students in Bandarban",
    type: "Workshops",
    date: "To be announced",
    time: "To be announced",
    location: "Bandarban University / Govt. Women's College",
    tags: ["Bootcamp", "bdapps", "Skills"],
    status: "Completed",
    image: "/images/bdapps.jpg",
  },
  {
    id: 5,
    title: "Let's Code Your Career through Programming",
    type: "Seminars",
    date: "26 July 2026",
    time: "12:00 PM – 1:00 PM",
    location: "Bandarban University Conference Room",
    tags: ["Programming Hero", "Career", "Coding"],
    status: "Completed",
    image: "/images/PH.jpg",
    // description:
    //   "A special session hosted by Programming Hero in collaboration with BU_CSE Club — inspiring students to explore programming as a future-ready skill, with live Q&A, coding challenges, and career insights.",
    // link: "https://forms.gle/WqCyCaERy7LLfkBCA",
  },
  {
    id: 6,
    title: "CSE Fest 2025 Prize Distribution Ceremony",
    type: "Competitions",
    date: "16 February 2025",
    time: "10:00 AM",
    location: "Bandarban University Conference Hall",
    tags: ["CSEFest2025", "Prize Distribution", "Celebration"],
    status: "Upcoming",
    image: "/images/price_given.jpg",
    // description:
    //   "Celebrating the winners of bdapps presents CSE Fest 2025! Join us for the Prize Distribution Ceremony sponsored by Bandarban Hill District Council and Lumbini Limited.",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("All Events");

  const filteredEvents =
    activeTab === "All Events"
      ? events
      : events.filter((event) => event.type === activeTab);

  return (
    <div className="md:w-[95%]  mx-auto ms:px-6 px-5 py-16  text-[#028237]">
      {/* Top Button */}

      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 md:w-[20%]  justify-center px-4 py-2 rounded-full bg-[#028237]/20 text-[#028237] font-semibold text-sm shadow-md">
          <CalendarDays className="w-4 h-4" />
          Event Gallery
        </div>
      </div>
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-5xl font-extrabold mb-4">
        Our <span className="text-[#ff6900]">Events</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed mb-10">
        Explore our past workshops, seminars, hackathons, and more. See what
        we've accomplished together as a tech community.
      </p>

      {/* Tabs + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Tabs */}
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

        {/* Sort */}
        <div className="text-sm text-gray-700">
          Sort by:{" "}
          <select className="ml-2 px-3 py-1 rounded-md border border-gray-300 text-sm">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
