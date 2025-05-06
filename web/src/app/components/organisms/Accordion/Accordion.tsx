"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";
import { SectionHeader } from "@molecules/SectionHeader/SectionHeader";
import { AccordionItem } from "@molecules/AccordionItem/AccordionItem";
import { PortableTextBlock } from "@portabletext/react";

type AccordionItem = {
  _key: string;
  title: string;
  content: PortableTextBlock[];
};

type AccordionData = {
  showSectionHeader: boolean;
  header?: {
    label: string;
    title: PortableTextBlock[];
    viewAllLink?: { href: string; text: string };
    textAlignment?: "left" | "center" | "right";
  };
  items: AccordionItem[];
  wrapper?: "none" | "dark" | "light";
  topSpacing?: "small" | "medium" | "large";
  bottomSpacing?: "small" | "medium" | "large";
  allowMultipleOpen?: boolean;
};

export const Accordion = ({ data }: { data: AccordionData }) => {
  const {
    showSectionHeader = false,
    header,
    items = [],
    wrapper = "none",
    topSpacing = "medium",
    bottomSpacing = "medium",
    allowMultipleOpen = false,
  } = data;

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleOpen = (index: number) => {
    if (allowMultipleOpen) {
      setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      );
    } else {
      setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index) ? [] : [index]
      );
    }
  };

  const textColor = wrapper === "dark" ? "light" : "dark";

  return (
    <SectionWrapper
      wrapper={wrapper}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
    >
      {showSectionHeader && header && (
        <SectionHeader data={header} wrapper={wrapper} />
      )}

      <div className="container mx-auto rounded-lg">
        {items.map((item, index) => (
          <AccordionItem
            key={item._key}
            title={item.title}
            content={item.content}
            isOpen={openIndexes.includes(index)}
            toggleOpen={toggleOpen}
            index={index}
            textColor={textColor}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
