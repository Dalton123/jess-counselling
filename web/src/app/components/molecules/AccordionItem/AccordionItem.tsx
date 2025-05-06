import React from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

type AccordionItemProps = {
  title: string;
  content: PortableTextBlock[];
  isOpen?: boolean;
  toggleOpen: (index: number) => void;
  index: number;
  textColor?: "light" | "dark";
};

export const AccordionItem = ({
  title,
  content,
  isOpen = false,
  toggleOpen,
  index,
  textColor = "dark",
}: AccordionItemProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={classNames(
          "border-b border-white shadow-md transition-colors duration-200",
          {
            "bg-teal-100 hover:bg-teal-200/80": textColor === "dark",
            "bg-teal-900 hover:bg-teal-800/80": textColor === "light",
          }
        )}
      >
        <button
          className={classNames(
            "flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left font-medium",
            {
              "text-teal-50": textColor === "light",
              "text-teal-900": textColor === "dark",
            }
          )}
          onClick={() => toggleOpen(index)}
        >
          <span className="text-xl font-black">{title}</span>
          <svg
            className={classNames("h-6 w-6 transform transition-transform", {
              "rotate-180": isOpen,
            })}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={classNames(
            "overflow-hidden pr-4 transition-all duration-300",
            {
              "max-h-0": !isOpen,
              "max-h-screen pb-6": isOpen,
              "text-teal-50": textColor === "light",
              "text-teal-900": textColor === "dark",
            }
          )}
        >
          <div className="prose max-w-none px-6 py-2">
            <PortableText value={content} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
