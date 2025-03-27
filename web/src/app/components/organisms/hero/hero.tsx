import React from "react";
import Image from "next/image";

type HeroProps = {
  tagline?: string;
  heading?: string;
  subheading?: string;
  ctaText: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
};

export const Hero = ({
  tagline = "FOCUSING ON THE UNIQUE NEEDS OF EACH PERSON",
  heading = "Personalized Support for Your Unique Journey",
  subheading = "Your journey to wellness starts with personalized care and support",
  ctaText = "GET STARTED NOW",
  onCtaClick = () => {},
  backgroundImage,
}: HeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden p-8 bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 to-purple-100/80 z-1"></div>

        {/* Wave pattern */}
        <div className="absolute inset-0 opacity-60 z-2">
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              alt="Background pattern"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover opacity-60"></div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl text-center z-10 px-4 md:px-8">
        {tagline && (
          <p className="text-sm md:text-base uppercase tracking-wider text-gray-700 mb-6 font-medium">
            / {tagline} /
          </p>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-gray-800 font-bold">
          <span>{heading.split(" for ")[0]}</span>
          {heading.includes(" for ") && (
            <>
              <span> for </span>
              <span className="font-serif italic font-medium">
                Your Unique Journey
              </span>
            </>
          )}
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-600 max-w-2xl mx-auto">
          {subheading}
        </p>

        <button
          className="bg-white text-gray-700 rounded-full w-48 h-48 md:w-56 md:h-56 flex items-center justify-center uppercase text-sm md:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 mx-auto"
          onClick={onCtaClick}
          aria-label={ctaText}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};
