import '@styles/global.css';

export const metadata = {
  title: 'Jess Counselling',
  description: 'Professional counselling services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header would go here */}
        {children}
        {/* Footer would go here */}
      </body>
    </html>
  );
}
