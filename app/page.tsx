import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import AboutUs from "./components/AboutUs";
import ReelsShowcase from "./components/ReelsShowcase";
import StoreLocator from "./components/StoreLocator";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

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

      {/* Store Locator Section */}
      <StoreLocator />

      {/* Footer Section */}
      <Footer />

      {/* Floating Back to Top Widget */}
      <BackToTop />

    </div>
  );
}


