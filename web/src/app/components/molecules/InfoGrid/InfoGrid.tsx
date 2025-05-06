// components/InfoGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
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
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className={classNames(
              "flex flex-col items-center overflow-hidden rounded-4xl p-4 text-center",
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
        ))}
      </div>
    </SectionWrapper>
  );
};
