export interface BlogPost {
  title: string;
  description: string;
  pubDate: string;
  author?: string;
  tags: string[];
  slug: string;
  readingTime: number;
}

function calculateReadingTime(content: string): number {
  if (!content) return 1;

  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCompactDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function processCollectionBlogPost(post: any): BlogPost {
  // Calculate reading time from markdown content
  const content = post.body || "";
  const readingTime = calculateReadingTime(content);

  return {
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    author: post.data.author || "Daniel Madeley",
    tags: post.data.tags || [],
    slug: post.id,
    readingTime: readingTime,
  };
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );
}

export function getRecentPosts(
  posts: BlogPost[],
  limit: number = 3,
): BlogPost[] {
  return sortPostsByDate(posts).slice(0, limit);
}
