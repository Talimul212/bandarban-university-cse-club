"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Clock,
  Hourglass,
} from "lucide-react";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Event {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  image: string;
  category: string;
  location: { venue: string; address: string };
  registration: {
    fee: number;
    capacity: number;
    registeredCount: number;
    link: string;
  };
  tags: string[];
}

export default function UpcomingEventSlider({ events }: { events: Event[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
        <Calendar className="w-12 h-12 text-slate-300 mb-4" />
        <p className="text-slate-500 text-lg font-medium">
          No upcoming adventures yet.
        </p>
      </div>
    );
  }

  // Helper to calculate days left
  const getDaysLeft = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} Days Left` : "Starting Soon";
  };

  return (
    <div className="w-full bg-linear-to-b from-green-600/10 to-transparent py-16">
      <div className="w-full lg:w-[90%] mx-auto px-4 md:px-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="rounded-md overflow-hidden shadow-2xl shadow-green-900/10 bg-white"
        >
          {events.map((event) => {
            const startDate = new Date(event.startDateTime);
            const isFull =
              event.registration.registeredCount >= event.registration.capacity;

            return (
              <SwiperSlide key={event.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-112.5">
                  {/* Left Section */}
                  <div className="lg:col-span-5 relative min-h-62.5 lg:min-h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-green-900/80 via-transparent to-transparent lg:hidden" />

                    {/* Category Tag */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="lg:col-span-7 p-4 md:p-12 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                        {event.title}
                      </h2>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-6 gap-x-4">
                        {/* Time & Date */}
                        <div className="flex items-center gap-4 group bg-gray-50 p-2 rounded-md">
                          <div className=" bg-linear-to-br from-pink-500 to-purple-500 p-2 rounded-md transition-colors duration-300">
                            <Clock className="md:w-6 md:h-6 h-4 w-4 text-white " />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              When
                            </p>
                            <p className="text-xs md:text-sm font-bold text-slate-800">
                              {startDate.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                              })}{" "}
                              @{" "}
                              {startDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className="flex items-center gap-4 group bg-gray-50 p-2 rounded-md">
                          <div className="  p-2 rounded-md bg-linear-to-br from-purple-600 to-indigo-500 transition-colors duration-300">
                            <MapPin className="md:w-6 md:h-6 h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Venue
                            </p>
                            <p className="text-xs md:text-sm font-bold text-slate-800">
                              {event.location.venue}
                            </p>
                          </div>
                        </div>

                        {/* Days Left */}
                        <div className="flex items-center gap-4 group bg-gray-50 p-2 rounded-md">
                          <div className="bg-linear-to-br from-pink-500 to-red-400 p-2 rounded-md transition-colors duration-300">
                            <Hourglass className="md:w-6 md:h-6 h-4 w-4 text-white " />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Deadline
                            </p>
                            <p className="text-xs md:text-sm font-bold text-slate-800">
                              {getDaysLeft(event.startDateTime)}
                            </p>
                          </div>
                        </div>

                        {/* Capacity */}
                        <div className="flex items-center gap-4 group bg-gray-50 p-2 rounded-md">
                          <div className="bg-linear-to-br from-green-500 to-teal-400 p-2 rounded-md  transition-colors duration-300">
                            <Users className="md:w-6 md:h-6 h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className=" text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Availability
                            </p>
                            <p className="text-xs md:text-sm font-bold text-slate-800">
                              {event.registration.capacity -
                                event.registration.registeredCount}{" "}
                              Seats Left
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                      <div className="hidden sm:block">
                        <p className="text-xs font-bold text-slate-400 uppercase">
                          Investment
                        </p>
                        <p className="text-2xl font-black text-green-600">
                          {event.registration.fee > 0
                            ? `৳${event.registration.fee}`
                            : "FREE"}
                        </p>
                      </div>

                      <Link
                        href={`/events/${event.id}`}
                        className={` items-center w-full md:w-[35%] gap-3 px-10 md:py-4 py-2 uppercase flex justify-center rounded-md font-bold transition-all duration-300 ${
                          isFull
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700 shadow-xl shadow-green-200 hover:shadow-slate-300"
                        }`}
                      >
                        {isFull ? "Fully Booked" : "Join Event"}
                        {!isFull && <ArrowRight className="w-5 h-5" />}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #16a34a !important;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 30px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
}
