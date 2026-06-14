"use client";

import React, { memo, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Preloader from "@/app/components/Preloader";

const Skiper9 = memo(() => {
    const pathname = usePathname();
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        setShowPreloader(true);
    }, [pathname]);

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