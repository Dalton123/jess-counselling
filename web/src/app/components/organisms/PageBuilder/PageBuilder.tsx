import { notFound } from "next/navigation";
import { ComponentSelector } from "@organisms/ComponentSelector/ComponentSelector";
import { client } from "../../../sanity/lib/client";

type PageComponent = {
  _type: string;
  [key: string]: any;
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
    const query = `*[_type == "page" && slug.current == $slug][0] {
      title,
      description,
      content[] {
        _type,
        ...,
        selectedServices[]-> {
          _id,
          title,
          image,
          imageAlt,
          link
        }
      }
    }`;

    // console.log('Fetching page data for slug:', slug);
    const data = await client.fetch(query, { slug });
    // console.log('Fetched page data:', data);

    return data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export async function getAllPages() {
  try {
    const query = `*[_type == "page" && defined(slug.current)] {
      title,
      "slug": slug.current
    }`;

    const pages = await client.fetch(query);
    // console.log('Fetched all pages:', pages);

    return pages;
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

export default async function PageBuilder({ slug }: PageBuilderProps) {
  // console.log('PageBuilder received slug:', slug);

  const page = await getPageData(slug);

  if (!page) {
    console.log("No page found for slug:", slug);
    notFound();
  }

  // console.log('Rendering page with content:', page.content);

  return (
    <main>
      {page.content?.map((component, index) => (
        <ComponentSelector key={index} component={component} />
      ))}
    </main>
  );
}
