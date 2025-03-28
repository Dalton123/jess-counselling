import { Services } from '@organisms/Services/Services';
import { urlForImage } from '../../../sanity/lib/client';

type SectionData = {
  sectionLabel: string;
  sectionTitle: string;
  sectionStyledTitle: string;
  viewAllLink: string;
  viewAllText: string;
  selectedServices: Array<{
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
  }>;
};

export function ServicesWrapper({ data }: { data: SectionData }) {
  // Transform the data to match ServiceData format
  const transformedServices = data.selectedServices.map(service => ({
    title: service.title,
    image: urlForImage(service.image).url(),
    imageAlt: service.imageAlt,
    link: service.link
  }));

  return (
    <Services
      sectionLabel={data.sectionLabel}
      sectionTitle={data.sectionTitle}
      sectionStyledTitle={data.sectionStyledTitle}
      viewAllLink={data.viewAllLink}
      viewAllText={data.viewAllText}
      services={transformedServices}
    />
  );
} 