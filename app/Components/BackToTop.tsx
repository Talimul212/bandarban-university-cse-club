"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        text-center
        cursor-pointer
        flex items-center justify-center
        fixed bottom-6 right-6 z-50
        h-12 w-12
        rounded-full
        bg-[#09c558]
        text-white
        shadow-lg
        transition-all duration-300
        hover:scale-110 hover:bg-[#07a84c]
        ${visible ? "opacity-100" : "pointer-events-none opacity-0"}
      `}
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
  );
}
