"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, FreeMode } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Activity } from "./ActivitiesSliderData";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface RecentActivityImageSliderProps {
  activities: Activity[];
}

export default function RecentActivityImageSlider({
  activities,
}: RecentActivityImageSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <section className="w-full h-auto inset-0 bg-linear-to-b from-green-600/30 to-green-300/10">
      <div className="py-12 px-4 max-w-7xl md:w-[90%] mx-auto ">
        {/* Header Section */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            BEYOND THE BINARY
          </h2>
          <p className="text-md md:text-xl font-bold text-gray-600 text-center mb-6 italic">
            Celebrating the innovators and dreamers who compiled our history,
            bit by bit.
          </p>
          <div className="flex justify-center items-center gap-1">
            <span className="h-1.5 w-12 rounded-full bg-green-500" />
            <span className="h-1.5 w-4 rounded-full bg-slate-200" />
            <span className="h-1.5 w-4 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Slider Container */}
          <div className="relative group overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
            <Swiper
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Navigation, Thumbs, Autoplay]}
              className="main-slider"
            >
              {activities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <div className="relative aspect-video md:h-[600px] w-full">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      priority
                      className="object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-2xl">
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase bg-green-500 rounded-full">
                        {activity.date}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-slate-200 text-sm md:text-base leading-relaxed opacity-90">
                        {activity.subtitle}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-8 flex gap-3 z-20">
              <button className="custom-prev flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 cursor-pointer opacity-50 hover:opacity-100 transition-colors duration-300 backdrop-blur-md text-orange-500 border border-white/20 hover:bg-green-700 hover:border-green-500 active:scale-95 shadow-lg">
                <ArrowLeft size={20} />
              </button>
              <button className="custom-next flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 cursor-pointer opacity-50 hover:opacity-100 transition-colors duration-300 backdrop-blur-md text-orange-500 border border-white/20 hover:bg-green-700 hover:border-green-500 active:scale-95 shadow-lg">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="max-w-4xl mx-auto px-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs, FreeMode]}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className="thumb-slider py-2"
            >
              {activities.map((activity) => (
                <SwiperSlide key={activity.id} className="cursor-pointer">
                  {({ isActive }) => (
                    <div
                      className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                        isActive
                          ? "border-green-500 scale-105 shadow-md"
                          : "border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
