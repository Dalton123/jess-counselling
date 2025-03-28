import { urlForImage } from "../../../sanity/lib/client";
import { SectionHeader } from "../../molecules/SectionHeader/SectionHeader";
import { ServiceCard } from "../../molecules/ServiceCard/ServiceCard";

type ServiceData = {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
};

type ServicesProps = {
  sectionLabel?: string;
  sectionTitle?: string;
  sectionStyledTitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  services: ServiceData[];
};

export const Services = ({
  sectionLabel = "SERVICES",
  sectionTitle = "We Provide a Range of",
  sectionStyledTitle = "Psychological Services",
  viewAllLink = "/services",
  viewAllText = "VIEW ALL SERVICES",
  services = [],
}: ServicesProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          label={sectionLabel}
          title={sectionTitle}
          styledTitle={sectionStyledTitle}
          viewAllLink={viewAllLink}
          viewAllText={viewAllText}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              image={service.image}
              imageAlt={service.imageAlt}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
