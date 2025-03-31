import { Button } from "@atoms/Button/Button";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
import classNames from "classnames";

type SectionHeaderProps = {
  data: {
    label: string;
    title: PortableTextBlock[];
    styledTitle?: string;
    viewAllLink?: string;
    viewAllText?: string;
  };
  wrapper: "none" | "dark" | "light";
};

export const SectionHeader = ({
  data,
  wrapper = "none",
}: SectionHeaderProps) => {
  const { label, title, viewAllLink, viewAllText } = data;
  return (
    <div
      className={classNames(
        "container mx-auto mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-center",
        {
          "justify-between": viewAllLink,
          "justify-center text-center": !viewAllLink,
        }
      )}
    >
      <div>
        {/* Gradient text */}
        {label && (
          <p className="mt-3 bg-gradient-to-r from-teal-300 via-teal-500 to-green-400 bg-clip-text text-sm font-black tracking-widest text-transparent">
            / {label.toUpperCase()} /
          </p>
        )}
        {title && (
          <div
            className={classNames("text-balance", {
              "text-white/80": wrapper === "dark",
              "text-slate-700": wrapper === "light" || wrapper === "none",
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

      {viewAllLink && <Button href={viewAllLink}>{viewAllText}</Button>}
    </div>
  );
};
