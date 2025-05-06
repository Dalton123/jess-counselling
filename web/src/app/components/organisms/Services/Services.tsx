import { SectionHeader } from "../../molecules/SectionHeader/SectionHeader";
import { ServiceCard } from "../../molecules/ServiceCard/ServiceCard";
import { SectionWrapper } from "../../atoms/SectionWrapper/SectionWrapper";
import { urlForImage } from "../../../sanity/lib/client";
import { PortableTextBlock } from "@portabletext/react";
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
  link?: { href: string; text: string };
  description?: PortableTextBlock[];
};

type ServicesData = {
  showSectionHeader: boolean;
  header: {
    label: string;
    title: PortableTextBlock[];
    viewAllLink?: { href: string; text: string };
  };
  selectedServices: Array<SanityService>;
  wrapper?: "none" | "dark" | "light";
};

export const Services = ({ data }: { data: ServicesData }) => {
  const {
    showSectionHeader = false,
    header,
    selectedServices,
    wrapper = "none",
  } = data;

  // Transform the Sanity services data
  const services = selectedServices.map((service) => ({
    title: service.title,
    description: service.description,
    image: urlForImage(service.image).url(),
    imageAlt: service.imageAlt,
    link: service.link,
  }));

  return (
    <SectionWrapper wrapper={wrapper}>
      {showSectionHeader && header && (
        <SectionHeader data={header} wrapper={wrapper} />
      )}

      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description || []}
            image={service.image}
            imageAlt={service.imageAlt || service.title}
            link={service.link ? service.link : { href: "", text: "" }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
