export const prerender = false;

import type { APIRoute } from "astro";
import { redis } from "@/lib/redis";

export const GET: APIRoute = async () => {
  // Get the top project slug from the sorted set (highest score)
  const result = await redis.zrange("project_views", 0, 0, { rev: true });

  if (!result || result.length === 0) {
    return new Response(JSON.stringify({ slug: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const slug = result[0] as string;
  const views = (await redis.get<number>(`views:${slug}`)) ?? 0;

  return new Response(JSON.stringify({ slug, views }), {
    headers: { "Content-Type": "application/json" },
  });
};
