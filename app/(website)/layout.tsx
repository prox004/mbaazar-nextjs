import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import Skiper9 from "@/components/Skiper9";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <Skiper9 />
      </body>
    </html>
  );
}
