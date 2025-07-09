import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  return new Response(
    JSON.stringify({
      version: "https://jsonfeed.org/version/1.1",
      title: "Daniel Madeley - Blog",
      home_page_url: context.site.href,
      feed_url: `${context.site.href}feed.json`,
      description: "Thoughts on design, development, and the intersection of technology and creativity. Articles about web development, design systems, and engineering.",
      language: "en-us",
      authors: [
        {
          name: "Daniel Madeley",
          url: context.site.href,
          avatar: `${context.site.href}favicon.svg`,
        },
      ],
      items: sortedPosts.map((post) => ({
        id: `${context.site.href}blog/${post.id}/`,
        url: `${context.site.href}blog/${post.id}/`,
        title: post.data.title,
        content_html: post.data.description,
        summary: post.data.description,
        date_published: post.data.pubDate.toISOString(),
        date_modified: post.data.pubDate.toISOString(),
        authors: [
          {
            name: post.data.author || "Daniel Madeley",
          },
        ],
        tags: post.data.tags || [],
      })),
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
