"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";
import { AnimatedWaves } from "@atoms/AnimatedWaves/AnimatedWaves";
import classNames from "classnames";
import { PortableText } from "@portabletext/react";
import { Button } from "@atoms/Button/Button";
import { PortableTextBlock } from "@portabletext/types";

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
  const [enableParallax, setEnableParallax] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // Delay expensive animations until after initial render
  useEffect(() => {
    // Mark as loaded for progressive enhancement
    setIsLoaded(true);

    // Parallax is low priority - only enable after everything else is loaded
    const enableParallaxTimer = setTimeout(() => {
      // Wait for page to be fully loaded and settled
      if (document.readyState === "complete") {
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );
        const hasTouch =
          "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const isLargeScreen = window.innerWidth >= 1024;

        // Only enable on large screens without touch capability
        if (isLargeScreen && !isMobile && !hasTouch) {
          setEnableParallax(true);
        }
      } else {
        // If page isn't fully loaded yet, check again later
        window.addEventListener(
          "load",
          () => {
            setTimeout(() => {
              const isMobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                );
              const hasTouch =
                "ontouchstart" in window || navigator.maxTouchPoints > 0;
              const isLargeScreen = window.innerWidth >= 1024;

              if (isLargeScreen && !isMobile && !hasTouch) {
                setEnableParallax(true);
              }
            }, 2000); // Extra delay after page load
          },
          { once: true }
        );
      }
    }, 3000); // Increased delay - 3 seconds

    return () => clearTimeout(enableParallaxTimer);
  }, []);

  // Parallax effect - only runs on desktop
  useEffect(() => {
    if (!enableParallax || !hasBackground) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking && glowRef.current) {
        requestAnimationFrame(() => {
          if (glowRef.current) {
            const x = (e.clientX / window.innerWidth - 0.5) * 3;
            const y = (e.clientY / window.innerHeight - 0.5) * 3;
            glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableParallax, hasBackground]);

  const ctaStyles = getCTAStyles(data?.ctaStyle);

  return (
    <section
      className={classNames(
        "relative m-auto mt-5 flex min-h-[calc(100dvh-140px)] w-[calc(100%-40px)] flex-col items-start justify-center overflow-hidden rounded-4xl bg-teal-50 p-4 md:p-8",
        {
          "justify-center": !hasBackground,
          // Only add border animation after load and on non-mobile
          "bg-animated-conic-border animate-rotate-border":
            isLoaded && enableParallax,
        }
      )}
    >
      {/* Simplified background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-100/80 to-teal-100/80">
        {/* Glow effect - only on desktop with parallax enabled */}
        {hasBackground && enableParallax && (
          <div
            ref={glowRef}
            className="glow-ball absolute top-1/2 left-1/2 h-full w-full opacity-70"
            style={{
              transform: "translate3d(-50%, -50%, 0)",
              willChange: "transform",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        )}

        {/* Background content */}
        <div className="absolute inset-0 z-1">
          {data?.backgroundImage ? (
            <div className="relative hidden h-full w-full overflow-hidden lg:block">
              <Image
                src={urlForImage(data.backgroundImage).url()}
                alt="Background"
                fill
                className="object-cover"
                priority
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
            "w-full max-w-3xl rounded-4xl bg-gradient-to-br from-teal-50/90 to-teal-200/70 backdrop-blur-sm md:py-8":
              hasBackground,
            "max-w-4xl md:px-8": !hasBackground,
          }
        )}
      >
        {/* Noise pattern - only add on desktop after load */}
        {hasBackground && isLoaded && enableParallax && (
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
