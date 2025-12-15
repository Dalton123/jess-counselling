"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Keyboard,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { IoStar } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/scrollbar";
import "@styles/swiper.css";

type TestimonialType = {
  _id: string;
  quote: PortableTextBlock[];
  author: string;
  role?: string;
};

type TestimonialsCarouselData = {
  testimonials: TestimonialType[];
  desktopSlidesPerView: number;
  autoplay?: boolean;
  delay?: number;
};

type TestimonialsCarouselProps = {
  data: TestimonialsCarouselData;
};

export const TestimonialsCarousel = ({ data }: TestimonialsCarouselProps) => {
  const {
    testimonials,
    desktopSlidesPerView = 1,
    autoplay = true,
    delay = 5000,
  } = data;

  return (
    <section className="before:flower-pattern relative flex min-h-[calc(100dvh-100px)] items-center justify-center bg-teal-500 before:absolute before:inset-0 before:z-0 before:opacity-15">
      <div className="relative container mx-auto h-full px-4 py-16">
        <Swiper
          modules={[Navigation, Keyboard, Autoplay, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={desktopSlidesPerView}
          navigation={testimonials.length > 1}
          pagination={{ clickable: true }}
          autoplay={
            autoplay ? { delay: delay, disableOnInteraction: false } : false
          }
          loop={true}
          autoHeight={true}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial._id}
              className="flex h-auto justify-center pb-5"
            >
              <div className="mx-auto flex h-full w-full max-w-6xl flex-col rounded-lg text-center md:p-8">
                {/* 5 Star Rating */}
                <div className="mb-6 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-6 w-full flex-1">
                  <div className="absolute -top-6 -left-2 hidden text-9xl leading-none text-teal-100 md:block">
                    &ldquo;
                  </div>
                  <div className="prose max-w-none px-4 text-lg leading-relaxed text-teal-50">
                    <PortableText value={testimonial.quote} />
                  </div>
                  <div className="absolute right-0 -bottom-25 hidden text-9xl leading-none text-teal-100 md:block">
                    &rdquo;
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  {testimonial.author && (
                    <p className="mb-1 text-lg font-black text-teal-50">
                      {testimonial.author}
                    </p>
                  )}
                  {testimonial.role && (
                    <p className="text-sm text-teal-50">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
