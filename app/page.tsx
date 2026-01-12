import HeroSlider from "./Components/Home/HeroSlider/HeroSlider";
import { slideData } from "./Components/Home/HeroSlider/SlidesData";
import OurCommunity from "./Components/Home/OurCommunity/OurCommunity";

export default function Home() {
  return (
    // <div className="flex min-h-screen items-center justify-center  font-sans dark:bg-black">
    //   <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16  dark:bg-black sm:items-start">
    //     <div>hello world</div>
    //     <div>Hello 2</div>
    //   </main>
    // </div>
    <div>
      <HeroSlider slides={slideData} />
      <OurCommunity />
    </div>
  );
}
