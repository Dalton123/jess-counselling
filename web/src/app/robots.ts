import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.wilkinsoncounselling.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio/", // Disallow Sanity Studio
        "/api/", // Disallow API routes
        "/_next/", // Disallow Next.js internal files
        "/favicon.ico", // Disallow favicon from being indexed
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
