import React from "react";

export const metadata = {
  title: "Terms of Service - M Baazar",
  description: "Read the M Baazar Terms of Service governing the use of our website, services, and locations.",
};

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-28 bg-white text-zinc-900 w-full">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-red-600">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
            Terms of Service
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base">
            Last updated: June 14, 2026
          </p>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the M Baazar website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Use of Site</h2>
            <p>
              You agree to use the site only for lawful purposes. You must not use the website to transmit malicious code, distribute unsolicited material, or conduct any fraudulent activities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Intellectual Property</h2>
            <p>
              All content, images, designs, logos, text, and other materials on this website are the intellectual property of Metro Retail Pvt. Ltd. and are protected by applicable copyright and trademark laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Limitation of Liability</h2>
            <p>
              M Baazar will not be held liable for any damages arising out of the use or inability to use this website, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Howrah/Kolkata, West Bengal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
