import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBlocker from "./components/MobileBlocker";
import Skiper9 from "@/components/Skiper9";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Baazar - Fast Fashion",
  description: "Modern & Trendy Fashion Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <MobileBlocker />
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />

        <Skiper9 />
      </body>
    </html>
  );
}
