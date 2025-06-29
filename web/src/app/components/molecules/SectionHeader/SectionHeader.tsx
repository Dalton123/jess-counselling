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
    wrapper?: "none" | "dark" | "light";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  };
  wrapper?: "none" | "dark" | "light"; // For backward compatibility
  className?: string;
  textColor?: "light" | "dark";
};

const getMaxWidthClass = (maxWidth: string) => {
  switch (maxWidth) {
    case "sm":
      return "max-w-2xl"; // 32rem
    case "md":
      return "max-w-3xl"; // 42rem
    case "lg":
      return "max-w-4xl"; // 56rem
    case "xl":
      return "max-w-6xl"; // 72rem
    case "full":
      return "max-w-full";
    default:
      return "max-w-4xl";
  }
};

export const SectionHeader = ({
  data,
  wrapper: legacyWrapper,
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
    wrapper: dataWrapper = "none",
    maxWidth = "lg",
  } = data;

  // Use wrapper from data first, then fall back to legacy wrapper prop for backward compatibility
  const activeWrapper =
    dataWrapper !== "none" ? dataWrapper : legacyWrapper || "none";

  // Determine text color based on wrapper if not explicitly set
  const activeTextColor =
    textColor || (activeWrapper === "dark" ? "light" : "dark");

  const maxWidthClass = getMaxWidthClass(maxWidth);

  return (
    <SectionWrapper
      wrapper={activeWrapper}
      className={className}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
    >
      <div className={classNames("mx-auto", maxWidthClass)}>
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
          <div className="w-full px-6 md:px-8 lg:px-12">
            {/* Gradient text */}
            {label && (
              <p className="bg-gradient-to-r from-teal-300 via-teal-500 to-green-400 bg-clip-text text-sm font-black tracking-widest text-transparent">
                / {label.toUpperCase()} /
              </p>
            )}
            {title && (
              <div
                className={classNames(
                  "prose mx-auto w-full [&>p]:px-4 md:[&>p]:px-8 lg:[&>p]:px-12 xl:[&>p]:px-16",
                  {
                    "text-white/80": activeTextColor === "light",
                    "text-teal-900": activeTextColor === "dark",
                    [maxWidthClass]: maxWidth !== "full",
                  }
                )}
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
      </div>
    </SectionWrapper>
  );
};
