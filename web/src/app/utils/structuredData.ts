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
