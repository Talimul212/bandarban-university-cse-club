/*
export const events = [
  {
    id: 2,
    title: "React Workshop for Beginners",
    type: "Workshops",
    date: "12 January 2026",
    time: "10:00 AM – 1:00 PM",
    location: "CSE Lab 3",
    tags: ["React", "Frontend", "Workshop"],
    status: "Upcoming",
    image: "/images/react_workshop.webp",
    description:
      "A beginner-friendly workshop introducing React fundamentals, JSX, components, and state management.",
  },
  {
    id: 3,
    title: "AI Ethics Seminar",
    type: "Seminars",
    date: "20 February 2026",
    time: "2:00 PM – 4:00 PM",
    location: "Auditorium Hall",
    tags: ["AI", "Ethics", "Seminar"],
    status: "Upcoming",
    image: "/images/ai_ethics_seminar.jpg",
    description:
      "A seminar exploring ethical challenges in artificial intelligence, with faculty and industry speakers.",
  },
  {
    id: 4,
    title: "bdapps Bootcamp for Indigenous Students in Bandarban",
    type: "Workshops",
    date: "To be announced",
    time: "To be announced",
    location: "Bandarban University / Govt. Women's College",
    tags: ["Bootcamp", "bdapps", "Skills"],
    status: "Completed",
    image: "/images/bdapps.jpg",
    description:
      "A bootcamp empowering indigenous students with mobile app development skills using bdapps.",
  },
  {
    id: 5,
    title: "Let's Code Your Career through Programming",
    type: "Seminars",
    date: "26 July 2026",
    time: "12:00 PM – 1:00 PM",
    location: "Bandarban University Conference Room",
    tags: ["Programming Hero", "Career", "Coding"],
    status: "Completed",
    image: "/images/PH.jpg",
    description:
      "A special session hosted by Programming Hero in collaboration with BU CSE Club — inspiring students to explore programming as a future-ready skill, with live Q&A, coding challenges, and career insights.",
  },
  {
    id: 6,
    title: "CSE Fest 2025 Prize Distribution Ceremony",
    type: "Competitions",
    date: "16 February 2025",
    time: "10:00 AM",
    location: "Bandarban University Conference Hall",
    tags: ["CSEFest2025", "Prize Distribution", "Celebration"],
    status: "Upcoming",
    image: "/images/price_given.jpg",
    description:
      "Celebrating the winners of bdapps presents CSE Fest 2025! Sponsored by Bandarban Hill District Council and Lumbini Limited.",
  },
  {
    id: 7,
    title: "5-Day Coding Bootcamp: Beginner & Intermediate",
    type: "Workshops",
    date: "March 2026",
    time: "9:00 AM – 4:00 PM (Daily)",
    location: "Bandarban University Main Campus (BU CSE Club)",
    tags: ["Bootcamp", "C Programming", "Python", "Beginner", "Intermediate"],
    status: "Upcoming",
    image: "/images/A promotional poster.png",
    description:
      "BU CSE Club is hosting a 5-day intensive coding bootcamp designed for both school (Beginner) and college (Intermediate) students. Participants will be introduced to C and Python programming through hands-on sessions, teamwork, and guided mentorship. The bootcamp aims to build strong foundations in coding, problem-solving, and computational thinking, empowering students to take their first steps into the world of programming.",
  },
];
*/
export const events = {
  meta: {
    total: 6,
    limit: 10,
    page: 1,
    totalPages: 1,
    timestamp: "2026-01-25T17:42:00.000Z",
  },
  data: [
    {
      id: "evt_002",
      slug: "react-workshop-beginners",
      title: "React Workshop for Beginners",
      category: "Workshops",
      isFeatured: true,
      isTba: false,
      startDateTime: "2026-01-12T10:00:00",
      endDateTime: "2026-01-12T13:00:00",

      location: {
        type: "On-site",
        venue: "CSE Lab 3",
        address: "Bandarban University, Building B",
        mapLink: "https://maps.google.com/?q=...",
      },

      organizer: {
        name: "BU CSE Club",
        contactEmail: "cseclub@bu.ac.bd",
      },

      registration: {
        status: "Closed",
        capacity: 50,
        registeredCount: 48,
        fee: 0,
        link: "/register/react-2026",
      },

      tags: ["React", "Frontend", "Workshop"],
      image: "/images/react_workshop.webp",
      description:
        "A beginner-friendly workshop introducing React fundamentals, JSX, components, and state management.",
      resources: [
        { label: "Slides", url: "#" },
        { label: "GitHub Repo", url: "#" },
      ],
    },
    {
      id: "evt_003",
      slug: "ai-ethics-seminar",
      title: "AI Ethics Seminar",
      category: "Seminars",
      isFeatured: false,
      isTba: false,

      startDateTime: "2026-02-20T14:00:00",
      endDateTime: "2026-02-20T16:00:00",

      location: {
        type: "Hybrid",
        venue: "Auditorium Hall",
        address: "Bandarban University Main Campus",
        mapLink: "",
      },

      organizer: {
        name: "BU CSE Club",
        contactEmail: "info@bu.ac.bd",
      },

      registration: {
        status: "Open",
        capacity: 200,
        registeredCount: 120,
        fee: 0,
        link: "/register/ai-ethics",
      },

      tags: ["AI", "Ethics", "Seminar"],
      image: "/images/ai_ethics_seminar.jpg",
      description:
        "A seminar exploring ethical challenges in artificial intelligence, with faculty and industry speakers.",
      resources: [],
    },
    {
      id: "evt_004",
      slug: "bdapps-bootcamp-indigenous",
      title: "bdapps Bootcamp for Indigenous Students",
      category: "Workshops",
      isFeatured: true,
      isTba: true, // TBA = To be announce

      startDateTime: null, // Null because TBA = true
      endDateTime: null,

      location: {
        type: "On-site",
        venue: "Bandarban University / Govt. Women's College",
        address: "Bandarban",
        mapLink: "",
      },

      organizer: {
        name: "bdapps & BU CSE Club",
        contactEmail: "support@bdapps.com",
      },

      registration: {
        status: "Coming Soon",
        capacity: 100,
        registeredCount: 0,
        fee: 0,
        link: "#",
      },

      tags: ["Bootcamp", "bdapps", "Skills"],
      image: "/images/bdapps.jpg",
      description:
        "A bootcamp empowering indigenous students with mobile app development skills using bdapps.",
      resources: [],
    },
    {
      id: "evt_005",
      slug: "programming-hero-career-talk",
      title: "Let's Code Your Career",
      category: "Seminars",
      isFeatured: true,
      isTba: false,

      startDateTime: "2026-07-26T12:00:00",
      endDateTime: "2026-07-26T13:00:00",

      location: {
        type: "On-site",
        venue: "Conference Room",
        address: "Bandarban University",
        mapLink: "",
      },

      organizer: {
        name: "Programming Hero",
        contactEmail: "hello@programming-hero.com",
      },

      registration: {
        status: "Open",
        capacity: 80,
        registeredCount: 15,
        fee: 0,
        link: "/register/ph-career",
      },

      tags: ["Programming Hero", "Career", "Coding"],
      image: "/images/PH.jpg",
      description:
        "A special session hosted by Programming Hero in collaboration with BU CSE Club...",
      resources: [],
    },
    {
      id: "evt_006",
      slug: "cse-fest-2025-prize-giving",
      title: "CSE Fest 2025 Prize Distribution",
      category: "Competitions",
      isFeatured: false,
      isTba: false,

      startDateTime: "2025-02-16T10:00:00", // Past date
      endDateTime: "2025-02-16T13:00:00",

      location: {
        type: "On-site",
        venue: "Conference Hall",
        address: "Bandarban University",
        mapLink: "",
      },

      organizer: {
        name: "BU CSE Club",
        contactEmail: "cseclub@bu.ac.bd",
      },

      registration: {
        status: "Closed",
        capacity: 300,
        registeredCount: 300,
        fee: 0,
        link: "",
      },

      tags: ["CSEFest2025", "Prize Distribution", "Celebration"],
      image: "/images/price_given.jpg",
      description: "Celebrating the winners of bdapps presents CSE Fest 2025!",
      resources: [],
    },
    {
      id: "evt_007",
      slug: "5-day-coding-bootcamp",
      title: "5-Day Coding Bootcamp: Beginner & Intermediate",
      category: "Workshops",
      isFeatured: true,
      isTba: false,

      startDateTime: "2026-03-10T09:00:00",
      endDateTime: "2026-03-15T16:00:00",

      location: {
        type: "On-site",
        venue: "BU CSE Club",
        address: "Bandarban University Main Campus",
        mapLink: "",
      },

      organizer: {
        name: "BU CSE Club",
        contactEmail: "",
      },

      registration: {
        status: "Open",
        capacity: 40,
        registeredCount: 10,
        fee: 500,
        link: "/register/bootcamp-2026",
      },

      tags: ["Bootcamp", "C Programming", "Python"],
      image: "/images/A promotional poster.png",
      description:
        "BU CSE Club is hosting a 5-day intensive coding bootcamp...",
      resources: [],
    },
  ],
};
