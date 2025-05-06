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
    data: {
      title: "Hypnosis",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "These programs involve self-guided materials such as workbooks, online courses, or apps designed to help individuals address specific issues like anxiety, depression, or stress management. Some guided programs may also include periodic check-ins with a therapist or coach for support.",
            },
          ],
          markDefs: [],
        },
      ],
      image: { asset: { _ref: "image-abc123", _type: "image" } },
      imageAlt: "People in therapy session",
      link: { href: "/services/hypnosis", text: "Read more" },
      reversed: false,
      showSectionHeader: false,
      wrapper: "light",
      fullWidth: false,
      topSpacing: "medium",
      bottomSpacing: "medium",
    },
  },
};

export const Reversed: Story = {
  args: {
    data: {
      title: "Counselling",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Counselling involves talking to a therapist or counselor about your feelings, thoughts, and behaviors. It can help you understand yourself better and learn new ways to cope with difficult emotions or situations.",
            },
          ],
          markDefs: [],
        },
      ],
      image: { asset: { _ref: "image-abc123", _type: "image" } },
      imageAlt: "People in therapy session",
      link: { href: "/services/counselling", text: "Read more" },
      reversed: true,
      showSectionHeader: false,
      wrapper: "light",
      fullWidth: false,
      topSpacing: "medium",
      bottomSpacing: "medium",
    },
  },
};
