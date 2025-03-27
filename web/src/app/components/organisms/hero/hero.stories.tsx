import { StoryFn } from "@storybook/react";
import { fn } from "@storybook/test";
import { Hero } from "./hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
};

export default meta;

export const Default: StoryFn<typeof Hero> = (args) => <Hero {...args} />;

Default.args = {
  tagline: "FOCUSING ON THE UNIQUE NEEDS OF EACH PERSON",
  heading: "Personalized Support for Your Unique Journey",
  subheading:
    "Begin your path to healing with compassionate guidance tailored to your individual needs",
  ctaText: "GET STARTED NOW",
  onCtaClick: fn(),
};

export const WithoutTagline: StoryFn<typeof Hero> = (args) => (
  <Hero {...args} />
);

WithoutTagline.args = {
  tagline: "",
  heading: "Begin Your Healing Journey Today",
  subheading:
    "Professional counselling services in a warm, supportive environment",
  ctaText: "BOOK A CONSULTATION",
  onCtaClick: fn(),
};

export const WithBackgroundImage: StoryFn<typeof Hero> = (args) => (
  <Hero {...args} />
);

WithBackgroundImage.args = {
  ...Default.args,
  backgroundImage: "/images/custom-background.jpg",
  onCtaClick: fn(),
};
