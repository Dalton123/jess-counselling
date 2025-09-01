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
  metadataBase: new URL("https://wilkinsoncounselling.co.uk/"),
  title: {
    default: "Wilkinson Counselling",
    template: "%s | Wilkinson Counselling",
  },
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
    title: "Jessica Walsh Counselling",
    description:
      "Professional counselling services for children, adolescents and adults",
    url: "https://wilkinsoncounselling.co.uk/",
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
  const [headerData, footerData] = await Promise.all([
    client.fetch(headerQuery),
    client.fetch(footerQuery),
  ]);

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
      </head>
      <body className="antialiased">
        <Header data={headerData} />
        <main>{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
