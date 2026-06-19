"use client";

import { motion } from "framer-motion";
import lottie from "lottie-web";
import React, {
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import sceneData from "../../public/Scene.json";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader = memo(
  ({ onFinish }: PreloaderProps) => {
    const lottieRef =
      useRef<HTMLDivElement>(null);

    const [startExit, setStartExit] =
      useState(false);

    const [showLottie, setShowLottie] =
      useState(true);

    useEffect(() => {
      if (!lottieRef.current) return;

      const anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "canvas",
        loop: false,
        autoplay: true,
        animationData: sceneData,
        rendererSettings: {
          clearCanvas: true,
          progressiveLoad: true,
        },
      });

      const handleComplete = () => {
        setShowLottie(false);
        setStartExit(true);

        setTimeout(() => {
          onFinish();
        }, 1000);
      };

      anim.addEventListener(
        "complete",
        handleComplete
      );

      return () => {
        anim.removeEventListener(
          "complete",
          handleComplete
        );
        anim.destroy();
      };
    }, [onFinish]);

    return (
      <motion.div
        className="fixed inset-0 z-[99999] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.25,
          },
        }}
      >
        {/* Lottie Layer */}
        {showLottie && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div
              ref={lottieRef}
              className="w-[90vw] max-w-[500px] aspect-video"
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            />
          </div>
        )}

        {/* Stairs Layer */}
        <div className="absolute inset-0 z-20 flex pointer-events-none">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <motion.div
                key={index}
                className="h-full w-[20vw] bg-red-700"
                initial={{
                  height: "100%",
                }}
                animate={
                  startExit
                    ? {
                      height: 0,
                    }
                    : {}
                }
                transition={{
                  duration: 0.55,
                  delay:
                    0.08 * (4 - index),
                  ease: [
                    0.33,
                    1,
                    0.68,
                    1,
                  ],
                }}
                style={{
                  transformOrigin:
                    "top",
                  borderLeft:
                    index > 0
                      ? "1px solid rgba(0,0,0,0.03)"
                      : "none",
                  willChange:
                    "height",
                }}
              />
            )
          )}
        </div>
      </motion.div>
    );
  }
);

Preloader.displayName = "Preloader";

export default Preloader;