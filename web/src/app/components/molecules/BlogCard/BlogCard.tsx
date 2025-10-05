import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";

type BlogCardProps = {
  title: string;
  slug: string;
  publishedDate: string;
  author?: string;
  excerpt?: string;
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

export const BlogCard = ({
  title,
  slug,
  publishedDate,
  author,
  excerpt,
  featuredImage,
  tags,
}: BlogCardProps) => {
  const formattedDate = new Date(publishedDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-lg border border-teal-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {featuredImage?.asset && (
        <Link href={`/blog/${slug}`} className="block">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={urlForImage(featuredImage).width(800).quality(85).url()}
              alt={featuredImage.alt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-sm text-teal-700">
          <time dateTime={publishedDate}>{formattedDate}</time>
          {author && (
            <>
              <span>•</span>
              <span>{author}</span>
            </>
          )}
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="mb-3 font-serif text-2xl font-bold text-teal-900 transition-colors group-hover:text-teal-700">
            {title}
          </h3>
        </Link>

        {excerpt && <p className="mb-4 text-teal-800">{excerpt}</p>}

        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center text-sm font-semibold text-teal-600 transition-colors hover:text-teal-800"
        >
          Read more
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};
