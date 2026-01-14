"use client";

import { GalleryThumbnails } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [
  "/images/bdapps.jpg",
  "/images/cse_club.png",
  "/images/price_given.jpg",
  "/images/PH.jpg",
  "/images/ai_ethics_seminar.jpg",
  "/images/app_ui_1.png",
  "/images/price_given.jpg",
  "/images/cse_club.png",
  "/images/bdapps.jpg",
  "/images/bdapps.jpg",
];

export default function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section className="bg-linear-to-b from-green-200 to-green-100 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Button */}
        <div data-aos="fade-down">
          <div className="flex justify-center mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
              <GalleryThumbnails className="w-4 h-4" />
              Memorable Moments
            </button>
          </div>
        </div>
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Photo <span className="text-[#09c558]">Gallery</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            A glimpse of our journeys, events, and memorable moments.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className="mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg"
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                width={1200}
                height={800}
                className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Lightbox Preview */}
        <Lightbox
          open={index !== null}
          index={index ?? 0}
          close={() => setIndex(null)}
          slides={images.map((src) => ({ src }))}
        />
      </div>
    </section>
  );
}
