import type { Meta, StoryObj } from "@storybook/react";
import { Feature } from "./Feature";

const meta: Meta<typeof Feature> = {
  title: "Molecules/Feature",
  component: Feature,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Feature>;

export const Default: Story = {
  args: {
    title: "Hypnosis",
    description:
      "These programs involve self-guided materials such as workbooks, online courses, or apps designed to help individuals address specific issues like anxiety, depression, or stress management. Some guided programs may also include periodic check-ins with a therapist or coach for support.",
    imageSrc:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "People in therapy session",
    readMoreLink: "/services/hypnosis",
  },
};

export const Reversed: Story = {
  args: {
    ...Default.args,
    title: "Counselling",
    reversed: true,
  },
};
