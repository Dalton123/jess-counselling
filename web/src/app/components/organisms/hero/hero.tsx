"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";
import { AnimatedWaves } from "@atoms/AnimatedWaves/AnimatedWaves";
import classNames from "classnames";
import { PortableText } from "@portabletext/react";
import { Button } from "@atoms/Button/Button";
import { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";

type HeroProps = {
  data: {
    tagline?: string;
    heading?: PortableTextBlock[];
    subheading?: PortableTextBlock[];
    backgroundImage?: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    showCTA?: boolean;
    link?: { href: string; text: string };
    ctaStyle?: "light" | "dark" | "teal";
  };
};

const getCTAStyles = (style: "light" | "dark" | "teal" = "light") => {
  switch (style) {
    case "dark":
      return {
        backgroundColor: "bg-slate-700",
        textColor: "text-white",
      };
    case "teal":
      return {
        backgroundColor: "bg-teal-600",
        textColor: "text-white",
      };
    case "light":
    default:
      return {
        backgroundColor: "bg-teal-50",
        textColor: "text-teal-900",
      };
  }
};

export const Hero = ({ data }: HeroProps) => {
  const hasBackground = Boolean(data?.backgroundImage);
  const [isLoaded, setIsLoaded] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // Only progressive enhancement (no parallax)
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const ctaStyles = getCTAStyles(data?.ctaStyle);

  return (
    <section
      className={classNames(
        "relative m-auto mt-5 flex min-h-[calc(100dvh-140px)] w-[calc(100%-40px)] flex-col items-start justify-center overflow-hidden rounded-4xl bg-teal-50 p-4 md:p-8",
        {
          "justify-center": !hasBackground,
          "bg-animated-conic-border animate-rotate-border": isLoaded,
        }
      )}
    >
      {/* Simplified background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-100/80 to-teal-100/80">
        {/* Glow effect - always fade in if hasBackground */}
        {hasBackground && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
          >
            <div
              ref={glowRef}
              className="glow-ball pulse absolute top-1/2 left-1/2 z-2 hidden h-full w-full opacity-70 lg:block"
            />
          </motion.div>
        )}

        {/* Background content */}
        <div className="absolute inset-0 z-1">
          {data?.backgroundImage ? (
            <div className="relative hidden h-full w-full overflow-hidden lg:block">
              <Image
                src={urlForImage(data.backgroundImage).width(1920).quality(85).url()}
                alt="Background"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-teal-200/30 opacity-50 mix-blend-multiply" />
            </div>
          ) : (
            <div className="absolute inset-0">
              <AnimatedWaves />
            </div>
          )}
        </div>
      </div>

      {/* Content - simplified structure */}
      <div
        className={classNames(
          "relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8 text-center lg:p-4",
          {
            "w-full rounded-4xl bg-gradient-to-br from-teal-50/90 to-teal-200/70 backdrop-blur-sm md:py-8 lg:max-w-3xl":
              hasBackground,
            "max-w-4xl md:px-8": !hasBackground,
          }
        )}
      >
        {/* Noise pattern - only add on desktop after load */}
        {hasBackground && (
          <div className="noise-pattern pointer-events-none absolute inset-0 -z-1 opacity-50" />
        )}

        {data?.tagline && (
          <p
            className={classNames(
              "mb-6 text-xs font-black tracking-wider uppercase md:text-lg",
              {
                "bg-gradient-to-r from-teal-600 via-teal-700 to-teal-500 bg-clip-text text-sm font-black tracking-widest text-transparent":
                  hasBackground,
                "text-gray-700": !hasBackground,
              }
            )}
          >
            / {data.tagline} /
          </p>
        )}

        {data?.heading && (
          <div className="text-teal-900">
            <PortableText
              value={data.heading}
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

        {data?.subheading && (
          <div className="mb-8 text-teal-900">
            <PortableText
              value={data.subheading}
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

        {/* CTA Button */}
        {data?.showCTA && data?.link && (
          <Button
            href={data.link.href}
            backgroundColor={ctaStyles.backgroundColor}
            textColor={ctaStyles.textColor}
            className="[&>span]:text-xl!"
          >
            {data.link.text}
          </Button>
        )}
      </div>
    </section>
  );
};
