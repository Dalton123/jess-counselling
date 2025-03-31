import { SectionHeader } from "../../molecules/SectionHeader/SectionHeader";
import { ServiceCard } from "../../molecules/ServiceCard/ServiceCard";
import { urlForImage } from "../../../sanity/lib/client";

type SanityService = {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  imageAlt: string;
  link: string;
};

type ServicesData = {
  sectionLabel: string;
  sectionTitle: string;
  sectionStyledTitle: string;
  viewAllLink: string;
  viewAllText: string;
  selectedServices: Array<SanityService>;
  showSectionHeader: boolean;
};

export const Services = ({ data }: { data: ServicesData }) => {
  const {
    showSectionHeader = false,
    sectionLabel,
    sectionTitle,
    viewAllLink,
    viewAllText,
  } = data;
  // Transform the Sanity services data
  const services = data.selectedServices.map((service) => ({
    title: service.title,
    image: urlForImage(service.image).url(),
    imageAlt: service.imageAlt,
    link: service.link,
  }));

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* {showSectionHeader && (
          <SectionHeader
            data={{
              label: sectionLabel,
              title: sectionTitle,
              viewAllLink: viewAllLink,
              viewAllText: viewAllText,
            }}
          />
        )} */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              image={service.image}
              imageAlt={service.imageAlt || service.title}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
