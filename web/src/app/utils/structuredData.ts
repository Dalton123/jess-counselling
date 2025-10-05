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
