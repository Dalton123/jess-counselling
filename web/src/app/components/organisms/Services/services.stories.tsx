import { StoryFn } from "@storybook/react";
import { Services } from "./Services";

const meta = {
  title: "Components/Organisms/Services",
  component: Services,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryFn<typeof Services> = (args) => (
  <Services {...args} />
);

Default.args = {
  services: [
    {
      title: "Individual Therapy",
      imageSrc:
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Therapist working with an individual client",
      link: "/services/individual-therapy",
    },
    {
      title: "Couple Therapy",
      imageSrc:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Therapist holding hands with a couple",
      link: "/services/couple-therapy",
    },
    {
      title: "Child Therapy",
      imageSrc:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Child during therapy session",
      link: "/services/child-therapy",
    },
  ],
};

export const WithMoreServices: StoryFn<typeof Services> = (args) => (
  <Services {...args} />
);

WithMoreServices.args = {
  ...Default.args,
  services: [
    ...Default.args.services,
    {
      title: "Family Therapy",
      imageSrc:
        "https://images.unsplash.com/photo-1542628682-88321d2a4828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Family therapy session",
      link: "/services/family-therapy",
    },
    {
      title: "Group Therapy",
      imageSrc:
        "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Group therapy session",
      link: "/services/group-therapy",
    },
  ],
};
