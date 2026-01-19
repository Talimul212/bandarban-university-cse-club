import OurCourses from "./Components/Home/Course/Course";
import HeroSlider from "./Components/Home/HeroSlider/HeroSlider";
import { slideData } from "./Components/Home/HeroSlider/SlidesData";
import HistorySection from "./Components/Home/HistorySection/HistorySection";
import OurCommunity from "./Components/Home/OurCommunity/OurCommunity";
import ExecutiveMember from "./Components/Home/Team/ExecutiveMember";
import OurTeam from "./Components/Home/Team/Team";

export default function Home() {
  return (
    <div className="">
      <HeroSlider slides={slideData} />
      <HistorySection />
      <OurCommunity />
      <OurCourses />
      <ExecutiveMember />
      {/* <OurTeam /> */}
    </div>
  );
}
