"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Link as LinkIcon } from "lucide-react";
import StoreLocator from "../components/StoreLocator";

//test

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please check the authorization box to submit.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-zinc-900 w-full overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-red-700">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
            Contact M Baazar
          </h1>
          <p className="text-zinc-600 leading-relaxed font-normal text-sm sm:text-base">
            Have queries, suggestions, or feedback? Drop us a line or visit our corporate office. We'd love to hear from you.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid gap-12 lg:grid-cols-12 items-stretch">

          {/* Left Column: Office & Map Info (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-zinc-50/40 border border-zinc-150 rounded-2xl p-8 sm:p-10 shadow-xs flex-1 flex flex-col justify-between gap-8">
              <div>
                <h2 className="text-2xl font-black text-zinc-950 tracking-tight flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-6 bg-red-700 rounded-full inline-block" />
                  Corporate Office
                </h2>
                <h3 className="text-lg font-bold text-red-700 mb-6">Metro Retail Pvt. Ltd.</h3>

                <ul className="flex flex-col gap-6 text-sm sm:text-base">
                  <li className="flex gap-4 items-start">
                    <div className="p-2 bg-white rounded-xl border border-red-700 shadow-sm flex-shrink-0 text-red-700">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">Address</p>
                      <p className="text-zinc-600 mt-1 leading-relaxed">
                        GKW Compound, 97, Andul Road, Shed No.1, Howrah-711103
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start">
                    <div className="p-2 bg-white rounded-xl border border-red-700 shadow-sm flex-shrink-0 text-red-700">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">Phone</p>
                      <a href="tel:9830640004" className="text-zinc-600 hover:text-red-700 mt-1 leading-relaxed block transition-colors">
                        +91 9830640004
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start">
                    <div className="p-2 bg-white rounded-xl border border-red-700 shadow-sm flex-shrink-0 text-red-700">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">Email</p>
                      <a href="mailto:customercare@mbaazar.in" className="text-zinc-600 hover:text-red-700 mt-1 leading-relaxed block transition-colors">
                        customercare@mbaazar.in
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start">
                    <div className="p-2 bg-white rounded-xl border border-red-700 shadow-sm flex-shrink-0 text-red-700">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">Website</p>
                      <a href="https://www.mbaazar.in" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-red-700 mt-1 leading-relaxed block transition-colors">
                        www.mbaazar.in
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map embed */}
              <div className="w-full overflow-hidden rounded-xl border border-zinc-200 shadow-sm bg-white aspect-[16/10]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.4110439555443!2d88.29970324989513!3d22.563724838911448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02784b2a496103%3A0x28122ef1ab8957b0!2sMetro%20Retail%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1598511607591!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Drop us a line form (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-zinc-50/40 border border-zinc-150 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div>
              <h2 className="text-2xl font-black text-zinc-950 tracking-tight flex items-center gap-3 mb-8">
                <span className="w-1.5 h-6 bg-red-700 rounded-full inline-block" />
                Drop us a line
              </h2>

              {submitted ? (
                <div className="h-full flex flex-col justify-center items-center gap-4 text-center py-16">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900">Message Sent!</h3>
                  <p className="text-zinc-600 text-sm max-w-md">
                    Thank you for reaching out to us. We have received your query and will get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-red-700 hover:bg-red-700 text-white rounded-xl px-6 py-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-700">Name*</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-700">Email ID*</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-700">Phone Number*</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Contact Number"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-700">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here..."
                      className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 mt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      className="mt-1 text-red-700 focus:ring-red-700 rounded border-zinc-300"
                    />
                    <label htmlFor="consent" className="text-xs text-zinc-600 leading-relaxed cursor-pointer select-none">
                      I hereby authorize M Baazar to send notifications on SMS, Calls, RCS.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 self-start bg-red-700 hover:bg-red-700 text-white rounded-xl px-10 py-3 font-semibold tracking-wide"
                  >
                    Submit Form
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <StoreLocator />

      </div>
    </section>
  );
}
