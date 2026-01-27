export const prerender = false;

import type { APIRoute } from "astro";
import { redis } from "@/lib/redis";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
  return new Response(JSON.stringify({ views }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  const views = await redis.incr(`views:${slug}`);

  // If this is a project slug, also update the sorted set for top-project lookup
  if (slug.startsWith("project-")) {
    await redis.zincrby("project_views", 1, slug);
  }

  return new Response(JSON.stringify({ views }), {
    headers: { "Content-Type": "application/json" },
  });
};
