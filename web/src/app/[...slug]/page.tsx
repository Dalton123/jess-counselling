import PageBuilder, {
  getAllPages,
  getPageData,
} from "@organisms/PageBuilder/PageBuilder";
import { Metadata } from "next";

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

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const slugString = slugArray.join("/");

  const page = await getPageData(slugString);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const title = page.title
    ? `${page.title} | Wilkinson Counselling`
    : "Wilkinson Counselling";
  const description =
    page.description ||
    "Professional, compassionate counselling for adults and children. Person-centred support in a calm, supportive space.";
  const url = `https://wilkinsoncounselling.co.uk/${slugString}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Wilkinson Counselling",
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: "/images/Wilkinson-counselling-OG.jpg",
          width: 1200,
          height: 630,
          alt: `${page.title} - Wilkinson Counselling`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const slugString = slugArray.join("/");
  return <PageBuilder slug={slugString} />;
}
