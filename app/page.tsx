import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import AboutUs from "./components/AboutUs";
import ReelsShowcase from "./components/ReelsShowcase";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white text-black">
      {/* Hero Carousel Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* About Us Section */}
      <AboutUs />

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* YouTube Shorts Showcase Section */}
      <ReelsShowcase />

    </div>
  );
}


