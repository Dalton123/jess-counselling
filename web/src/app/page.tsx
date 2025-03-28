import PageBuilder from '@organisms/PageBuilder/PageBuilder';

// Revalidate every hour
export const revalidate = 3600;

export default async function Home() {
  return <PageBuilder slug="home" />;
}
