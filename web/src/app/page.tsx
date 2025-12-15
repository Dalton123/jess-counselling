import PageBuilder, { getPageData } from "@organisms/PageBuilder/PageBuilder";
import { Metadata } from "next";

// Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");

  const title = "Counselling in Manchester | Wilkinson Counselling - BACP Registered";
  const description =
    page?.description ||
    "Professional counselling in Higher Blackley, Manchester and online throughout the UK. Person-centred therapy for adults, children and young people. BACP registered therapist.";
  const url = "https://www.wilkinsoncounselling.co.uk/";

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
