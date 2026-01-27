import HeroSlider from "./Components/Home/HeroSlider/HeroSlider";
import { slideData } from "./Components/Home/HeroSlider/SlidesData";
import HistorySection from "./Components/Home/HistorySection/HistorySection";
import OurCommunity from "./Components/Home/OurCommunity/OurCommunity";
import PartnersSection from "./Components/Home/PartnersSection/PartnersSection";
import ExecutiveMember from "./Components/Home/Team/ExecutiveMember";
import Wings from "./Components/Home/Wings/Wings";
import { activityData } from "./Components/Home/ActivitiesSlider/ActivitiesSliderData";
import RecentActivityImageSlider from "./Components/Home/ActivitiesSlider/RecentActivityImageSlider";
import UpcomingEventSlider from "./Components/Home/ActivitiesSlider/UpCommingEvent";
import { events as allEvents } from "./events/data/eventData";

export default function Home() {
  const upcomingEvents = allEvents.data.filter(
    (event) => event.registration.status === "Open",
  );
  return (
    <div className="">
      <HeroSlider slides={slideData} />
      <HistorySection />
      <OurCommunity />
      <UpcomingEventSlider events={upcomingEvents} />
      <RecentActivityImageSlider activities={activityData} />
      <PartnersSection />
      <Wings />
      <ExecutiveMember />
      {/* <OurTeam /> */}
    </div>
  );
}
