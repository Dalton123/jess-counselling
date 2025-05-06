import "@styles/global.css";
import { Footer } from "@organisms/Footer/Footer";
import { client } from "@sanity/lib/client";
import { footerQuery, headerQuery } from "@sanity/lib/queries";
import { Header } from "@organisms/Header/Header";

export const metadata = {
  title: "Jess Counselling",
  description: "Professional counselling services",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await client.fetch(footerQuery);
  const headerData = await client.fetch(headerQuery);

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col">
        <Header data={headerData} />
        <div className="flex-1">{children}</div>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
