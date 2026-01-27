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
    title: "Hackathon 2025",
    subtitle: "48-Hour Coding Challenge",
    date: "2025-12-20",
    image: "/images/copetitiveProgramming.jpg",
  },
  {
    id: "act_002",
    title: "Introduction to research",
    subtitle: "AI & Future of Work",
    date: "2025-11-05",
    image: "/images/IntroductionToResearch.jpg",
  },
  {
    id: "act_003",
    title: "Workshop Recap",
    subtitle: "UI/UX Design Principles",
    date: "2025-10-15",
    image: "/images/web_php.jpg",
  },
];
