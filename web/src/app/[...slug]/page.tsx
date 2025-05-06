import PageBuilder, { getAllPages } from "@organisms/PageBuilder/PageBuilder";

// Revalidate every hour
export const revalidate = 3600;

type SanityPage = {
  slug: string;
  title: string;
};

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPages();

  return pages
    .filter((page: SanityPage) => page.slug !== "404")
    .map((page: SanityPage) => ({
      slug: [page.slug],
    }));
}

// Disable type check as Next infers page props automatically
// In Next.js 15, dynamic routes receive a `params` object
export const dynamicParams = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const slugArray = Array.isArray(props.params.slug)
    ? props.params.slug
    : [props.params.slug];
  const slugString = slugArray.join("/");
  return <PageBuilder slug={slugString} />;
}
