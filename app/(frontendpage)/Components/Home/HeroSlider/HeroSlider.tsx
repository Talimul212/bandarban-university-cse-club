"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight, ChevronLeft, Boxes } from "lucide-react";

type Slide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
};

interface Props {
  slides: Slide[];
}

export default function HeroSlider({ slides }: Props) {
  return (
    <section className="relative h-[90vh] md:h-screen w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative md:h-[90vh] h-[75vh] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: `${
                  slide.image === "/CSE_Club_Logo.png" ? "contain" : "cover"
                }`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,black_0%,#09c558_60%,#09c558_90%)] opacity-50" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center px-4 md:px-6">
                <div className="mx-auto w-full max-w-4xl text-center">
                  {/* Top Badge */}
                  <div className="text-xs md:text-sm mb-10 md:mb-16 flex justify-center items-center gap-2 md:gap-4 bg-transparent rounded-full border border-[#ffffffa2] w-fit px-4 py-2 mx-auto backdrop-blur-2xl">
                    <Boxes className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-white font-medium">
                      Contribute Our Committee
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight uppercase">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="mb-6 text-base md:text-lg lg:text-xl text-white font-semibold max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>

                  {/* Button */}
                  {slide.buttonText && slide.buttonLink && (
                    <a
                      href={slide.buttonLink}
                      className="bg-linear-to-r from-[#ff6900] to-[#ffaa00] text-white px-6 py-2
                       rounded-full font-semibold flex items-center justify-center mx-auto gap-2 uppercase border border-amber-50 hover:from-[#ffaa00] hover:to-[#ff6900] transition w-[60%] sm:w-[40%] md:w-[25%]"
                    >
                      {slide.buttonText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons — original position */}
      <div className="absolute bottom-37.5 md:bottom-24 left-36 md:left-16 z-20 flex gap-3">
        <button className="swiper-button-prev-custom flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white">
          <ChevronLeft className="text-[#ff6900]" />
        </button>
        <button className="swiper-button-next-custom flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white">
          <ChevronRight className="text-[#ff6900]" />
        </button>
      </div>

      {/* Animated Pagination — centered at bottom */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" />

      <style>{`
        /* Inactive dot */
        .hero-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.4s ease,
                      box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        /* Active dot — expands into a pill */
        .hero-bullet-active {
          width: 36px;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 10px rgba(9, 197, 88, 0.45);
        }

        /* Fill bar that sweeps across the active pill in sync with autoplay */
        .hero-bullet-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: #09c558;
          border-radius: 9999px;
          transform: scaleX(0);
          transform-origin: left center;
          animation: bulletProgress 5s linear forwards;
        }

        @keyframes bulletProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
