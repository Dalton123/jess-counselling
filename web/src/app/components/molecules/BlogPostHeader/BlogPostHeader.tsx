import React from "react";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";

type BlogPostHeaderProps = {
  title: string;
  publishedDate: string;
  author?: string;
  featuredImage?: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  tags?: string[];
};

export const BlogPostHeader = ({
  title,
  publishedDate,
  author,
  featuredImage,
  tags,
}: BlogPostHeaderProps) => {
  const formattedDate = new Date(publishedDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-teal-700">
          <time dateTime={publishedDate}>{formattedDate}</time>
          {author && (
            <>
              <span>•</span>
              <span>{author}</span>
            </>
          )}
        </div>

        <h1 className="mb-6 font-serif text-4xl font-bold text-teal-900 md:text-5xl">
          {title}
        </h1>

        {tags && tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {featuredImage?.asset && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={urlForImage(featuredImage).url()}
              alt={featuredImage.alt || title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </header>
  );
};
