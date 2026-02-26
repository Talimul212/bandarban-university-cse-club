export type CourseModule = {
  title: string;
  topics: string[];
};

export type Course = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  type: "course" | "wings";
  badge: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  seats: number;
  enrolled: number;
  rating: number;
  reviews: number;
  language: string;
  description: string;
  highlights: string[];
  modules: CourseModule[];
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  image: string;
  syllabusPdf: string;
  enrollFormUrl: string;
  tags: string[];
  startDate: string;
  fee: string;
  tab: string;
};

export const courses: Course[] = [
  {
    id: 1,
    slug: "research-thesis-writing",
    title: "Thesis Paper Fundamentals",
    subtitle: "Master academic writing and research methodology",
    category: "Research",
    type: "wings",
    tab: "Research",
    badge: "WINGS Program",
    duration: "5 Months",
    level: "Beginner",
    seats: 20,
    enrolled: 15,
    rating: 4.9,
    reviews: 63,
    language: "Bengali & English",
    description:
      "Develop the academic and professional skills necessary to produce high-quality research papers and theses. This course guides you through the entire research process: identifying a topic, conducting literature reviews, formulating hypotheses, and applying appropriate methodologies. You'll learn how to structure arguments, analyze data, and present findings with clarity and precision. Special emphasis is placed on citation styles (APA, MLA, Chicago), ethical research practices, and avoiding plagiarism. By the end, you'll be confident in producing scholarly work.",
    highlights: [
      "Hands-on thesis proposal writing",
      "Turnitin plagiarism checker access",
      "Peer review workshops",
      "Publication guidance",
      "Expert faculty mentorship",
    ],
    modules: [
      {
        title: "Module 1: Research Foundations",
        topics: [
          "Types of Research",
          "Problem Formulation",
          "Literature Review Techniques",
        ],
      },
      {
        title: "Module 2: Methodology",
        topics: [
          "Qualitative vs Quantitative",
          "Data Collection",
          "Survey & Interview Design",
        ],
      },
      {
        title: "Module 3: Academic Writing",
        topics: [
          "Thesis Structure",
          "APA/MLA Citation",
          "Academic Tone & Style",
        ],
      },
      {
        title: "Module 4: Presentation & Defense",
        topics: [
          "Data Visualization",
          "Presentation Skills",
          "Thesis Defense Simulation",
        ],
      },
    ],
    instructor: {
      name: "Tarakashar Das",
      title: "Lecturer Computer Science and Engineering",
      avatar: "/images/Tarakashar_Das.jpeg",
    },
    image: "/images/IntroductionToResearch.jpg",
    syllabusPdf: "/syllabus/introduction-to-research.pdf",
    enrollFormUrl: "https://forms.google.com/your-form-link-here",
    tags: ["Research", "Thesis", "APA", "Academic Writing", "Methodology"],
    startDate: "April 1, 2025",
    fee: "Free (WINGS)",
  },
  {
    id: 2,
    slug: "web-development-laravel",
    title: "Web Development with Laravel",
    subtitle: "Build modern, scalable web applications from scratch",
    category: "Web Development",
    type: "wings",
    tab: "Development",
    badge: "Most Popular",
    duration: "6 Months",
    level: "Beginner",
    seats: 30,
    enrolled: 24,
    rating: 4.8,
    reviews: 112,
    language: "Bengali",
    description:
      "Dive deep into the world of modern web technologies by mastering the foundations of HTML, CSS, and JavaScript, then progressing into advanced frameworks such as React, Next.js, and Laravel. You'll learn how to build responsive, accessible, and visually appealing web applications that adapt seamlessly across devices. The course emphasizes practical projects, including portfolio sites, e-commerce platforms, and interactive dashboards, while also covering essential topics like performance optimization, SEO best practices, and deployment strategies.",
    highlights: [
      "Live project-based learning with real clients",
      "Certificate upon successful completion",
      "Mentorship from industry professionals",
      "Job placement assistance",
      "Access to private alumni community",
    ],
    modules: [
      {
        title: "Module 1: Web Foundations",
        topics: [
          "HTML5 & Semantic Markup",
          "CSS3 & Flexbox/Grid",
          "JavaScript ES6+",
        ],
      },
      {
        title: "Module 2: Frontend Frameworks",
        topics: ["React.js Fundamentals", "Next.js & SSR", "Tailwind CSS"],
      },
      {
        title: "Module 3: Backend with Laravel",
        topics: [
          "PHP & OOP",
          "Laravel MVC",
          "REST API Development",
          "Database Design with MySQL",
        ],
      },
      {
        title: "Module 4: Deployment & DevOps",
        topics: ["Git & GitHub", "cPanel & VPS Hosting", "CI/CD Basics"],
      },
    ],
    instructor: {
      name: "Tarakashar Das",
      title: "Lecturer Computer Science and Engineering",
      avatar: "/images/Tarakashar_Das.jpeg",
    },
    image: "/images/course_1711349001.jpg",
    syllabusPdf: "/syllabus/web_development.pdf",
    enrollFormUrl: "https://forms.google.com/your-form-link-here",
    tags: ["Laravel", "React", "Next.js", "MySQL", "HTML", "CSS"],
    startDate: "March 1, 2025",
    fee: "৳ 8,000",
  },
  {
    id: 3,
    slug: "competitive-programming",
    title: "Introduction to Competitive Programming",
    subtitle: "Sharpen your algorithmic thinking and problem-solving skills",
    category: "Programming",
    type: "wings",
    tab: "CP",
    badge: "WINGS Program",
    duration: "4 Months",
    level: "Intermediate",
    seats: 20,
    enrolled: 12,
    rating: 4.6,
    reviews: 45,
    language: "Bengali",
    description:
      "Build strong foundations in data structures and algorithms required for competitive programming and technical interviews. This course covers everything from basic sorting and searching to advanced graph theory, dynamic programming, and greedy algorithms. You'll practice on platforms like Codeforces, LeetCode, and HackerRank. Weekly contests and mock ICPC rounds will sharpen your speed and accuracy under pressure, preparing you for national and international programming contests.",
    highlights: [
      "Weekly online coding contests",
      "Mock ICPC team rounds",
      "Problem-solving community access",
      "Performance-based mentorship",
      "Top performers recommended for national teams",
    ],
    modules: [
      {
        title: "Module 1: Programming Fundamentals",
        topics: ["C++ STL", "Complexity Analysis", "Basic Data Structures"],
      },
      {
        title: "Module 2: Core Algorithms",
        topics: [
          "Sorting & Searching",
          "Recursion & Backtracking",
          "Greedy Algorithms",
        ],
      },
      {
        title: "Module 3: Advanced Topics",
        topics: [
          "Graph Theory (BFS/DFS/Dijkstra)",
          "Dynamic Programming",
          "Segment Trees",
        ],
      },
      {
        title: "Module 4: Contest Practice",
        topics: [
          "Codeforces Rounds",
          "Team Problem Solving",
          "ICPC Style Contests",
        ],
      },
    ],
    instructor: {
      name: "Appoint soon",
      title: "ICPC Regionalist, Competitive Programmer",
      avatar: "/member/appoint_sson.jpg",
    },
    image: "/images/copetitiveProgramming.jpg",
    syllabusPdf: "/syllabus/cp.pdf",
    enrollFormUrl: "https://forms.google.com/your-form-link-here",
    tags: ["C++", "Algorithms", "Data Structures", "ICPC", "LeetCode"],
    startDate: "April 10, 2025",
    fee: "Free (WINGS)",
  },
  {
    id: 5,
    slug: "mobile-app-flutter",
    title: "Mobile App Development with Flutter",
    subtitle: "Create beautiful cross-platform apps for iOS & Android",
    category: "Development",
    type: "wings",
    tab: "Development",
    badge: "New Batch",
    duration: "5 Months",
    level: "Intermediate",
    seats: 25,
    enrolled: 18,
    rating: 4.7,
    reviews: 87,
    language: "Bengali",
    description:
      "Explore the exciting field of mobile app creation by learning cross-platform development with Flutter and Dart. You'll gain hands-on experience building production-ready apps with beautiful UIs, REST API integration, Firebase backend, offline storage, and push notifications. You'll also learn how to publish apps to Google Play and the App Store, ensuring they meet industry standards. Through real-world projects such as productivity apps and e-commerce mobile apps, you'll develop the skills to bring innovative ideas to life.",
    highlights: [
      "Cross-platform app (iOS + Android) from one codebase",
      "Firebase backend integration",
      "App published to Play Store as capstone",
      "Certificate of completion",
      "1-on-1 code review sessions",
    ],
    modules: [
      {
        title: "Module 1: Dart & Flutter Basics",
        topics: ["Dart Language", "Flutter Widgets", "State Management Basics"],
      },
      {
        title: "Module 2: UI/UX for Mobile",
        topics: [
          "Material Design 3",
          "Custom Animations",
          "Responsive Layouts",
        ],
      },
      {
        title: "Module 3: Backend Integration",
        topics: [
          "REST API with Dio",
          "Firebase Auth & Firestore",
          "Local Storage (Hive/SQLite)",
        ],
      },
      {
        title: "Module 4: Publishing",
        topics: ["App Signing", "Play Store Deployment", "App Store Basics"],
      },
    ],
    instructor: {
      name: "Yeasin Arfat Shahin",
      title: "Flutter Developer & Mobile Architect",
      avatar: "/member/1.1.png",
    },
    image: "/images/flutter_app_dev.jpg",
    syllabusPdf: "/syllabus/mobile-app-development.pdf",
    enrollFormUrl: "https://forms.google.com/your-form-link-here",
    tags: ["Flutter", "Dart", "Firebase", "Android", "iOS"],
    startDate: "March 15, 2025",
    fee: "৳ 7,500",
  },
];
