import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Tailwind Radix Colors",
  description:
    "Bring Radix's Color System to Tailwind, and enjoy the best of both Tailwind CSS and Radix UI",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/tailwindcss.svg",
      },
    ],
  ],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/tailwindcss.svg",
    nav: [
      {
        text: "Tailwind CSS",
        link: "https://tailwindcss.com",
      },
      {
        text: "Radix Colors",
        link: "https://www.radix-ui.com/colors",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
          {
            text: "Why Another Palette?",
            link: "/why-another-palette",
          },
          {
            text: "Why This Plugin?",
            link: "/why-this-plugin",
          },
        ],
      },
      {
        text: "Guide",
        items: [
          {
            text: "Utility First",
            link: "/utility-first",
          },
          {
            text: "Semantic First",
            link: "/semantic-first",
          },
        ],
      },
      {
        text: "Reference",
        items: [
          {
            text: "Options",
            link: "/options",
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mrcaidev/tailwindcss-radix-colors",
      },
    ],
    footer: {
      message: "Released under the MIT license.",
      copyright: "© 2024-present Yuwang Cai",
    },
    editLink: {
      pattern:
        "https://github.com/mrcaidev/tailwindcss-radix-colors/edit/master/docs/:path",
    },
  },
});
