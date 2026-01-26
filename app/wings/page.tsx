"use client";
import { ArrowRight, CreativeCommons } from "lucide-react";
import Image from "next/image";

type Course = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Web Development",
    category: "Development",
    description:
      "Dive deep into the world of modern web technologies by mastering the foundations of HTML, CSS, and JavaScript, then progressing into advanced frameworks such as React, Next.js, and Angular. You'll learn how to build responsive, accessible, and visually appealing websites that adapt seamlessly across devices. The course emphasizes practical projects, including portfolio sites, e-commerce platforms, and interactive dashboards, while also covering essential topics like performance optimization, SEO best practices, and deployment strategies. By the end, you'll be equipped to design and develop full-stack applications that balance functionality with user experience.",
    image: "/images/webdesign.jpg", // place your image in public/images
  },
  {
    id: 2,
    title: "Mobile App Development",
    category: "Development",
    description:
      "Explore the exciting field of mobile app creation by learning both cross-platform and native development approaches. You'll gain hands-on experience with frameworks like Flutter and React Native, as well as native Android (Java/Kotlin) and iOS (Swift) development. The course covers UI/UX design principles for mobile interfaces, integration with APIs, offline storage, and push notifications. You'll also learn how to publish apps to Google Play and the App Store, ensuring they meet industry standards. Through real-world projects such as productivity apps, social media prototypes, and mobile games, you'll develop the skills to bring innovative ideas to life on smartphones and tablets.",
    image: "/images/idea.png",
  },
  {
    id: 3,
    title: "Thesis and Research Paper",
    category: "Research",
    description:
      "Develop the academic and professional skills necessary to produce high-quality research papers and theses. This course guides you through the entire research process: identifying a topic, conducting literature reviews, formulating hypotheses, and applying appropriate methodologies. You'll learn how to structure arguments, analyze data, and present findings with clarity and precision. Special emphasis is placed on citation styles (APA, MLA, Chicago), ethical research practices, and avoiding plagiarism. You'll also gain insights into publishing in journals, presenting at conferences, and defending your thesis. By the end, you'll be confident in producing scholarly work that contributes meaningfully to your field of study",
    image: "/images/research.jpg",
  },
];

export default function WingsPage() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:py-28 lg:px-8 bg-white overflow-hidden">
      {/* Background Decor - Minimalist Modern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-24 left-10 w-64 h-64 bg-green-100 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-emerald-50 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Top Badge */}
        <div className="flex justify-center mb-10" data-aos="fade-down">
          <button className="group flex items-center gap-2 px-6 py-2 rounded-full bg-[#028237]/10 text-[#028237] font-bold text-xs uppercase tracking-widest border border-[#028237]/20 shadow-sm transition-all hover:bg-[#028237]/20">
            <CreativeCommons className="w-4 h-4 transition-transform group-hover:rotate-12" />
            Running Courses
          </button>
        </div>

        {/* Header */}
        <div className="mb-20 lg:mb-32 text-center" data-aos="zoom-in">
          <h2 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
            High Demanded{" "}
            <span className="text-[#09c558] relative">Course</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
            Explore our diverse range of courses designed to equip you with
            practical skills and industry knowledge.
          </p>
        </div>

        {/* Alternating Course Sections */}
        <div className="space-y-24 md:space-y-40">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`flex flex-col md:flex-row items-center gap-10 lg:gap-20 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div
                className="w-full md:w-1/2"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-duration="1000"
              >
                <div className="group relative aspect-4/3 sm:aspect-video md:aspect-3/2 w-full overflow-hidden rounded-md shadow-md ring-1 ring-black/5">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Text Content Section */}
              <div
                className="w-full md:w-1/2 flex flex-col items-start"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                data-aos-duration="1000"
              >
                <span className="mb-4 px-4 py-1 rounded-lg bg-gray-100 text-gray-500 font-bold text-xs uppercase tracking-tighter">
                  {course.category || "Professional"}
                </span>

                <h3 className="mb-6 text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  {course.title}
                </h3>

                {/* Justified Text with Hyphens for Production Quality */}
                <p className="mb-8 text-gray-600 text-base lg:text-lg leading-relaxed text-justify hyphens-auto wrap-break-words lg:break-normal">
                  {course.description}
                </p>

                <button className="group flex items-center gap-2 font-bold text-[#09c558] hover:text-[#028237] transition-colors">
                  View Syllabus
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
