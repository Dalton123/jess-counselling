import React from "react";
import { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { blogPostQuery, allBlogSlugsQuery } from "@sanity/lib/queries";
import { BlogPostHeader } from "@molecules/BlogPostHeader/BlogPostHeader";
import { RichText } from "@organisms/RichText/RichText";
import { PortableTextBlock } from "@portabletext/react";
import { generateBlogPostStructuredData } from "@utils/structuredData";

// Revalidate every hour
export const revalidate = 3600;

type BlogPost = {
  title: string;
  slug: string;
  publishedDate: string;
  _updatedAt: string;
  author?: string;
  excerpt?: string;
  metaDescription?: string;
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
  content: PortableTextBlock[];
  tags?: string[];
};

type Params = {
  slug: string;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await client.fetch<{ slug: string }[]>(allBlogSlugsQuery);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const params = await props.params;
  const post: BlogPost | null = await client.fetch(blogPostQuery, {
    slug: params.slug,
  });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${post.title} | Wilkinson Counselling`;
  const description = post.metaDescription || post.excerpt || post.title;
  const url = `https://www.wilkinsoncounselling.co.uk/blog/${post.slug}/`;

  // Use featured image if available, otherwise fallback to default OG image
  const ogImage = post.featuredImage?.asset?.url
    ? post.featuredImage.asset.url
    : "/images/Wilkinson-counselling-OG.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "Wilkinson Counselling",
      locale: "en_GB",
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post._updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || post.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const post: BlogPost | null = await client.fetch(blogPostQuery, {
    slug: params.slug,
  });

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-red-900">
            Post Not Found
          </h1>
          <p className="text-red-800">
            The requested blog post could not be found.
          </p>
        </div>
      </main>
    );
  }

  const structuredData = generateBlogPostStructuredData(post);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <main>
        <article className="py-8 md:py-16">
          <BlogPostHeader
            title={post.title}
            publishedDate={post.publishedDate}
            author={post.author}
            featuredImage={post.featuredImage}
            tags={post.tags}
          />

          <RichText
            data={{
              content: post.content,
              maxWidth: "medium",
              textAlignment: "left",
              padding: "small",
              textColor: "dark",
            }}
          />
        </article>
      </main>
    </>
  );
}
