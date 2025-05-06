import { StoryFn } from "@storybook/react";
import { Hero } from "./hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
};

export default meta;

export const Default: StoryFn<typeof Hero> = (args) => <Hero {...args} />;

Default.args = {
  data: {
    tagline: "FOCUSING ON THE UNIQUE NEEDS OF EACH PERSON",
    heading: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Personalized Support for Your Unique Journey",
          },
        ],
        markDefs: [],
      },
    ],
    subheading: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Begin your path to healing with compassionate guidance tailored to your individual needs",
          },
        ],
        markDefs: [],
      },
    ],
  },
};

export const WithoutTagline: StoryFn<typeof Hero> = (args) => (
  <Hero {...args} />
);

WithoutTagline.args = {
  data: {
    tagline: "",
    heading: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Begin Your Healing Journey Today" }],
        markDefs: [],
      },
    ],
    subheading: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Professional counselling services in a warm, supportive environment",
          },
        ],
        markDefs: [],
      },
    ],
  },
};

export const WithBackgroundImage: StoryFn<typeof Hero> = (args) => (
  <Hero {...args} />
);

WithBackgroundImage.args = {
  data: {
    ...Default.args.data,
    backgroundImage: {
      _type: "image",
      asset: { _ref: "custom-bg", _type: "image" },
    },
  },
};
