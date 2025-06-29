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
    "Professional counselling services for children, adolescents and adults",
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
