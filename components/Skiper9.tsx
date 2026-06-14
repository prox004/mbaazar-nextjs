"use client";

import React, { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/app/components/Preloader";
const Skiper9 = memo(() => {
    const [showPreloader, setShowPreloader] = useState(true);

    return (
        <AnimatePresence mode="wait">
            {showPreloader && (
                <Preloader
                    onFinish={() => setShowPreloader(false)}
                />
            )}
        </AnimatePresence>
    );
});

Skiper9.displayName = "Skiper9";

export default Skiper9;