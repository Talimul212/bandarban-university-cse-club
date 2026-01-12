"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";

const images = [
  { src: "/images/idea.png", title: "Workshops" },
  { src: "/images/webdesign.jpg", title: "Hackathons" },
  { src: "/images/analysis.jpg", title: "Team Building" },
  { src: "/images/webdesign.jpg", title: "Open Source" },
];

export default function OurCommunity() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* Left Side: Text */}
        <div>
          <h2 className="mb-6 text-4xl font-bold leading-tight">
            <span className="text-primary">Our</span> Community
          </h2>
          <p className="mb-4 text-lg text-gray-600">
            We are a{" "}
            <span className="font-semibold text-black">
              collaborative tech community
            </span>{" "}
            focused on learning, building, and sharing real-world knowledge.
          </p>
          <p className="text-gray-600">
            From hands-on workshops to competitive hackathons, we empower
            students to
            <span className="font-medium text-black"> grow together</span> and
            create meaningful impact.
          </p>
        </div>

        {/* Right Side: */}
        <div className="flex items-center justify-center mt-5">
          <div className="relative grid grid-cols-2 gap-6 rotate-45">
            {images.map((img, i) => (
              <Tooltip.Provider key={i}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="group relative h-36 w-36 overflow-hidden bg-gray-200 transition-all duration-300 hover:-rotate-45 hover:scale-110 hover:rounded-lg md:h-40 md:w-40">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-125 -rotate-45 hover:rotate-0"
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="rounded-md bg-black px-3 py-1 text-sm text-white shadow-lg"
                      sideOffset={8}
                    >
                      {img.title}
                      <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
