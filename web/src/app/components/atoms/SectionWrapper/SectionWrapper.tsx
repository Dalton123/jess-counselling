import classNames from "classnames";
import React from "react";

type SectionWrapperProps = {
  children: React.ReactNode;
  wrapper?: "none" | "dark" | "light";
  fullWidth?: boolean;
  className?: string;
  topSpacing?: "none" | "small" | "medium" | "large";
  bottomSpacing?: "none" | "small" | "medium" | "large";
};

export const SectionWrapper = ({
  children,
  wrapper = "none",
  className = "",
  topSpacing = "medium",
  bottomSpacing = "medium",
}: SectionWrapperProps) => {
  return (
    <section
      className={classNames(
        "container mx-auto overflow-hidden px-5",
        className,
        {
          "px-5": wrapper === "none",
          "mt-4": topSpacing === "small",
          "mt-8": topSpacing === "medium",
          "mt-2 sm:mt-8 md:mt-12": topSpacing === "large",
          "mb-4": bottomSpacing === "small",
          "mb-8": bottomSpacing === "medium",
          "mb-2 sm:mb-8 md:mb-12": bottomSpacing === "large",
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
    </section>
  );
};
