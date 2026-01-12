"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    <section className="relative h-screen w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-screen w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#028237]/50" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto max-w-7xl px-6">
                  <h1 className="mb-4 max-w-2xl text-4xl font-bold text-white md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mb-6 max-w-xl text-lg text-gray-200 md:text-xl">
                    {slide.subtitle}
                  </p>

                  {slide.buttonText && slide.buttonLink && (
                    <a
                      href={slide.buttonLink}
                      className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200"
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

      {/* Navigation buttons */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-3">
        <button className="swiper-button-prev-custom flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white">
          ‹
        </button>
        <button className="swiper-button-next-custom flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white">
          ›
        </button>
      </div>

      {/* Pagination */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 z-20 -translate-x-1/2" />
    </section>
  );
}
