// @ts-check
import { defineConfig } from "astro/config";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://danielcmadeley.com",
  output: "static",

  build: {
    format: "directory",
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax],
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathJax],
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: ["https://danielcmadeley.com/rss.xml"],
    }),
  ],

  adapter: vercel(),
});
