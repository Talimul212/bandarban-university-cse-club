"use client";

import { CreativeCommons } from "lucide-react";
import Image from "next/image";

type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Dive deep into the world of modern web technologies by mastering the foundations of HTML, CSS, and JavaScript, then progressing into advanced frameworks such as React, Next.js, and Angular. You'll learn how to build responsive, accessible, and visually appealing websites that adapt seamlessly across devices. The course emphasizes practical projects, including portfolio sites, e-commerce platforms, and interactive dashboards, while also covering essential topics like performance optimization, SEO best practices, and deployment strategies. By the end, you'll be equipped to design and develop full-stack applications that balance functionality with user experience.",
    image: "/images/webdesign.jpg", // place your image in public/images
  },
  {
    id: 2,
    title: "Mobile App Development",
    description:
      "Explore the exciting field of mobile app creation by learning both cross-platform and native development approaches. You'll gain hands-on experience with frameworks like Flutter and React Native, as well as native Android (Java/Kotlin) and iOS (Swift) development. The course covers UI/UX design principles for mobile interfaces, integration with APIs, offline storage, and push notifications. You'll also learn how to publish apps to Google Play and the App Store, ensuring they meet industry standards. Through real-world projects such as productivity apps, social media prototypes, and mobile games, you'll develop the skills to bring innovative ideas to life on smartphones and tablets.",
    image: "/images/idea.png",
  },
  {
    id: 3,
    title: "Thesis and Research Paper",
    description:
      "Develop the academic and professional skills necessary to produce high-quality research papers and theses. This course guides you through the entire research process: identifying a topic, conducting literature reviews, formulating hypotheses, and applying appropriate methodologies. You'll learn how to structure arguments, analyze data, and present findings with clarity and precision. Special emphasis is placed on citation styles (APA, MLA, Chicago), ethical research practices, and avoiding plagiarism. You'll also gain insights into publishing in journals, presenting at conferences, and defending your thesis. By the end, you'll be confident in producing scholarly work that contributes meaningfully to your field of study",
    image: "/images/research.jpg",
  },
];

export default function CoursesPage() {
  return (
    <section className="bg-linear-to-b from-green-200 to-green-100 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Button */}
        <div>
          <div className="flex justify-center mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#09c558] text-[#09c558] font-semibold hover:bg-[#09c558]/10 transition">
              <CreativeCommons className="w-4 h-4" />
              Running Courses
            </button>
          </div>
        </div>
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            High Demanded <span className="text-[#09c558]">Course </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore our diverse range of courses designed to equip you with
            practical skills and industry knowledge.
          </p>
        </div>
        <div className="space-y-20">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div
                  data-aos="fade-right"
                  className="relative aspect-3/2 w-full overflow-hidden rounded-xl shadow-lg"
                >
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Text */}
              <div data-aos="fade-left" className="w-full md:w-1/2">
                <h2 className="mb-4 text-2xl font-semibold">{course.title}</h2>

                <p className="max-w-prose text-gray-700 leading-relaxed text-justify hyphens-auto">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
