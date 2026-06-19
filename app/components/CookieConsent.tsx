"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-[9999] glass-panel p-6 rounded-2xl shadow-2xl flex flex-col gap-4 border border-zinc-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-black text-white rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-zinc-900">Cookie Preference</h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                We use cookies to optimize your experience, analyze site traffic, and personalize design. By clicking accept, you agree to our policies.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Manage settings
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-xs font-semibold bg-zinc-900 hover:bg-black text-white rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
