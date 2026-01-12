import HeroSlider from "./Components/Home/HeroSlider/HeroSlider";
import { slideData } from "./Components/Home/HeroSlider/SlidesData";
import OurCommunity from "./Components/Home/OurCommunity/OurCommunity";

export default function Home() {
  return (
    <div className="">
      <HeroSlider slides={slideData} />
      <OurCommunity />
    </div>
  );
}
