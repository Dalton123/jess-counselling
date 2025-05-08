"use client";
import React, { useEffect, useRef } from "react";
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
  };
};

export const Hero = ({ data }: HeroProps) => {
  const hasBackground = Boolean(data?.backgroundImage);
  const glowRef = useRef<HTMLDivElement>(null);
  const PARALLAX_INTENSITY = 5;

  useEffect(() => {
    let frame: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (glowRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * PARALLAX_INTENSITY;
          const y = (e.clientY / window.innerHeight - 0.5) * PARALLAX_INTENSITY;
          glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        frame = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={classNames(
        "bg-animated-conic-border animate-rotate-border relative m-auto mt-5 flex min-h-[calc(100dvh-140px)] w-[calc(100%-40px)] flex-col items-start justify-center overflow-hidden rounded-4xl bg-gradient-to-r from-teal-50 to-teal-50 p-4 md:p-8 lg:min-h-[calc(100dvh-140px)]",
        {
          "justify-center": !hasBackground,
        }
      )}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-1 bg-gradient-to-br from-teal-100/80 to-teal-100/80"></div>

        {hasBackground && (
          <div
            ref={glowRef}
            className="glow-ball absolute top-1/2 left-1/2 z-3 hidden h-full w-full animate-pulse opacity-70 lg:block"
            style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
          ></div>
        )}

        {/* Wave pattern */}
        <div className="absolute inset-0 z-2">
          {data?.backgroundImage ? (
            <div className="relative hidden h-full w-full overflow-hidden lg:block">
              <Image
                src={urlForImage(data.backgroundImage).url()}
                alt="Background pattern"
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-teal-200/30 opacity-50 mix-blend-multiply"
                aria-hidden="true"
              ></div>
            </div>
          ) : (
            <div className="absolute inset-0">
              <AnimatedWaves />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={classNames(
          "relative z-3 flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-4xl px-4 py-8 text-center lg:p-4",
          {
            "before:flower-pattern w-full bg-gradient-to-br from-teal-50 to-teal-200 backdrop-blur-md before:absolute before:inset-0 before:z-[-1] before:opacity-20 before:content-[''] md:from-teal-50/90 md:to-teal-200/70 md:py-8 lg:max-w-3xl":
              hasBackground,
            "max-w-4xl md:px-8": !hasBackground,
          }
        )}
      >
        <div className="noise-pattern pointer-events-none absolute inset-0 -z-1"></div>
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
        <Button backgroundColor="bg-teal-50" className="[&>span]:text-xl!">
          Get in touch
        </Button>
      </div>
    </section>
  );
};
