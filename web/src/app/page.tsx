import PageBuilder, { getPageData } from "@organisms/PageBuilder/PageBuilder";
import { Metadata } from "next";

// Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");

  const title =
    "Jessica Wilkinson Counselling - Professional Mental Health Services";
  const description =
    page?.description ||
    "Professional, compassionate counselling for adults and children. Person-centred support in a calm, supportive space.";
  const url = "https://wilkinsoncounselling.co.uk";

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
          alt: "Jessica Wilkinson Counselling - Professional Mental Health Services",
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
