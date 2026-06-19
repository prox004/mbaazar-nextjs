"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    qualification: "",
    experience: "",
    position: "",
    preferredLocations: "",
    lastCompany: "",
    lastDesignation: "",
    lastSalary: "",
    reasonForLeaving: "",
    lastPostedCity: "",
    homeTown: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cv" | "picture"
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "cv") {
        setCvFile(e.target.files[0]);
      } else {
        setPictureFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const qualifications = ["B.A", "BBA", "B.Com", "B.Sc", "MBA", "Others"];
  const positions = [
    "Accounts & Finance (A&F)",
    "Human Resource (HR)",
    "Management Information System (MIS)",
    "Inventory",
    "Information Technology (IT)",
    "Logistics",
    "Store Manager (SM)",
    "Assistant Store Manager (ASM)",
    "Trainee Assistant Store Manager (TASM)",
    "Floor Manager (FM)",
    "Team Leader (TL)",
    "Company Secretary (CS)",
    "Chartered Accountant (CA)",
    "Digital Marketing Executive (DME)",
    "Graphic Designer (GD)",
    "Visual Merchandiser (VM)",
    "Sales Associate (SA)",
    "Others",
  ];

  return (
    <section className="py-16 sm:py-24 bg-white text-zinc-900 w-full overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-red-700">
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
            Careers at M Baazar
          </h1>
          <p className="text-zinc-600 leading-relaxed font-normal text-sm sm:text-base">
            Looking to join Team M Baazar? Please do share your information by filling-up the form below or send us an email at{" "}
            <a href="mailto:hr@mbaazar.in" className="text-red-700 hover:underline font-semibold">
              hr@mbaazar.in
            </a>{" "}
            with your updated resume and we will surely get back to you if we are interested!
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-red-50/60 border border-red-200 rounded-2xl p-8 text-center flex flex-col items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">Application Submitted!</h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              Thank you for applying to M Baazar. Our HR team will review your application and contact you if your profile matches our requirements.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-red-700 hover:bg-red-700 text-white rounded-xl px-6 py-2"
            >
              Submit Another Application
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-50/40 border border-zinc-150 rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col gap-8"
          >
            {/* Personal Info Group */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-700 rounded-full inline-block" />
                Personal Details
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Gender*</label>
                  <div className="flex gap-6 items-center h-10">
                    <label className="flex items-center gap-2 text-sm text-zinc-800 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                        className="text-red-700 focus:ring-red-700"
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2 text-sm text-zinc-800 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                        className="text-red-700 focus:ring-red-700"
                      />
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications & Position Group */}
            <div className="border-t border-zinc-100 pt-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-700 rounded-full inline-block" />
                Professional Info
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Highest Qualification*</label>
                  <select
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none bg-white focus:border-red-700"
                  >
                    <option value="">--Select Qualification--</option>
                    {qualifications.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Experience* (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 2"
                    min="0"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Position Applied For*</label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none bg-white focus:border-red-700"
                  >
                    <option value="">--Select Position--</option>
                    {positions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Preferred Locations</label>
                  <input
                    type="text"
                    name="preferredLocations"
                    value={formData.preferredLocations}
                    onChange={handleInputChange}
                    placeholder="Preferred cities"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Current/Last Company</label>
                  <input
                    type="text"
                    name="lastCompany"
                    value={formData.lastCompany}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Last Designation</label>
                  <input
                    type="text"
                    name="lastDesignation"
                    value={formData.lastDesignation}
                    onChange={handleInputChange}
                    placeholder="Enter last role title"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Last Drawn Salary</label>
                  <input
                    type="text"
                    name="lastSalary"
                    value={formData.lastSalary}
                    onChange={handleInputChange}
                    placeholder="Salary package details"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Reason for Leaving</label>
                  <input
                    type="text"
                    name="reasonForLeaving"
                    value={formData.reasonForLeaving}
                    onChange={handleInputChange}
                    placeholder="Reason for change"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Last Posted City</label>
                  <input
                    type="text"
                    name="lastPostedCity"
                    value={formData.lastPostedCity}
                    onChange={handleInputChange}
                    placeholder="City you worked in"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
              </div>
            </div>

            {/* Contacts & Attachments Group */}
            <div className="border-t border-zinc-100 pt-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-700 rounded-full inline-block" />
                Contact & Verification
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Home Town</label>
                  <input
                    type="text"
                    name="homeTown"
                    value={formData.homeTown}
                    onChange={handleInputChange}
                    placeholder="Your hometown address"
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
                  <label className="text-xs font-semibold text-zinc-700">Contact No*</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contact number"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Date of Birth*</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Upload Your CV* (.pdf, .txt, .doc, .docx)</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "cv")}
                    className="w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                  />
                  {cvFile && <p className="text-[10px] text-zinc-500 font-medium">Selected: {cvFile.name}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Upload Your Picture (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "picture")}
                    className="w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                  />
                  {pictureFile && <p className="text-[10px] text-zinc-500 font-medium">Selected: {pictureFile.name}</p>}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 self-start bg-red-700 hover:bg-red-700 text-white rounded-xl px-10 py-3 font-semibold tracking-wide"
            >
              Apply Now
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
