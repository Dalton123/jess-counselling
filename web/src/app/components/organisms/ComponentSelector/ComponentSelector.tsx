import dynamic from "next/dynamic";
import { Hero } from "@organisms/hero/hero";
import { Services } from "@organisms/Services/Services";
import { Feature } from "@molecules/Feature/Feature";
import { SectionHeader } from "@molecules/SectionHeader/SectionHeader";
import { ContactSection } from "@organisms/ContactSection/ContactSection";
import { LogoShowcase } from "@organisms/LogoShowcase/LogoShowcase";
import { Accordion } from "@organisms/Accordion/Accordion";
import { RichText } from "@organisms/RichText/RichText";
import { InfoGrid } from "@molecules/InfoGrid/InfoGrid";

// Lazy load TestimonialsCarousel to reduce initial bundle size (~30-40 KiB savings)
const TestimonialsCarousel = dynamic(
  () => import("@organisms/TestimonialsCarousel/TestimonialsCarousel").then(mod => mod.TestimonialsCarousel),
  {
    loading: () => (
      <section className="flex min-h-[calc(100dvh-100px)] items-center justify-center bg-teal-500">
        <div className="animate-pulse text-teal-100">Loading testimonials...</div>
      </section>
    ),
  }
);

// This component renders the right component based on the _type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ComponentSelector({ component }: { component: any }) {
  // Extract the component type
  const type = component._type;

  // Return appropriate component based on type
  switch (type) {
    case "hero":
      return <Hero data={component} />;

    case "services":
      // This requires additional data fetching for the referenced services
      return <Services data={component} />;

    case "feature":
      return <Feature data={component} />;

    case "sectionHeader":
      return <SectionHeader data={component} wrapper="none" />;

    case "contact":
      return <ContactSection data={component} />;

    case "logoShowcase":
      return <LogoShowcase data={component} />;

    case "accordion":
      return <Accordion data={component} />;

    case "richTextModule":
      return <RichText data={component} />;

    case "infoGrid":
      return <InfoGrid data={component} />;

    case "testimonialsCarousel":
      return <TestimonialsCarousel data={component} />;

    // Add cases for other component types

    default:
      return (
        <div className="rounded bg-yellow-100 p-4">
          <p>Unknown component type: {type}</p>
        </div>
      );
  }
}
