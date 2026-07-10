import { MetadataRoute } from "next";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";

export const revalidate = 300;

const baseUrl = "https://www.wilkinsoncounselling.co.uk";

const pagesQuery = groq`*[_type == "page" && published == true && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`;

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

const staticUrls: MetadataRoute.Sitemap = [
  {
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${baseUrl}/adults/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${baseUrl}/children-young-people-therapy/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${baseUrl}/contact/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/blog/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/privacy-policy/`,
    lastModified: new Date("2026-07-10"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [pages, blogPosts] = await Promise.all([
      client.fetch<PageData[]>(pagesQuery),
      client.fetch<BlogPostData[]>(blogPostsQuery),
    ]);

    const pageUrls: MetadataRoute.Sitemap = pages
      .filter(
        (page) =>
          page.slug !== "home" &&
          page.slug !== "adults" &&
          page.slug !== "children-young-people-therapy" &&
          page.slug !== "contact"
      )
      .map((page) => ({
        url: `${baseUrl}/${page.slug}/`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.publishedDate),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticUrls, ...pageUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticUrls;
  }
}
