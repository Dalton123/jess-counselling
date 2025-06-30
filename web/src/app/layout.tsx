import "@styles/global.css";
import { Footer } from "@organisms/Footer/Footer";
import { client } from "@sanity/lib/client";
import { footerQuery, headerQuery } from "@sanity/lib/queries";
import { Header } from "@organisms/Header/Header";
import { DM_Serif_Display, Montserrat } from "next/font/google";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-family-serif",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-family-sans",
  display: "swap",
});

export const metadata = {
  title: "Jessica Wilkinson Counselling",
  description:
    "Professional, compassionate counselling for adults and children. Person-centred support in a calm, supportive space.",
  keywords: [
    "counselling",
    "therapy",
    "mental health",
    "child counselling",
    "adolescent therapy",
    "adult counselling",
    "Jessica Wilkinson",
    "professional counsellor",
  ],
  authors: [{ name: "Jessica Wilkinson" }],
  creator: "Jessica Wilkinson",
  publisher: "Wilkinson Counselling",

  // Open Graph / Facebook
  openGraph: {
    title: "Jessica Wilkinson Counselling",
    description:
      "Professional counselling services for children, adolescents and adults",
    url: "https://wilkinsoncounselling.com",
    siteName: "Wilkinson Counselling",
    locale: "en_GB",
    type: "website",
    // images: [
    //   {
    //     url: "/images/og-image.jpg", // You'll need to add this image
    //     width: 1200,
    //     height: 630,
    //     alt: "Jessica Wilkinson Counselling - Professional Mental Health Services",
    //   },
    // ],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add these when you set up Google Search Console, etc.)
  // verification: {
  //   google: "your-google-verification-code",
  //   bing: "your-bing-verification-code",
  // },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await client.fetch(footerQuery);
  const headerData = await client.fetch(headerQuery);

  return (
    <html
      lang="en"
      className={`h-full ${dmSerifDisplay.variable} ${montserrat.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Header data={headerData} />
        <div className="flex-1">{children}</div>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
