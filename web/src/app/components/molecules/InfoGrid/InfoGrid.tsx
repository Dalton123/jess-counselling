// components/InfoGrid.tsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { SectionHeader } from "@molecules/SectionHeader/SectionHeader";
import { urlForImage } from "@sanity/lib/client";
import classNames from "classnames";

export type Step = {
  icon: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: PortableTextBlock[];
};

type SectionHeaderData = {
  label: string;
  title: PortableTextBlock[];
  viewAllLink?: { href: string; text: string };
  wrapper: "none" | "dark" | "light";
};

export type InfoGridProps = {
  data: {
    steps: Step[];
    showSectionHeader: boolean;
    sectionHeader?: SectionHeaderData;
    wrapper: "none" | "dark" | "light";
    fullWidth?: boolean;
    topSpacing?: "none" | "small" | "medium" | "large";
    bottomSpacing?: "none" | "small" | "medium" | "large";
  };
};

// New internal component for animated grid items
const AnimatedGridItem = ({
  step,
  idx,
  wrapper,
}: {
  step: Step;
  idx: number;
  wrapper: "none" | "dark" | "light";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      key={idx}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className={classNames(
        "flex flex-col items-center overflow-hidden rounded-4xl p-4 text-center md:p-6 xl:p-8",
        {
          "bg-teal-100": wrapper === "light" || wrapper === "none",
          "bg-teal-900": wrapper === "dark",
        }
      )}
    >
      {step.icon && (
        <div className="mb-4 h-16 w-16">
          <Image
            src={urlForImage(step.icon).url()}
            alt="Info icon"
            className="h-full w-full object-contain"
            width={64}
            height={64}
          />
        </div>
      )}
      {step.description && (
        <div className="prose">
          <PortableText value={step.description} />
        </div>
      )}
    </motion.div>
  );
};

export const InfoGrid = ({ data }: InfoGridProps) => {
  const {
    steps,
    showSectionHeader,
    sectionHeader,
    wrapper,
    fullWidth,
    topSpacing,
    bottomSpacing,
  } = data;

  return (
    <SectionWrapper
      wrapper={wrapper}
      fullWidth={fullWidth}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
    >
      {showSectionHeader && sectionHeader && (
        <SectionHeader
          data={sectionHeader}
          wrapper="none"
          textColor={wrapper === "dark" ? "light" : "dark"}
        />
      )}
      <div
        className={classNames(
          "container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
          {
            "text-teal-50": wrapper === "dark",
            "text-teal-900": wrapper === "light" || wrapper === "none",
          }
        )}
      >
        {steps?.map((step, idx) => (
          <AnimatedGridItem key={idx} step={step} idx={idx} wrapper={wrapper} />
        ))}
      </div>
    </SectionWrapper>
  );
};
