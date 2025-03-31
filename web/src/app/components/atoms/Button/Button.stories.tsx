import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    href: "/",
    children: "Click Me",
  },
};

export const LongText: Story = {
  args: {
    href: "/services",
    children: "View All Services",
  },
};

export const ShortText: Story = {
  args: {
    href: "/about",
    children: "About",
  },
};
