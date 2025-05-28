import HomeBottomSection from "./HomeBottomSection";
import HomeFeaturesSection from "./HomeFeaturesSection";
import HomeTopSection from "./HomeTopSection";

function HomeMain(): React.JSX.Element {
  return (
    <main>
      <HomeTopSection />
      <HomeFeaturesSection />
      <HomeBottomSection />
    </main>
  );
}

export default HomeMain;
