import HeroSlider from "./Components/Home/HeroSlider/HeroSlider";
import { slideData } from "./Components/Home/HeroSlider/SlidesData";
import HistorySection from "./Components/Home/HistorySection/HistorySection";
import OurCommunity from "./Components/Home/OurCommunity/OurCommunity";

export default function Home() {
  return (
    <div className="">
      <HeroSlider slides={slideData} />
      <HistorySection />
      <OurCommunity />
    </div>
  );
}
