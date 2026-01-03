import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  // Get all unique tags/categories
  const allTags = new Set();
  posts.forEach((post) => {
    const tags = post.data.tags || [];
    tags.forEach((tag) => {
      const slug = tag
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      allTags.add(slug);
    });
  });

  return Array.from(allTags).map((category) => ({
    params: { category },
    props: { category },
  }));
}

export async function GET(context) {
  const { category } = context.params;
  const posts = await getCollection("blog");

  // Filter posts by category
  const categoryPosts = posts.filter((post) => {
    const tags = post.data.tags || [];
    return tags.some((tag) => {
      const slug = tag
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return slug === category;
    });
  });

  // Sort posts by date (newest first)
  const sortedPosts = categoryPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  // Get the readable category name from the original tag
  const originalTag = posts.find((post) => {
    const tags = post.data.tags || [];
    return tags.some((tag) => {
      const slug = tag
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return slug === category;
    });
  });

  const readableCategoryName = originalTag
    ? originalTag.data.tags.find((tag) => {
        const slug = tag
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        return slug === category;
      })
    : category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  return rss({
    title: `Daniel Madeley - ${readableCategoryName}`,
    description: `Blog posts about ${readableCategoryName} from Daniel Madeley. Thoughts on design, development, and technology.`,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author || "Daniel Madeley",
      link: `/thoughts-and-writings/${post.id}/`,
      guid: `${context.site}thoughts-and-writings/${post.id}/`,
      categories: post.data.tags || [],
    })),
    customData: `
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <docs>https://blogs.law.harvard.edu/tech/rss</docs>
      <generator>Astro RSS</generator>
      <managingEditor>daniel@danielcmadeley.com (Daniel Madeley)</managingEditor>
      <webMaster>daniel@danielcmadeley.com (Daniel Madeley)</webMaster>
      <ttl>1440</ttl>
    `,
    stylesheet: "/rss-styles.xsl",
  });
}
