import React, { cache } from "react";
import { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { blogPostQuery, allBlogSlugsQuery } from "@sanity/lib/queries";
import { BlogPostHeader } from "@molecules/BlogPostHeader/BlogPostHeader";
import { RichText } from "@organisms/RichText/RichText";
import { PortableTextBlock } from "@portabletext/react";
import {
  generateBlogPostStructuredData,
  generateBreadcrumbSchema,
} from "@utils/structuredData";

// Revalidate blog posts frequently enough for newly published Sanity posts to appear without a rebuild.
export const revalidate = 300;

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

const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  return client.fetch(blogPostQuery, { slug });
});

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await client.fetch<{ slug: string }[]>(allBlogSlugsQuery);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Allow new Sanity blog posts to render on demand instead of requiring a redeploy for generateStaticParams.
export const dynamicParams = true;

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPost(params.slug);

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

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const post = await getBlogPost(params.slug);

  if (!post) {
    return (
      <main
        id="main-content"
        className="container mx-auto !max-w-6xl px-4 py-16"
      >
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
  const breadcrumbData = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.wilkinsoncounselling.co.uk/" },
    { name: "Blog", url: "https://www.wilkinsoncounselling.co.uk/blog/" },
    {
      name: post.title,
      url: `https://www.wilkinsoncounselling.co.uk/blog/${post.slug}/`,
    },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content">
        <article className="mx-auto !max-w-6xl py-8 md:py-16">
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
