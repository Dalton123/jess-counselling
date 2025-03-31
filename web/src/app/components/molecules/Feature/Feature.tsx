import Image from "next/image";
import { Button } from "../../atoms/Button/Button";
import { urlForImage } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
import { SectionHeader } from "@molecules/SectionHeader/SectionHeader";
import classNames from "classnames";

type SectionHeaderData = {
  label: string;
  title: PortableTextBlock[];
  viewAllLink?: string;
  viewAllText?: string;
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
    buttonText?: string;
    buttonLink: string;
    reversed?: boolean;
    showSectionHeader: boolean;
    sectionHeader?: SectionHeaderData;
    wrapper: "none" | "dark" | "light";
    fullWidth?: boolean;
  };
};

export const Feature = ({ data }: FeatureProps) => {
  const {
    title,
    description,
    image,
    imageAlt,
    buttonText = "READ MORE",
    buttonLink,
    reversed = false,
    showSectionHeader = false,
    sectionHeader,
    wrapper = "light",
    fullWidth = false,
  } = data;

  return (
    <div
      className={classNames("mx-auto mb-6 px-4 md:mb-8", {
        container: wrapper === "none" && !fullWidth,
        "py-20": wrapper !== "none",
        "w-[calc(100%-40px)] rounded-4xl bg-slate-700": wrapper === "dark",
        "w-[calc(100%-40px)] rounded-4xl bg-gradient-to-bl from-emerald-100 to-teal-100":
          wrapper === "light",
      })}
    >
      {showSectionHeader && sectionHeader && (
        <SectionHeader
          data={{
            label: sectionHeader.label,
            title: sectionHeader.title,
            viewAllLink: sectionHeader.viewAllLink,
            viewAllText: sectionHeader.viewAllText,
          }}
          wrapper={wrapper}
        />
      )}

      <div
        className={classNames("", {
          "container mx-auto px-4": wrapper !== "none",
        })}
      >
        <div
          className={classNames(
            "flex min-h-[475px] flex-col overflow-hidden rounded-4xl",
            {
              "md:flex-row-reverse": reversed,
              "md:flex-row": !reversed,
              "min-h-[500px] md:min-h-[700px] lg:min-h-[900px]": fullWidth,
              "min-h-[475px]": !fullWidth,
            }
          )}
        >
          {/* Content Section */}
          <div
            className={classNames(
              "flex flex-col items-start justify-center gap-4 p-12 md:w-1/2 md:gap-8",
              {
                "bg-slate-700": wrapper === "light" || wrapper === "none",
                "bg-white": wrapper === "dark",
              }
            )}
          >
            {title && (
              <h2 className="bg-gradient-to-r from-emerald-400 via-teal-400 to-teal-200 bg-clip-text font-serif text-6xl leading-tight text-transparent italic">
                {title}
              </h2>
            )}
            {description && (
              <div
                className={classNames("text-balance", {
                  "text-white/80": wrapper === "light" || wrapper === "none",
                  "text-slate-700": wrapper === "dark",
                })}
              >
                <PortableText value={description} />
              </div>
            )}
            {buttonText && (
              <Button
                href={buttonLink}
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
                {buttonText}
              </Button>
            )}
          </div>

          {/* Image Section */}
          {image && (
            <div
              className={classNames("relative min-h-[300px]", {
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
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-teal-400/80"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
