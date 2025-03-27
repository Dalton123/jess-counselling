import type { Preview } from "@storybook/react";
import "../src/app/styles/global.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        includeName: true,
        method: "alphabetical",
        order: ["Components", ["Atoms", "Molecules", "Organisms"]],
      },
    },
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
