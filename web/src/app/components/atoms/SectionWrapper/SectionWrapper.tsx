"use client";

import classNames from "classnames";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type SectionWrapperProps = {
  children: React.ReactNode;
  wrapper?: "none" | "dark" | "light";
  fullWidth?: boolean;
  className?: string;
  topSpacing?: "none" | "small" | "medium" | "large";
  bottomSpacing?: "none" | "small" | "medium" | "large";
  animate?: boolean;
  animationDelay?: number;
};

export const SectionWrapper = ({
  children,
  wrapper = "none",
  className = "",
  topSpacing = "medium",
  bottomSpacing = "medium",
  animate = true,
  animationDelay = 0,
}: SectionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={animate && isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ duration: 0.6, delay: animationDelay }}
      className={classNames(
        "container mx-auto overflow-hidden px-5",
        className,
        {
          "px-5": wrapper === "none",
          "mt-4": topSpacing === "small",
          "mt-6 md:mt-8": topSpacing === "medium",
          "mt-8 sm:mt-10 md:mt-12": topSpacing === "large",
          "mb-4": bottomSpacing === "small",
          "mb-6 md:mb-8": bottomSpacing === "medium",
          "mb-8 sm:mb-10 md:mb-12": bottomSpacing === "large",
        }
      )}
    >
      <div
        className={classNames("relative z-1 overflow-hidden rounded-4xl", {
          "before:flower-pattern bg-teal-100 bg-gradient-to-bl from-emerald-100 before:absolute before:inset-0 before:z-[-1] before:opacity-50 before:content-['']":
            wrapper === "light",
          "noise-pattern-2 bg-slate-700": wrapper === "dark",
          "py-8 md:py-10": wrapper !== "none",
        })}
      >
        {children}
      </div>
    </motion.section>
  );
};
