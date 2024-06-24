import { defineConfig, Preset } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset, presetAutoprefix() as Preset],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: {
            light: "#4A90E2",
            dark: "#2C5282",
          },
          background: {
            light: "#FFFFFF",
            dark: "#1A202C",
          },
          text: {
            light: "#333333",
            dark: "#E2E8F0",
          },
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
      },
    },
    rules: [
      ['btn', 'py-2 px-4 rounded transition-colors duration-200'],
      ['btn-primary', 'bg-primary-light text-white hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary-light'],
    ],
  }),
  selfURL: import.meta.url,
};