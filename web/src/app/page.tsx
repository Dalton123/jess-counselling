import PageBuilder, { getPageData } from "@organisms/PageBuilder/PageBuilder";
import { Metadata } from "next";

// Keep published Sanity updates from remaining stale for a full deployment cycle.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");

  const title = "Counselling in Manchester | Wilkinson Counselling";
  const description =
    page?.description ||
    "Warm, professional counselling in Manchester and online across the UK for adults, children and young people, with a BACP registered counsellor.";
  const url = "https://www.wilkinsoncounselling.co.uk/";

  return {
    title: { absolute: title },
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
          alt: "Wilkinson Counselling - Professional Counselling in Manchester",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home() {
  return <PageBuilder slug="home" />;
}
