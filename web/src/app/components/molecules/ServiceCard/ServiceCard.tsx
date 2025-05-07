"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { Button } from "@atoms/Button/Button";
import { motion, useInView } from "framer-motion";

type ServiceCardProps = {
  title: string;
  image: string;
  imageAlt: string;
  link: { href: string; text: string };
  description: PortableTextBlock[];
  className?: string;
  animate?: boolean;
  animationDelay?: number;
};

export const ServiceCard = ({
  title,
  image,
  imageAlt,
  link,
  description,
  className = "",
  animate = true,
  animationDelay = 0,
}: ServiceCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animate && isInView ? "visible" : "hidden"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`group relative z-1 max-h-120 w-full overflow-hidden rounded-4xl bg-teal-700 after:pointer-events-none after:absolute after:inset-0 after:-z-1 after:bg-gradient-to-t after:from-teal-900 after:to-teal-500 after:opacity-30 after:transition-all after:duration-500 after:ease-in-out after:hover:scale-105 hover:after:opacity-70 ${className}`}
    >
      <div className="absolute inset-0 -z-1 aspect-square h-full w-full opacity-40 lg:relative lg:opacity-100">
        {image && typeof image === "object" && "_ref" in image ? (
          <Image
            src={urlForImage(image).url()}
            alt={imageAlt || "Service image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : image && typeof image === "string" ? (
          <Image
            src={image}
            alt={imageAlt || "Service image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-teal-100">
            <span className="text-teal-700">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="right-0 bottom-0 left-0 z-2 flex h-full flex-col items-start gap-4 p-8 transition-all duration-500 group-hover:translate-y-0 md:h-auto lg:absolute xl:translate-y-[68%] 2xl:translate-y-[65%]">
        {title && <h2 className="font-black text-teal-50">{title}</h2>}
        {description && (
          <div className="prose">
            <PortableText value={description} />
          </div>
        )}
        {link && (
          <Button href={link.href} textColor="text-slate-700">
            {link.text}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
