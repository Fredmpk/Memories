import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 80s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config;
