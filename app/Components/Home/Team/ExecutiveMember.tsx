/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

function ExecutiveMember() {
  const members = [
    {
      id: 1,
      name: "Talimul Islam",
      batch: "5th",
      session: "Spring-2022",
      role: "President",
      message: "Leading BU CSE Club with vision and innovation.",
      photoURL: "https://i.ibb.co.com/s1nTTSR/talimul.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/talimul-islam-77965a22a/",
        github: "https://github.com/Talimul212",
        facebook: "https://www.facebook.com/talimul.islam.52493/",
      },
    },
    {
      id: 2,
      name: "Durjoy Barua",
      batch: "7th",
      session: "Autumn-2023",
      role: "General Secretary",
      message: "Empowering students through technology and collaboration.",
      photoURL: "https://i.ibb.co.com/DDvFS8v9/durjoy.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/durjoy-barua-2615b2345/",
        github: "/",
        facebook: "/",
      },
    },
    {
      id: 3,
      name: "Hasan Imam Uddin Mehedi",
      batch: "7th",
      session: "Autumn-2023",
      role: "Finance Secretary",
      message: "Ensuring smooth operations and financial transparency.",
      photoURL:
        "https://i.ibb.co.com/xtj71sVt/470175286-1139136584386286-8043448187553906972-n.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/uhai-mong/",
        github: "/",
        facebook: "/",
      },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const autoplayInterval = 4000;
    const autoplay = setInterval(() => {
      const nextSlide = (currentSlide + 1) % members.length;
      setCurrentSlide(nextSlide);
    }, autoplayInterval);

    return () => clearInterval(autoplay);
  }, [currentSlide, members.length]);

  return (
    <div className="mt-20">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="mb-4 md:text-4xl text-xl font-bold">
          Our <span className="text-[#09c558]">Executive</span> Members
        </h2>
        <p className="mx-auto md:max-w-2xl md:text-sm w-[95%] text-gray-600">
          Passionate individuals driving innovation, collaboration, and growth.
        </p>
      </div>

      <div className="md:w-[95%] mx-auto md:flex gap-5 justify-center items-center py-10">
        {/* Thumbnails Navigation */}
        <div className="flex md:flex-col md:gap-3 gap-1 mb-5 ml-6 md:mb-auto md:w-[30%] ">
          {members.map((member, i) => (
            <div
              key={member.id}
              onClick={() => showSlide(i)}
              className={`flex items-center md:h-20 cursor-pointer md:px-4 md:py-2 px-1 py-2 rounded ${
                currentSlide === i
                  ? "bg-[#E3F9E7] shadow-xl text-[#09c558] border border-gray-50 font-semibold"
                  : "bg-gray-50 text-gray-600 "
              }`}
            >
              <h2 className="text-xs md:text-xl uppercase font-bold text-[#028237] text-center">
                {member?.role}
              </h2>
            </div>
          ))}
        </div>

        {members.length === 0 ? (
          <div className="w-full h-75 flex justify-center items-center shadow-md">
            No Executive Members Found
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center pt-5 md:pt-0 mx-5 md:pt-auto items-center  md:w-[60%] md:mx-auto bg-[#E3F9E7] rounded shadow-md overflow-hidden">
            {/* Left Side Role */}
            <div className="w-1/3 flex justify-center items-center bg-[#028237]/10 md:p-6 p-2">
              <img
                src={members[currentSlide]?.photoURL}
                alt={members[currentSlide]?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side Content */}
            <div className="md:w-2/3 flex flex-col items-center justify-center p-6 gap-6">
              {/* Profile Image */}

              {/* Message + Name + Socials */}
              <div className="flex flex-col items-center text-center gap-3">
                <p className="text-gray-700 text-sm md:text-base max-w-md">
                  {members[currentSlide]?.message}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-[#028237]">
                  {members[currentSlide]?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Batch: {members[currentSlide]?.batch} | Session:{" "}
                  {members[currentSlide]?.session}
                </p>

                {/* Social Icons */}
                <div className="flex gap-4 mt-2">
                  {members[currentSlide]?.socials.linkedin !== "/" && (
                    <a
                      href={members[currentSlide]?.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-[#09c558]"
                    >
                      <FaLinkedin className="w-8 h-8 rounded" />
                    </a>
                  )}
                  {members[currentSlide]?.socials.github !== "/" && (
                    <a
                      href={members[currentSlide]?.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#09c558]"
                    >
                      <FaGithub className="w-8 h-8 rounded" />
                    </a>
                  )}
                  {members[currentSlide]?.socials.facebook !== "/" && (
                    <a
                      href={members[currentSlide]?.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-[#09c558]"
                    >
                      <FaFacebook className="w-8 h-8 rounded" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* See More */}
      <div className="mt-4 mb-10 border border-amber-50 text-center">
        <a
          href="/about"
          className="inline-block rounded-full bg-white px-8 py-2 font-semibold text-[#09c558] shadow-md transition 
          duration-500
            hover:text-amber-50 hover:bg-green-500"
        >
          Executive Body
        </a>
      </div>
    </div>
  );
}

export default ExecutiveMember;
