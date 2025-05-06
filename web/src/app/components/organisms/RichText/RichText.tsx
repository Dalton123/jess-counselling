"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import type {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import { urlForImage } from "@sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { PortableTextBlock } from "@portabletext/react";

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
};

type SanityLinkMark = {
  _type: string;
  href: string;
  blank?: boolean;
};

type SanityInternalLinkMark = {
  _type: string;
  reference: {
    _type: string;
    _ref: string;
  };
};

type RichTextModuleData = {
  content: PortableTextBlock[];
  maxWidth?: "small" | "medium" | "large" | "full";
  textAlignment?: "left" | "center" | "right";
  padding?: "none" | "small" | "medium" | "large";
  textColor?: "dark" | "light";
};

type RichTextProps = {
  data: RichTextModuleData;
};

export const RichText = ({ data }: RichTextProps) => {
  const {
    content,
    maxWidth = "medium",
    textAlignment = "left",
    padding = "medium",
    textColor = "dark",
  } = data;

  // Map maxWidth values to tailwind classes
  const maxWidthClasses = {
    small: "max-w-prose",
    medium: "max-w-3xl",
    large: "max-w-5xl",
    full: "max-w-full",
  };

  // Map padding values to tailwind classes
  const paddingClasses = {
    none: "py-0",
    small: "py-4 md:py-8",
    medium: "py-8 md:py-16",
    large: "py-16 md:py-24",
  };

  // Map text alignment to tailwind classes
  const textAlignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Custom components for PortableText
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: { value: SanityImage }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="relative my-8 aspect-video h-auto w-full">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || ""}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        );
      },
    },
    marks: {
      link: ({
        children,
        value,
      }: PortableTextMarkComponentProps<SanityLinkMark>) => {
        const rel = !value?.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <Link
            href={value?.href || "#"}
            rel={rel}
            target={value?.blank ? "_blank" : undefined}
            className="text-teal-600 underline transition-colors hover:text-teal-800"
          >
            {children}
          </Link>
        );
      },
      internalLink: ({
        children,
        value,
      }: PortableTextMarkComponentProps<SanityInternalLinkMark>) => {
        if (!value?.reference?._ref) return <>{children}</>;
        const href = `/${value.reference._type}/${value.reference._ref}`;
        return (
          <Link
            href={href}
            className="text-teal-600 underline transition-colors hover:text-teal-800"
          >
            {children}
          </Link>
        );
      },
      highlight: ({ children }: PortableTextMarkComponentProps) => (
        <span
          className={`${textColor === "light" ? "bg-teal-600" : "bg-teal-200"} p-1`}
        >
          {children}
        </span>
      ),
      styled: ({ children }) => (
        <span className="font-serif italic">{children}</span>
      ),
      fancyText: ({ children }) => (
        <span className="fancy-text">{children}</span>
      ),
    },
  };

  return (
    <section className={classNames("w-full", paddingClasses[padding])}>
      <div
        className={classNames(
          "container mx-auto px-4",
          maxWidthClasses[maxWidth],
          textAlignmentClasses[textAlignment]
        )}
      >
        <div
          className={classNames(
            "prose max-w-none",
            textColor === "light" ? "text-teal-200" : "text-teal-900"
          )}
        >
          <PortableText value={content} components={components} />
        </div>
      </div>
    </section>
  );
};
