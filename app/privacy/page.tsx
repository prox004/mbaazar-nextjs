import React from "react";

export const metadata = {
  title: "Privacy Policy - M Baazar",
  description: "Read the M Baazar Privacy Policy to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20 sm:py-28 bg-white text-zinc-900 w-full">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-red-700">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base">
            Last updated: June 14, 2026
          </p>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when applying for positions on our careers page, sending queries on our contact form, or signing up for our newsletter. This may include your name, email address, phone number, qualification history, and professional files like CVs.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. How We Use Your Information</h2>
            <p>
              We use the collected information to process job applications, respond to messages or feedback submitted through contact forms, and to send marketing or promotional notifications when authorized.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Sharing of Information</h2>
            <p>
              We do not sell, rent, or trade your personal data to third parties. We may share information with trusted service providers who assist us in operating our website and business, subject to strict confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Security of Data</h2>
            <p>
              We implement comprehensive security measures designed to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, update, correct, or request deletion of the personal information we hold about you. For any such requests, please contact us at customercare@mbaazar.in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
