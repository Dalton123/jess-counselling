import "@styles/global.css";
import { Footer } from "@organisms/Footer/Footer";
import { client } from "@sanity/lib/client";
import { footerQuery } from "@sanity/lib/queries";

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

  return (
    <html lang="en">
      <body>
        {/* Header would go here */}
        {children}
        {/* Footer would go here */}
        <Footer data={footerData} />
      </body>
    </html>
  );
}
