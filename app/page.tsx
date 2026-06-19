import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import PromotionalTicker from "./components/PromotionalTicker";
import ReelsShowcase from "./components/ReelsShowcase";
import FindNewStyles from "./components/FindNewStyles";
import BlogShowcase from "./components/BlogShowcase";
import StoreLocator from "./components/StoreLocator";
import BackToTop from "./components/BackToTop";
import AboutUs from "./components/AboutUs";
import StayConnected from "./components/StayConnected";
import InteractiveOutfit from "./components/InteractiveOutfit";
import SplitPromoCards from "./components/SplitPromoCards";

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

      {/* Split Promo Cards Section */}
      <SplitPromoCards />

      {/* YouTube Shorts Showcase Section */}
      <ReelsShowcase />

      {/* Find New Styles Section */}
      <FindNewStyles />

      {/* Tap to View Interactive Outfit Section */}
      <InteractiveOutfit />

      {/* Store Locator Section */}
      <StoreLocator />

      {/* Blog Showcase Section */}
      <BlogShowcase />

      {/* Stay Connected (Above Footer) */}
      <StayConnected />

      {/* Floating Back to Top Widget */}
      <BackToTop />

    </div>
  );
}


