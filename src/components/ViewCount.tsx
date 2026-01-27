import { useEffect, useState } from "react";

interface ViewCountProps {
  slug: string;
}

export default function ViewCount({ slug }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then((r) => r.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="text-xs text-neutral-500">
      {views.toLocaleString()} views
    </span>
  );
}
