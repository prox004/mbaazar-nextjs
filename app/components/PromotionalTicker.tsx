"use client";

import React from "react";
import ScrollVelocity from "../../components/ScrollVelocity";

export default function PromotionalTicker() {
  return (
    <div className="w-full overflow-hidden flex flex-col">
      <ScrollVelocity
        texts={["New Summer Styles - "]}
        velocity={50}
        className="text-black text-3xl sm:text-5xl md:text-6xl font-bold py-3 md:py-5"
        numCopies={10}
        damping={50}
        stiffness={400}
      />
      <ScrollVelocity
        texts={["M Baazar - "]}
        velocity={-50}
        className="text-white text-3xl sm:text-5xl md:text-6xl font-bold py-3 md:py-5 bg-red-700"
        numCopies={10}
        damping={50}
        stiffness={400}
      />
    </div>
  );
}
