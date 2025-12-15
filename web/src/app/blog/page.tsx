import React from "react";
import { Metadata } from "next";
import { client } from "@sanity/lib/client";
import { allBlogPostsQuery } from "@sanity/lib/queries";
import { BlogCard } from "@molecules/BlogCard/BlogCard";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";
import { generateBreadcrumbSchema } from "@utils/structuredData";

// Revalidate every hour
export const revalidate = 3600;

type BlogPost = {
  _id: string;
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

export async function generateMetadata(): Promise<Metadata> {
  const title = "Mental Health Blog | Wilkinson Counselling Manchester";
  const description =
    "Expert mental health insights from a BACP registered counsellor in Manchester. Articles on anxiety, depression, child therapy, and wellbeing.";
  const url = "https://www.wilkinsoncounselling.co.uk/blog/";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Wilkinson Counselling",
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: "/images/Wilkinson-counselling-OG.jpg",
          width: 1200,
          height: 630,
          alt: "Wilkinson Counselling Blog",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPage() {
  const posts: BlogPost[] = await client.fetch(allBlogPostsQuery);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.wilkinsoncounselling.co.uk/" },
    { name: "Blog", url: "https://www.wilkinsoncounselling.co.uk/blog/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
        }}
      />
      <main>
      <SectionWrapper wrapper="light">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold text-teal-900 md:text-5xl">
              Blog
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-teal-800">
              Insights and guidance on mental health, counselling, and wellbeing
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  title={post.title}
                  slug={post.slug}
                  publishedDate={post.publishedDate}
                  author={post.author}
                  excerpt={post.excerpt}
                  featuredImage={post.featuredImage}
                  tags={post.tags}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-teal-200 bg-white p-8 text-center">
              <p className="text-lg text-teal-700">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>
      </main>
    </>
  );
}
