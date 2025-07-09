export interface BlogPost {
    title: string;
    description: string;
    pubDate: string;
    author?: string;
    tags: string[];
    url: string;
    readingTime: number;
}

export function calculateReadingTime(content: string): number {
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

export function processAstroBlogPost(post: any): BlogPost {
    const url = post.url || post.file.replace(/.*\/pages/, "").replace(/\.md$/, "");

    // Calculate reading time from markdown content
    const content = post.rawContent ? post.rawContent() : "";
    const readingTime = calculateReadingTime(content);

    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        pubDate: post.frontmatter.pubDate,
        author: post.frontmatter.author || "Daniel Madeley",
        tags: post.frontmatter.tags || [],
        url: url,
        readingTime: readingTime,
    };
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
    return posts.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
}

export function getRecentPosts(posts: BlogPost[], limit: number = 3): BlogPost[] {
    return sortPostsByDate(posts).slice(0, limit);
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
}
