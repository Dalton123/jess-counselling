import PageBuilder, { getAllPages } from '@organisms/PageBuilder/PageBuilder';

// Revalidate every hour
export const revalidate = 3600;

type SanityPage = {
  slug: string;
  title: string;
};

export async function generateStaticParams() {
  const pages = await getAllPages();
  
  return pages.map((page: SanityPage) => ({
    slug: [page.slug],
  }));
}

// In Next.js 15, we need to use this approach for dynamic routes
export default function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  // Convert the slug array to a string
  const slugString = Array.isArray(params.slug) ? params.slug.join('/') : '';
  
  // Render the page builder with the slug
  return <PageBuilder slug={slugString} />;
} 