import { PortableTextBlock } from "@portabletext/react";

type AccordionItem = {
  title: string;
  content: PortableTextBlock[];
};

type PageComponent = {
  _type: string;
  items?: AccordionItem[];
  [key: string]: unknown;
};

type PageData = {
  title: string;
  description?: string;
  content?: PageComponent[];
};

type BlogPostData = {
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
    };
    alt?: string;
  };
};

function extractTextFromPortableText(blocks: PortableTextBlock[]): string {
  return blocks
    .filter((block) => block._type === "block")
    .map((block) =>
      block.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.map((child: any) => child.text)
        .join("")
    )
    .join(" ")
    .trim();
}

export function generateStructuredData(page: PageData, slug: string) {
  const accordions =
    page.content?.filter((component) => component._type === "accordion") || [];

  if (accordions.length === 0) {
    return null;
  }

  const questions = accordions.flatMap(
    (accordion) =>
      accordion.items?.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: extractTextFromPortableText(item.content),
        },
      })) || []
  );

  if (questions.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `https://www.wilkinsoncounselling.co.uk/${slug}/`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: questions,
    },
  };
}

export function generateBlogPostStructuredData(post: BlogPostData) {
  const description = post.metaDescription || post.excerpt || post.title;
  const imageUrl = post.featuredImage?.asset?.url || "/images/Wilkinson-counselling-OG.jpg";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: description,
    image: imageUrl,
    datePublished: post.publishedDate,
    dateModified: post._updatedAt,
    author: {
      "@type": "Person",
      name: post.author || "Jessica Wilkinson",
    },
    publisher: {
      "@type": "Organization",
      name: "Wilkinson Counselling",
      logo: {
        "@type": "ImageObject",
        url: "https://www.wilkinsoncounselling.co.uk/images/Wilkinson-counselling-OG.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.wilkinsoncounselling.co.uk/blog/${post.slug}/`,
    },
  };
}

/**
 * LocalBusiness/ProfessionalService schema for local SEO
 * Helps with "counselling Manchester" and similar local searches
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.wilkinsoncounselling.co.uk/#organization",
    name: "Wilkinson Counselling",
    alternateName: "Jessica Wilkinson Counselling",
    description:
      "Professional counselling services for adults, children, and young people in Manchester and online throughout the UK. BACP registered counsellor offering person-centred therapy, CBT, and solution-focused approaches.",
    url: "https://www.wilkinsoncounselling.co.uk",
    image: "https://www.wilkinsoncounselling.co.uk/images/Wilkinson-counselling-OG.jpg",
    logo: {
      "@type": "ImageObject",
      url: "https://www.wilkinsoncounselling.co.uk/images/Wilkinson-counselling-OG.jpg",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Higher Blackley",
      addressRegion: "Manchester",
      addressCountry: "GB",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Manchester",
      },
      {
        "@type": "AdministrativeArea",
        name: "Greater Manchester",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
        description: "Online/remote counselling sessions available UK-wide",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Counselling Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Adult Counselling",
            description:
              "Person-centred counselling for adults dealing with anxiety, depression, relationship issues, grief, and more.",
            url: "https://www.wilkinsoncounselling.co.uk/adults/",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Children and Young People Therapy",
            description:
              "Specialised therapy for children and adolescents in a safe, supportive environment.",
            url: "https://www.wilkinsoncounselling.co.uk/children-young-people-therapy/",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Online Counselling",
            description:
              "Remote counselling sessions available throughout the UK via secure video call.",
          },
        },
      ],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Bank Transfer, Card",
    memberOf: {
      "@type": "Organization",
      name: "British Association for Counselling and Psychotherapy",
      alternateName: "BACP",
      url: "https://www.bacp.co.uk",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Registration",
      recognizedBy: {
        "@type": "Organization",
        name: "British Association for Counselling and Psychotherapy",
      },
    },
  };
}

/**
 * WebSite schema for site-level structured data
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wilkinson Counselling",
    url: "https://www.wilkinsoncounselling.co.uk",
    description:
      "Professional counselling services in Manchester and online throughout the UK. BACP registered therapist for adults, children and young people.",
    publisher: {
      "@id": "https://www.wilkinsoncounselling.co.uk/#organization",
    },
  };
}

/**
 * Breadcrumb schema for better SERP appearance
 */
type BreadcrumbItem = {
  name: string;
  url: string;
};

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
