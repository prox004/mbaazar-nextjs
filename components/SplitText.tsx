"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
}

export default function SplitText({
  text,
  className = "",
  delay = 30,
  duration = 0.5,
  splitType = "chars",
  tag = "p",
  textAlign = "center",
}: SplitTextProps) {
  const words = text.split(" ");
  const Tag = tag as any;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <Tag
      className={`inline-block ${className}`}
      style={{ textAlign }}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`flex ${className.includes("whitespace-nowrap") ? "flex-nowrap" : "flex-wrap"} ${
          textAlign === "left"
            ? "justify-start"
            : textAlign === "right"
            ? "justify-end"
            : "justify-center"
        }`}
      >
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="whitespace-nowrap inline-block mr-[0.25em]">
            {splitType === "chars" ? (
              word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={childVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span variants={childVariants} className="inline-block">
                {word}
              </motion.span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
