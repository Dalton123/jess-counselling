import { Hero } from "@organisms/hero/hero";
import { Services } from "@organisms/Services/Services";
import { Feature } from "../../molecules/Feature/Feature";
import { SectionHeader } from "../../molecules/SectionHeader/SectionHeader";

// This component renders the right component based on the _type
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
      return <SectionHeader data={component} />;

    // Add cases for other component types

    default:
      return (
        <div className="rounded bg-yellow-100 p-4">
          <p>Unknown component type: {type}</p>
        </div>
      );
  }
}
