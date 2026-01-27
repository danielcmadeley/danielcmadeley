import { useEffect, useState } from "react";

interface ViewTrackerProps {
  slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    const alreadyViewed = sessionStorage.getItem(key);

    if (!alreadyViewed) {
      fetch(`/api/views/${slug}`, { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          setViews(data.views);
          sessionStorage.setItem(key, "1");
        })
        .catch(() => {
          // Fall back to GET if POST fails
          fetch(`/api/views/${slug}`)
            .then((r) => r.json())
            .then((data) => setViews(data.views));
        });
    } else {
      fetch(`/api/views/${slug}`)
        .then((r) => r.json())
        .then((data) => setViews(data.views))
        .catch(() => {});
    }
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="text-sm text-neutral-400">
      {views.toLocaleString()} view{views !== 1 ? "s" : ""}
    </span>
  );
}
