import { posts } from "#site/content";
import Link from "next/link";

import { formatDate, sortPosts } from "@/lib/utils";
import { Navigation } from "../components/nav";

export const metadata = {
  title: "Blog",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );
  return (
    <main className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-4xl py-6 lg:py-10 text-zinc-50 pt-[8rem]">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              A blog built using Contentlayer. Posts are written in MDX.
            </p>
          </div>
        </div>
        <hr className="my-8" />
        {displayPosts?.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {displayPosts.map((post, index) => (
              <article
                key={post.slug}
                className="group relative flex flex-col space-y-2"
              >
                {/* {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )} */}
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                )}
                <Link
                  href={`/blog/${decodeURIComponent(post.title)
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="absolute inset-0"
                >
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </div>
    </main>
  );
}
