import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import PromotionalTicker from "./components/PromotionalTicker";
import ReelsShowcase from "./components/ReelsShowcase";
import BlogShowcase from "./components/BlogShowcase";
import StoreLocator from "./components/StoreLocator";
import BackToTop from "./components/BackToTop";
import AboutUs from "./components/AboutUs";

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

      {/* Scroll Velocity Promotional Tickers */}
      <PromotionalTicker />

      {/* YouTube Shorts Showcase Section */}
      <ReelsShowcase />

      {/* Store Locator Section */}
      <StoreLocator />

      {/* Blog Showcase Section */}
      <BlogShowcase />

      {/* Floating Back to Top Widget */}
      <BackToTop />

    </div>
  );
}


