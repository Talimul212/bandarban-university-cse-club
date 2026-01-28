// types/activity.ts
export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
}
export const activityData = [
  {
    id: "act_001",
    title: "Let's Code Your Career",
    subtitle:
      "A special session hosted by Programming Hero in collaboration with BU CSE Club",
    date: "2025-5-25",
    image: "/images/1.jpg",
  },
  {
    id: "act_002",
    title: "Prize giving Ceremony 2025",
    subtitle: "CSE Fest 2025",
    date: "2025-3-20",
    image: "/images/27.jpg",
  },
  {
    id: "act_003",
    title: "Safe Internet for Career Empowerment",
    subtitle: "Signed MoU between BU CSE Club and YUNet. ",
    date: "2025-1-27",
    image: "/images/22.jpg",
  },
  {
    id: "act_004",
    title: "bdapps Bootcamp for Ethnic Students",
    subtitle:
      "A bootcamp empowering Ethnic students with mobile app development skills using bdapps.",
    date: "2025-10-15",
    image: "/images/25.jpg",
  },
  {
    id: "act_005",
    title: " Cybersecurity Awareness & IT Career",
    subtitle:
      "Promoted cybersecurity awareness among college students. Discussed IT career opportunities.",
    date: "2025-1-06",
    image: "/images/35.jpg",
  },
  {
    id: "act_005",
    title: "Workshop Recap",
    subtitle: "UI/UX Design Principles",
    date: "2025-10-15",
    image: "/video/bu_CSe_video.mp4",
  },
  {
    id: "act_006",
    title: "Workshop Recap",
    subtitle: "UI/UX Design Principles",
    date: "2025-10-15",
    image: "/video/bu_cse_2.mp4",
  },
];
