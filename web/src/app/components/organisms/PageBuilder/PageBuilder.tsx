import { cache } from "react";
import { notFound } from "next/navigation";
import { ComponentSelector } from "@organisms/ComponentSelector/ComponentSelector";
import { client } from "@sanity/lib/client";
import { pageQuery, allPagesQuery } from "@sanity/lib/queries";

type PageComponent = {
  _type: string;
  [key: string]: unknown;
};

type PageData = {
  title: string;
  description?: string;
  content?: PageComponent[];
  slug?: {
    current: string;
  };
};

type PageBuilderProps = {
  slug: string;
};

type PortableHeadingBlock = {
  _key?: string;
  _type: "block";
  style?: string;
  children?: Array<{
    _key?: string;
    _type: "span";
    marks?: string[];
    text: string;
  }>;
  markDefs?: unknown[];
};

const pageHeadingFallbacks: Record<string, string> = {
  contact: "Contact Wilkinson Counselling",
  faq: "Frequently asked questions",
};

const containsPrimaryHeading = (value: unknown): boolean => {
  if (Array.isArray(value)) return value.some(containsPrimaryHeading);
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;
  if (record.style === "h1") return true;

  return Object.values(record).some(containsPrimaryHeading);
};

const addPrimaryHeading = (
  content: PageComponent[],
  headingText: string
): PageComponent[] => {
  const sectionHeaderIndex = content.findIndex(
    (component) => component._type === "sectionHeader"
  );

  if (sectionHeaderIndex === -1) return content;

  return content.map((component, index) => {
    if (index !== sectionHeaderIndex) return component;

    const title = Array.isArray(component.title)
      ? (component.title as PortableHeadingBlock[])
      : [];
    const firstHeadingIndex = title.findIndex((block) =>
      /^h[1-6]$/.test(block.style || "")
    );

    const normalizedTitle = title.map((block, blockIndex) =>
      blockIndex === firstHeadingIndex ? { ...block, style: "h1" } : block
    );

    if (firstHeadingIndex === -1) {
      normalizedTitle.unshift({
        _key: "page-primary-heading",
        _type: "block",
        style: "h1",
        markDefs: [],
        children: [
          {
            _key: "page-primary-heading-text",
            _type: "span",
            marks: [],
            text: headingText,
          },
        ],
      });
    }

    return { ...component, title: normalizedTitle };
  });
};

export const getPageData = cache(
  async (slug: string): Promise<PageData | null> => {
    try {
      const data = await client.fetch(pageQuery, { slug });

      return data;
    } catch (error) {
      console.error("Error fetching page data:", error);
      return null;
    }
  }
);

export async function getAllPages() {
  try {
    const pages = await client.fetch(allPagesQuery);

    return pages;
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

export default async function PageBuilder({ slug }: PageBuilderProps) {
  const page = await getPageData(slug);

  if (!page) {
    console.log("No page found for slug:", slug);
    notFound();
  }

  const content = page.content || [];
  const pageHeading = pageHeadingFallbacks[slug];
  const normalizedContent = pageHeading && !containsPrimaryHeading(content)
    ? addPrimaryHeading(content, pageHeading)
    : content;

  return (
    <main id="main-content">
      {normalizedContent.map((component, index) => (
        <ComponentSelector key={index} component={component} />
      ))}
    </main>
  );
}
