import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  // Get the latest post date for lastBuildDate
  const latestPostDate =
    sortedPosts.length > 0 ? sortedPosts[0].data.pubDate : new Date();

  return rss({
    title: "Daniel Madeley - Blog",
    description:
      "Thoughts on design, development, and the intersection of technology and creativity. Articles about web development, design systems, and engineering.",
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
