import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

export default defineConfig({
  title: "tailwindcss-radix-colors",
  description:
    "A Tailwind CSS plugin that brings Radix UI's color system to Tailwind CSS",
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
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    // @ts-ignore it works
    plugins: [groupIconVitePlugin()],
  },
  themeConfig: {
    logo: "/tailwindcss.svg",
    nav: [
      {
        text: "Version",
        items: [
          {
            text: "latest (v2)",
            link: "/latest/introduction",
            activeMatch: "^/latest/",
          },
          {
            text: "v1",
            link: "/v1/introduction/getting-started",
            activeMatch: "^/v1/",
          },
        ],
      },
      {
        text: "Tailwind CSS",
        link: "https://tailwindcss.com/",
      },
      {
        text: "Radix UI",
        link: "https://www.radix-ui.com/",
      },
    ],
    sidebar: {
      latest: {
        base: "/latest",
        items: [
          {
            text: "Introduction",
            link: "/introduction",
          },
          {
            text: "Getting Started",
            link: "/getting-started",
          },
          {
            text: "Configuration",
            link: "/configuration",
          },
          {
            text: "Component Classes",
            link: "/component-classes",
          },
          {
            text: "Migrating to v2",
            link: "/migrating-to-v2",
          },
        ],
      },
      v1: {
        base: "/v1",
        items: [
          {
            text: "Introduction",
            collapsed: false,
            items: [
              {
                text: "Getting Started",
                link: "/introduction/getting-started",
              },
              {
                text: "Usage",
                link: "/introduction/usage",
              },
            ],
          },
          {
            text: "Guide",
            collapsed: false,
            items: [
              {
                text: "Utility-First",
                link: "/guide/utility-first",
              },
              {
                text: "Semantic-First",
                link: "/guide/semantic-first",
              },
              {
                text: "Color variants",
                link: "/guide/color-variants",
              },
              {
                text: "Custom Colors",
                link: "/guide/custom-colors",
              },
            ],
          },
          {
            text: "Reference",
            collapsed: false,
            items: [
              {
                text: "Plugin Options",
                link: "/reference/options",
              },
              {
                text: "Semantic Table",
                link: "/reference/semantic-table",
              },
            ],
          },
          {
            text: "FAQ",
            collapsed: false,
            items: [
              {
                text: "Why Another Palette?",
                link: "/faq/why-another-palette",
              },
              {
                text: "Why This Plugin?",
                link: "/faq/why-this-plugin",
              },
              {
                text: "Why Smaller CSS Bundle?",
                link: "/faq/why-smaller-css-bundle",
              },
            ],
          },
        ],
      },
    },
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
        "https://github.com/mrcaidev/tailwindcss-radix-colors/edit/main/docs/:path",
    },
    search: {
      provider: "local",
    },
  },
});
