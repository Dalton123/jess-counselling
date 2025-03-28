"use client";
import React from "react";
import Image from "next/image";
import { AnimatedWaves } from "@atoms/AnimatedWaves/AnimatedWaves";

type HeroProps = {
  data?: any;
};

export const Hero = ({
  data,
}: HeroProps) => {
  return (
    <section className="relative h-[calc(100dvh-40px)] my-5 flex items-center justify-center overflow-hidden p-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-4xl">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 to-purple-100/80 z-10"></div>

        {/* Wave pattern */}
        <div className="absolute inset-0 opacity-60 z-20">
          {data.backgroundImage ? (
            <Image
              src={data.backgroundImage}
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
      <div className="relative max-w-4xl text-center z-30 px-4 md:px-8">
        {data.tagline && (
          <p className="text-sm md:text-base uppercase tracking-wider text-gray-700 mb-6 font-medium">
            / {data.tagline} /
          </p>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-gray-800 font-bold">
          <span>{data.heading.split(" for ")[0]}</span>
          {data.heading.includes(" for ") && (
            <>
              <span> for </span>
              <span className="font-serif italic font-medium">
                Your Unique Journey
              </span>
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-600 max-w-2xl mx-auto">
          {data.subheading}
        </p>
      </div>
    </section>
  );
};
