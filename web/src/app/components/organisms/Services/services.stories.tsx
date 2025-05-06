import { StoryFn } from "@storybook/react";
import { Services } from "./Services";
import type { ServicesData } from "./Services"; // ServicesData is now exported

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
  data: {
    showSectionHeader: false,
    header: {
      label: "Our Services",
      title: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Our Services" }],
          markDefs: [],
        },
      ],
    },
    selectedServices: [
      {
        _id: "1",
        title: "Individual Therapy",
        image: { asset: { _ref: "image-1", _type: "image" } },
        imageAlt: "Therapist working with an individual client",
        link: { href: "/services/individual-therapy", text: "Read more" },
      },
      {
        _id: "2",
        title: "Couple Therapy",
        image: { asset: { _ref: "image-2", _type: "image" } },
        imageAlt: "Therapist holding hands with a couple",
        link: { href: "/services/couple-therapy", text: "Read more" },
      },
      {
        _id: "3",
        title: "Child Therapy",
        image: { asset: { _ref: "image-3", _type: "image" } },
        imageAlt: "Child during therapy session",
        link: { href: "/services/child-therapy", text: "Read more" },
      },
    ],
    wrapper: "none",
  },
};

// Type-cast story data to ServicesData to remove TS errors
const defaultData = Default.args!.data as ServicesData;

export const WithMoreServices: StoryFn<typeof Services> = (args) => (
  <Services {...args} />
);

WithMoreServices.args = {
  data: {
    ...defaultData,
    selectedServices: [
      ...defaultData.selectedServices,
      {
        _id: "4",
        title: "Family Therapy",
        image: { asset: { _ref: "image-4", _type: "image" } },
        imageAlt: "Family therapy session",
        link: { href: "/services/family-therapy", text: "Read more" },
      },
      {
        _id: "5",
        title: "Group Therapy",
        image: { asset: { _ref: "image-5", _type: "image" } },
        imageAlt: "Group therapy session",
        link: { href: "/services/group-therapy", text: "Read more" },
      },
    ],
  },
};
