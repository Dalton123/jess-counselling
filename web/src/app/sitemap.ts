import { MetadataRoute } from "next";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";

const baseUrl = "https://www.wilkinsoncounselling.co.uk";

// Query to get all published pages
const pagesQuery = groq`*[_type == "page" && published == true && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`;

// Query to get all published blog posts
const blogPostsQuery = groq`*[_type == "blogPost" && published == true && defined(slug.current)] {
  "slug": slug.current,
  publishedDate
}`;

type PageData = {
  slug: string;
  _updatedAt: string;
};

type BlogPostData = {
  slug: string;
  publishedDate: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch published pages from Sanity
    const pages: PageData[] = await client.fetch(pagesQuery);
    const blogPosts: BlogPostData[] = await client.fetch(blogPostsQuery);

    // Create sitemap entries for dynamic pages (excluding home and hardcoded pages)
    const pageUrls = pages
      .filter(
        (page: PageData) =>
          page.slug !== "home" &&
          page.slug !== "adults" &&
          page.slug !== "children-young-people-therapy" &&
          page.slug !== "contact"
      )
      .map((page: PageData) => ({
        url: `${baseUrl}/${page.slug}/`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    // Create sitemap entries for blog posts
    const blogUrls = blogPosts.map((post: BlogPostData) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Static pages and homepage
    const staticUrls = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/adults/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/children-young-people-therapy/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];

    // Filter out duplicate pages (e.g., if "home" exists in Sanity, exclude it)
    const filteredPageUrls = pageUrls;

    return [...staticUrls, ...filteredPageUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static pages if there's an error
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/adults/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/children-young-people-therapy/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog/`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];
  }
}
