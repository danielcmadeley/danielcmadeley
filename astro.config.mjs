// @ts-check
import { defineConfig } from "astro/config";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathJax from "rehype-mathjax";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

import { visit } from "unist-util-visit";

// Custom rehype plugin to add data-pagefind-ignore to MathJax containers
function rehypePagefindIgnoreMath() {
  return (/** @type {any} */ tree) => {
    visit(tree, "element", (node) => {
      // Target MathJax containers and tables
      if (
        node.tagName === "mjx-container" ||
        node.tagName === "table" ||
        (node.properties &&
          node.properties.className &&
          Array.isArray(node.properties.className) &&
          node.properties.className.includes("MathJax"))
      ) {
        node.properties = node.properties || {};
        node.properties["data-pagefind-ignore"] = true;
      }
    });
  };
}

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
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeMathJax, rehypePagefindIgnoreMath],
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkMath, remarkGfm],
      rehypePlugins: [rehypeMathJax, rehypePagefindIgnoreMath],
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
