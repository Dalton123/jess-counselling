import { Button } from "@atoms/Button/Button";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";
import classNames from "classnames";

type SectionHeaderProps = {
  data: {
    label: string;
    title: PortableTextBlock[];
    styledTitle?: string;
    link?: { href: string; text: string };
    buttonHorizontalPosition?: "left" | "center" | "right";
    buttonVerticalPosition?: "top" | "center" | "bottom";
    textAlignment?: "left" | "center" | "right";
    topSpacing?: "none" | "small" | "medium" | "large";
    bottomSpacing?: "none" | "small" | "medium" | "large";
  };
  wrapper: "none" | "dark" | "light";
  className?: string;
  textColor?: "light" | "dark";
};

export const SectionHeader = ({
  data,
  wrapper = "none",
  className = "",
  textColor,
}: SectionHeaderProps) => {
  const {
    label,
    title,
    link,
    textAlignment = "center",
    buttonHorizontalPosition = "center",
    buttonVerticalPosition = "center",
    topSpacing = "medium",
    bottomSpacing = "small",
  } = data;
  return (
    <SectionWrapper
      wrapper={wrapper}
      className={className}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
    >
      <div
        className={classNames("flex flex-col gap-4", {
          "text-left": textAlignment === "left",
          "text-center": textAlignment === "center",
          "text-right": textAlignment === "right",
          "items-start justify-start": buttonHorizontalPosition === "left",
          "justify-center text-center md:flex-col":
            buttonHorizontalPosition === "center",
          "justify-between md:flex-row": buttonHorizontalPosition === "right",
          "items-start": buttonVerticalPosition === "top",
          "items-center": buttonVerticalPosition === "center",
          "items-end": buttonVerticalPosition === "bottom",
        })}
      >
        <div>
          {/* Gradient text */}
          {label && (
            <p className="bg-gradient-to-r from-teal-300 via-teal-500 to-green-400 bg-clip-text text-sm font-black tracking-widest text-transparent">
              / {label.toUpperCase()} /
            </p>
          )}
          {title && (
            <div
              className={classNames("prose", {
                "text-white/80": wrapper === "dark" || textColor === "light",
                "text-teal-900":
                  wrapper === "light" ||
                  (wrapper === "none" && textColor !== "light"),
              })}
            >
              <PortableText
                value={title}
                components={{
                  marks: {
                    styled: ({ children }) => (
                      <span className="font-serif italic">{children}</span>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>

        {link && <Button href={link.href}>{link.text}</Button>}
      </div>
    </SectionWrapper>
  );
};
