"use client";

import { useState } from "react";
import { GalleryThumbnails } from "lucide-react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
  "/images/16.jpg",
  "/images/17.jpg",
  "/images/18.jpg",
  "/images/19.jpg",
  "/images/20.jpg",
  "/images/21.jpg",
  "/images/22.jpg",
  "/images/23.jpg",
  "/images/24.jpg",
  "/images/25.jpg",
  "/images/26.jpg",
  "/images/webdesign.jpg",
];
export default function GallerySection() {
  // const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 9;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

  // useEffect(() => {
  //   async function fetchImages() {
  //     const res = await fetch("/data/gallery.json");
  //     const data = await res.json();
  //     setImages(data);
  //   }
  //   fetchImages();
  // }, []);
  // console.log(images);

  return (
    <section className="py-16 px-6">
      <div className="mx-auto md:w-[95%]">
        {/* Top Button */}
        <div className="flex justify-center mb-6">
          <button className="flex items-center gap-2 md:w-[20%] justify-center px-4 py-2 rounded-full bg-[#028237]/20 text-[#028237] font-semibold text-sm shadow-md border border-amber-50">
            <GalleryThumbnails className="w-4 h-4" />
            Memorable Moments
          </button>
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
          {currentImages.map((src, i) => (
            <div
              key={startIndex + i}
              onClick={() => setIndex(startIndex + i)}
              className="mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg"
            >
              <Image
                src={src}
                alt={`Gallery image ${startIndex + i + 1}`}
                width={1200}
                height={800}
                className="h-auto w-full border border-green-100 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#028237]/20 text-[#028237] hover:bg-[#028237]/30"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-[#028237] text-white"
                  : "bg-[#028237]/10 text-[#028237] hover:bg-[#028237]/20"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#028237]/20 text-[#028237] hover:bg-[#028237]/30"
            }`}
          >
            Next
          </button>
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
