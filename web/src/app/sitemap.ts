import { MetadataRoute } from "next";
import { client } from "@sanity/lib/client";
import { groq } from "next-sanity";

const baseUrl = "https://wilkinsoncounselling.co.uk";

// Query to get all published pages
const pagesQuery = groq`*[_type == "page" && published == true && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`;

type PageData = {
  slug: string;
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch published pages from Sanity
    const pages: PageData[] = await client.fetch(pagesQuery);

    // Create sitemap entries for dynamic pages
    const pageUrls = pages.map((page: PageData) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Static pages and homepage
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/adults`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/children-young-people-therapy`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];

    // Filter out duplicate pages (e.g., if "home" exists in Sanity, exclude it)
    const filteredPageUrls = pageUrls.filter(
      (page) =>
        !page.url.endsWith("/home") &&
        !page.url.endsWith("/adults") &&
        !page.url.endsWith("/children-young-people-therapy") &&
        !page.url.endsWith("/contact")
    );

    return [...staticUrls, ...filteredPageUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static pages if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/adults`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/children-young-people-therapy`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];
  }
}
