import Image from "next/image";
import { Button } from "@atoms/Button/Button";
import { urlForImage } from "@sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
import { SectionHeader } from "@molecules/SectionHeader/SectionHeader";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";
import classNames from "classnames";

type SectionHeaderData = {
  label: string;
  title: PortableTextBlock[];
  viewAllLink?: { href: string; text: string };
  wrapper: "none" | "dark" | "light";
};

type FeatureProps = {
  data: {
    title: string;
    description: PortableTextBlock[];
    image?: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    imageAlt: string;
    link?: { href: string; text: string };
    reversed?: boolean;
    showSectionHeader: boolean;
    sectionHeader?: SectionHeaderData;
    wrapper: "none" | "dark" | "light";
    fullWidth?: boolean;
    topSpacing?: "none" | "small" | "medium" | "large";
    bottomSpacing?: "none" | "small" | "medium" | "large";
    animate?: boolean;
    animationDelay?: number;
  };
};

export const Feature = ({ data }: FeatureProps) => {
  const {
    title,
    description,
    image,
    imageAlt,
    link,
    reversed = false,
    showSectionHeader = false,
    sectionHeader,
    wrapper = "light",
    fullWidth = false,
    topSpacing = "medium",
    bottomSpacing = "medium",
    animate,
    animationDelay,
  } = data;

  return (
    <SectionWrapper
      wrapper={wrapper}
      fullWidth={fullWidth}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      animate={animate}
      animationDelay={animationDelay}
    >
      {showSectionHeader && sectionHeader && (
        <SectionHeader
          data={sectionHeader}
          wrapper="none"
          textColor={wrapper === "dark" ? "light" : "dark"}
        />
      )}

      <div
        className={classNames("", {
          "container mx-auto px-5 md:px-10": wrapper !== "none",
        })}
      >
        <div
          className={classNames("flex flex-col overflow-hidden rounded-4xl", {
            "md:flex-row-reverse": reversed,
            "md:flex-row": !reversed,
            "min-h-[500px] md:min-h-[700px] lg:min-h-[900px]": fullWidth,
            "min-h-[475px] md:min-h-[600px] lg:min-h-[750px]": !fullWidth,
          })}
        >
          {/* Content Section */}
          <div
            className={classNames(
              "noise-pattern-2 flex flex-col items-start justify-center py-8 pr-4 pl-6 md:w-1/2 md:p-12",
              {
                "bg-slate-700": wrapper === "light" || wrapper === "none",
                "bg-teal-50": wrapper === "dark",
              }
            )}
          >
            <div
              className={classNames("prose", {
                "text-white/80": wrapper === "light" || wrapper === "none",
                "text-slate-700": wrapper === "dark",
              })}
            >
              {title && <h2 className="fancy-text">{title}</h2>}
              {description && <PortableText value={description} />}
              {link && (
                <Button
                  href={link.href}
                  backgroundColor={
                    wrapper === "light" || wrapper === "none"
                      ? "bg-slate-700"
                      : "bg-white"
                  }
                  textColor={
                    wrapper === "light" || wrapper === "none"
                      ? "text-white"
                      : "text-slate-700"
                  }
                >
                  {link.text}
                </Button>
              )}
            </div>
          </div>

          {/* Image Section */}
          {image && (
            <div
              className={classNames("relative min-h-[300px] overflow-hidden", {
                "md:w-1/2": !fullWidth,
                "md:w-4/6 lg:w-5/6": fullWidth,
              })}
            >
              <Image
                src={urlForImage(image).url()}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 w-[200%] bg-gradient-to-br from-transparent to-teal-400/80"></div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};
