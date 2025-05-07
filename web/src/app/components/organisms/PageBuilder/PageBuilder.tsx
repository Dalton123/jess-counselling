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

export async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const data = await client.fetch(pageQuery, { slug });

    return data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

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

  return (
    <main>
      {page.content?.map((component, index) => (
        <ComponentSelector key={index} component={component} />
      ))}
    </main>
  );
}
