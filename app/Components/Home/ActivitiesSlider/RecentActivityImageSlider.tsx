/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, FreeMode } from "swiper/modules";
import { ArrowLeft, ArrowRight, Pause, PlayCircle } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="w-full h-auto inset-0 bg-linear-to-b from-green-400/30 to-green-200/10">
      <div className="py-12 px-4 max-w-7xl md:w-[90%] mx-auto ">
        {/* Header Section */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            BEYOND THE BINARY
          </h2>
          <p className="text-md md:text-xl  text-gray-500 text-center mb-6 ">
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
          <div className="relative group overflow-hidden rounded-md bg-slate-100 shadow-2xl">
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
              onSlideChange={(swiper) => {
                // Pause all videos when slide changes
                const videos =
                  document.querySelectorAll<HTMLVideoElement>("video");
                videos.forEach((video, index) => {
                  if (index !== swiper.activeIndex) {
                    video.pause();
                  }
                });
              }}
            >
              {activities.map((activity, index) => {
                const isVideo = activity.image.toLowerCase().endsWith(".mp4");
                const isImage =
                  activity.image.toLowerCase().endsWith(".png") ||
                  activity.image.toLowerCase().endsWith(".jpg") ||
                  activity.image.toLowerCase().endsWith(".jpeg") ||
                  activity.image.toLowerCase().endsWith(".webp");

                return (
                  <SwiperSlide key={activity.id}>
                    <div className="relative aspect-video h-96 md:h-150 w-full">
                      {isVideo ? (
                        <>
                          <video
                            ref={videoRef}
                            src={activity.image}
                            loop
                            controls
                            playsInline
                            className="w-full h-full object-cover rounded-md"
                            onPlay={() => {
                              // Stop autoplay when video starts playing
                              const swiperEl = document.querySelector(
                                ".main-slider",
                              ) as any;
                              if (swiperEl && swiperEl.swiper) {
                                swiperEl.swiper.autoplay.stop();
                              }
                            }}
                            onPause={() => {
                              // Resume autoplay when video is paused
                              const swiperEl = document.querySelector(
                                ".main-slider",
                              ) as any;
                              if (swiperEl && swiperEl.swiper) {
                                swiperEl.swiper.autoplay.start();
                              }
                            }}
                          />

                          {/* Play/Pause Button Overlay */}
                          <button
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition duration-300"
                          >
                            {isPlaying ? (
                              <Pause className="w-12 h-12 text-white" />
                            ) : (
                              <PlayCircle className="w-12 h-12 text-white" />
                            )}
                          </button>
                        </>
                      ) : isImage ? (
                        <>
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            priority
                            className="object-cover rounded-md"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                          {/* Content Overlay */}
                          <div className="absolute bottom-0  left-0 p-8 md:p-12 text-white max-w-2xl">
                            <span className="inline-block px-2 py-1 mb-2 md:mb-4 text-xs font-semibold tracking-widest uppercase bg-green-500 rounded-full">
                              {activity.date}
                            </span>
                            <h3 className="text-lg md:text-4xl font-bold md:mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-slate-200 text-xs md:text-base leading-relaxed opacity-90">
                              {activity.subtitle}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Navigation Controls */}
            <div className="absolute bottom-1/2 top-1/2 left-4 justify-between flex gap-3 z-20">
              <button className="custom-prev flex items-center justify-center md:w-10 md:h-10 w-8 h-8 rounded-full bg-white cursor-pointer opacity-50 hover:opacity-100 transition-colors duration-300 backdrop-blur-md text-orange-500 border border-white/20 hover:bg-green-700 hover:border-green-500 active:scale-95 shadow-lg">
                <ArrowLeft size={20} />
              </button>
            </div>
            {/* Navigation Controls */}
            <div className="absolute bottom-1/2 top-1/2 right-4 justify-between flex gap-3 z-20">
              <button className="custom-next flex items-center justify-center md:w-10 md:h-10 w-8 h-8 rounded-full bg-white cursor-pointer opacity-50 hover:opacity-100 transition-colors duration-300 backdrop-blur-md text-orange-500 border border-white/20 hover:bg-green-700 hover:border-green-500 active:scale-95 shadow-lg">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="max-w-2xl mx-auto  flex justify-center">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={0}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs, FreeMode]}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className="thumb-slider py-2"
            >
              {activities.map((activity) => {
                const isVideo = activity.image.toLowerCase().endsWith(".mp4");
                const isImage =
                  activity.image.toLowerCase().endsWith(".png") ||
                  activity.image.toLowerCase().endsWith(".jpg") ||
                  activity.image.toLowerCase().endsWith(".jpeg") ||
                  activity.image.toLowerCase().endsWith(".webp");

                return (
                  <SwiperSlide
                    key={activity.id}
                    className="cursor-pointer hover:scale-110 transform duration-700 p-2"
                  >
                    {({ isActive }) => (
                      <div
                        className={`relative aspect-4/3 md:aspect-video rounded-md  overflow-hidden transition-all duration-300 border-2 ${
                          isActive
                            ? "border-green-500 duration-700 drop-shadow-[0_0_10px_#16a34ab0] rounded-md  scale-105 shadow-md"
                            : "border-transparent duration-700 opacity-60  hover:grayscale-0 hover:opacity-100"
                        }`}
                      >
                        {isVideo ? (
                          <video
                            src={activity.image}
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : isImage ? (
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
