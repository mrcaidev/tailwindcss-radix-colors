import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Tailwind Radix Colors",
  description:
    "Bring Radix's color system to Tailwind, and enjoy the best of both Tailwind CSS and Radix UI",
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
        link: "https://tailwindcss.com/",
      },
      {
        text: "Radix UI",
        link: "https://www.radix-ui.com/",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        base: "/introduction",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
          {
            text: "Usage",
            link: "/usage",
          },
        ],
      },
      {
        text: "Guide",
        base: "/guide",
        items: [
          {
            text: "Utility-First",
            link: "/utility-first",
          },
          {
            text: "Semantic-First",
            link: "/semantic-first",
          },
          {
            text: "Color variants",
            link: "/color-variants",
          },
          {
            text: "Custom Colors",
            link: "/custom-colors",
          },
        ],
      },
      {
        text: "Reference",
        base: "/reference",
        items: [
          {
            text: "Plugin Options",
            link: "/options",
          },
          {
            text: "Semantic Table",
            link: "/semantic-table",
          },
        ],
      },
      {
        text: "FAQ",
        base: "/faq",
        items: [
          {
            text: "Why Another Palette?",
            link: "/why-another-palette",
          },
          {
            text: "Why This Plugin?",
            link: "/why-this-plugin",
          },
          {
            text: "Why Smaller CSS Bundle?",
            link: "/why-smaller-css-bundle",
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
      copyright: "© 2023-present Yuwang Cai",
    },
    editLink: {
      pattern:
        "https://github.com/mrcaidev/tailwindcss-radix-colors/edit/master/docs/:path",
    },
    search: {
      provider: "local",
    },
  },
});
