import { cache } from "react";
import "@styles/global.css";
import { Footer } from "@organisms/Footer/Footer";
import { client } from "@sanity/lib/client";
import { footerQuery, headerQuery } from "@sanity/lib/queries";
import { Header } from "@organisms/Header/Header";
import { AnalyticsConsent } from "@organisms/AnalyticsConsent/AnalyticsConsent";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import {
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from "./utils/structuredData";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-family-serif",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-family-sans",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});

export const viewport = {
  themeColor: "#0d9488",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://www.wilkinsoncounselling.co.uk/"),
  title: {
    default: "Counselling in Manchester | Wilkinson Counselling",
    template: "%s | Wilkinson Counselling",
  },
  description:
    "Professional counselling in Manchester & online throughout the UK. BACP registered therapist offering person-centred support for adults, children and young people.",
  keywords: [
    "counselling Manchester",
    "therapist Manchester",
    "counsellor Greater Manchester",
    "child therapist Manchester",
    "adult counselling Manchester",
    "online therapy UK",
    "remote counselling",
    "BACP registered therapist Manchester",
    "anxiety counselling Manchester",
    "depression therapy Manchester",
    "children counselling Manchester",
    "adolescent therapy Manchester",
    "mental health support Manchester",
    "counselling",
    "therapy",
    "mental health",
    "child counselling",
    "adolescent therapy",
    "adult counselling",
    "Jessica Wilkinson",
    "Jessica Walsh",
    "professional counsellor",
  ],
  authors: [{ name: "Jessica Walsh" }],
  creator: "Jessica Walsh",
  publisher: "Wilkinson Counselling",

  // Favicon and icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.ico",
        color: "#0d9488",
      },
    ],
  },

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Open Graph / Facebook
  openGraph: {
    title: "Counselling in Manchester | Wilkinson Counselling",
    description:
      "Professional counselling in Manchester & online throughout the UK. BACP registered therapist for adults, children and young people.",
    url: "https://www.wilkinsoncounselling.co.uk/",
    siteName: "Wilkinson Counselling",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/Wilkinson-counselling-OG.jpg",
        width: 1200,
        height: 630,
        alt: "Wilkinson Counselling - Professional Mental Health Services",
      },
    ],
  },

  // Twitter
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Jessica Wilkinson Counselling",
  //   description:
  //     "Professional counselling services for children, adolescents and adults",
  //   images: ["/images/og-image.jpg"], // Same image as Open Graph
  // },

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
};

const getLayoutData = cache(async () => {
  const [headerData, footerData] = await Promise.all([
    client.fetch(headerQuery),
    client.fetch(footerQuery),
  ]);
  return { headerData, footerData };
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { headerData, footerData } = await getLayoutData();

  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${montserrat.variable}`}
    >
      <head>
        {/* Additional favicon links for better compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/web-app-manifest-192x192.png"
        />
        <meta name="msapplication-TileColor" content="#0d9488" />
        <meta
          name="msapplication-TileImage"
          content="/web-app-manifest-192x192.png"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          rel="preload"
          href="/images/wave-pattern.svg"
          as="image"
          type="image/svg+xml"
        />

        {/* Structured Data - LocalBusiness & WebSite schemas for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />

      </head>
      <body id="top" className="antialiased">
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-2 font-semibold text-teal-950 shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header data={headerData} />
        {children}
        <Footer data={footerData} />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
