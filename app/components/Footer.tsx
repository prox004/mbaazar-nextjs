"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Check } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">

          {/* Brand Info Col (4 Columns) */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/">
              <img src="/logo_white.png" alt="M Baazar Logo" className="h-10 w-auto object-contain cursor-pointer" />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed font-normal max-w-sm">
              M Baazar is one of the fastest-growing retail chains, bringing you high-quality, trendy clothing, footwear, and accessories at accessible prices.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 text-zinc-400"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 text-zinc-400"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 text-zinc-400"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 text-zinc-400"
                aria-label="Youtube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.52 3.328 12 3.328 12 3.328s-7.52 0-9.388.725a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.612 5.837a3.003 3.003 0 002.11 2.11c1.868.725 9.388.725 9.388.725s7.52 0 9.388-.725a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Categories (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm font-medium text-zinc-400">
              <li><Link href="/shop?category=Men" className="hover:text-red-500 transition-colors">Men's Wear</Link></li>
              <li><Link href="/shop?category=Women" className="hover:text-red-500 transition-colors">Women's Wear</Link></li>
              <li><Link href="/shop?category=Kids" className="hover:text-red-500 transition-colors">Kids Section</Link></li>
              <li><Link href="/shop" className="hover:text-red-500 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm font-medium text-zinc-400">
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact Support</Link></li>
              <li><Link href="/#outlets" className="hover:text-red-500 transition-colors">Outlets Locator</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">FAQs & Help</Link></li>
              <li><Link href="/careers" className="hover:text-red-500 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-semibold font-semibold">Join Our Newsletter</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Subscribe to get notified about our latest outlets openings, sales, and exclusive fashion releases.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors font-medium"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-green-500 font-bold animate-fadeIn">
                Thank you for subscribing!
              </p>
            )}
          </div>

        </div>

        {/* Bottom Contact and Legal info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 items-center text-xs font-semibold text-zinc-500">

          {/* Copyright */}
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} M Baazar. All Rights Reserved.
          </div>

          {/* Payment Badges / Legal */}
          <div className="flex justify-center md:justify-end items-center gap-6">
            <Link href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
            <span className="text-zinc-800">|</span>
            <Link href="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link>
            <span className="text-zinc-800">|</span>
            <Link href="/sitemap.xml" className="hover:text-red-500 transition-colors">Sitemap</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
