import { about as AboutComponent } from "./About";

export const metadata = {
  title: "About Us - M Baazar",
  description:
    "M Baazar is one of the leading garment retail chains in India. We have a well-established presence across 9 states with 225+ stores.",
};

export default function AboutPage() {
  const mBaazarData = {
    title: "About M Baazar",
    description:
      "A beloved name in Indian fashion, M Baazar has been a constant companion shaping the shopping sensibility of millions across the nation. We pledge to deliver premium value to our customers.",
    mainImage: {
      src: "https://content3.jdmagicbox.com/v2/comp/lucknow/q4/0522px522.x522.180819215537.w8q4/catalogue/m-baazar-singar-nagar-lucknow-departmental-stores-5mvp4as9dl.jpg",
      alt: "M Baazar Fashion Store",
    },
    secondaryImage: {
      src: "https://www.mbaazar.in/wp-content/uploads/2020/10/Cover-Banner.jpg",
      alt: "M Baazar Shopping",
    },
    breakout: {
      src: "https://www.mbaazar.in/wp-content/uploads/2023/05/mbaazarLogo-Header.png",
      alt: "M Baazar Logo",
      title: "Redefining Fashion Across India",
      description:
        "Driven by a vision to make fashion more inclusive and aspirational for every Indian, M Baazar is constantly evolving with changing trends and lifestyle.",
      buttonText: "Locate Nearest Store",
      buttonUrl: "/#outlets",
    },
    achievementsTitle: "Our Growing Presence",
    achievementsDescription:
      "With a rapidly growing network of fashion stores, we bring the latest trends closer to you across multiple states.",
    achievements: [
      { label: "States Covered", value: "9" },
      { label: "Stores Nationwide", value: "225+" },
      { label: "Happy Customers", value: "Millions" },
      { label: "Premium Value", value: "100%" },
    ],
    contentSections: [
      {
        title: "Overview",
        content:
          "A beloved name in Indian fashion, M Baazar has been a constant companion shaping the shopping sensibility of millions across the nation. Over the years, it has built a strong bond with customers by offering a wide range of products that cater to everyday needs as well as special occasions. From trendy clothing and accessories to toys and home essentials, M Baazar has established itself as a trusted one-stop shopping destination for families across India.\n\nWith a network of 225+ stores spread across 9 states, M Baazar remains committed to making its offerings accessible, affordable and unquestionably fashionable. We believe that style should never be out of reach and strive to offer quality, variety and value under one roof. Driven by a vision to make fashion more inclusive and aspirational for every Indian, M Baazar is constantly evolving with changing trends and lifestyle. As it continues to expand its footprint, the brand is poised to redefine the future of Indian fashion, aiming higher, reaching further and elevating the fashion quotient of the nation.",
      },
      {
        title: "Our Values",
        content:
          "Exceptional Value: Offering high-quality products at competitive prices to ensure maximum customer satisfaction.\n\nUnparalleled Variety: Providing a diverse range of fashion options to cater to every individual's unique style and preference.\n\nCustomer-centric Approach: Continuously understanding and addressing customer needs through innovative solutions and personalised experiences.\n\nEmpowering its People: Fostering a positive and inclusive work environment where employees are valued, empowered and inspired to deliver excellence.",
      },
      {
        title: "Management Desk",
        content:
          "Under the visionary leadership of Mr. Sanjay Saraf, CMD and Founder, M Baazar stands at a dynamic phase of growth. With a strong focus on market penetration and expansion, the brand continues to strengthen its presence while exploring new opportunities to reach a wider audience.\n\nDriven by a bold and forward-looking approach, Mr. Saraf is redefining the fashion segment and shaping the success story of M Baazar. His strategic vision centres on delivering the best quality fashion, while steadily expanding into new markets, transforming M Baazar into a lean, agile and highly competitive retail force, one that is well-positioned to lead the future of fashion in India.",
      },
    ],
    // Passing null or placeholder company logos for marquee
    companies: [
      {
        src: "https://www.mbaazar.in/wp-content/uploads/2023/05/mbaazarLogo-Header.png",
        alt: "M Baazar",
      },
    ],
  };

  return <AboutComponent {...mBaazarData} />;
}
