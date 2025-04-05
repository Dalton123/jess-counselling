"use client";
import React from "react";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";
import { AnimatedWaves } from "@atoms/AnimatedWaves/AnimatedWaves";

type HeroProps = {
  data?: any;
};

export const Hero = ({ data }: HeroProps) => {
  return (
    <section className="relative m-auto mt-5 flex h-[calc(100dvh-40px)] w-[calc(100%-40px)] items-center justify-center overflow-hidden rounded-4xl bg-gradient-to-r from-teal-50 to-teal-50 p-8">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-teal-100/80 to-teal-100/80"></div>

        {/* Wave pattern */}
        <div className="absolute inset-0 z-20 opacity-60">
          {data.backgroundImage ? (
            <Image
              src={urlForImage(data.backgroundImage).url()}
              alt="Background pattern"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0">
              <AnimatedWaves />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-4xl px-4 text-center md:px-8">
        {data.tagline && (
          <p className="mb-6 text-sm font-medium tracking-wider text-gray-700 uppercase md:text-base">
            / {data.tagline} /
          </p>
        )}

        <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-800 md:text-5xl lg:text-6xl">
          <span>{data.heading.split(" for ")[0]}</span>
          {data.heading.includes(" for ") && (
            <>
              <span> for </span>
              <span className="font-serif font-medium italic">
                Your Unique Journey
              </span>
            </>
          )}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
          {data.subheading}
        </p>
      </div>
    </section>
  );
};
