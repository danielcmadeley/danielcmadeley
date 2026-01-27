import { useEffect, useState } from "react";

interface TopProject {
  slug: string;
  views: number;
}

export default function FeaturedProject() {
  const [project, setProject] = useState<TopProject | null>(null);

  useEffect(() => {
    fetch("/api/views/top-project")
      .then((r) => r.json())
      .then((data) => {
        if (data.slug) setProject(data);
      })
      .catch(() => {});
  }, []);

  if (!project) {
    return (
      <div className="flex flex-col h-full p-4">
        <h3>Featured Project</h3>
        <img
          src="/Development.svg"
          alt="Featured Project"
          className="object-cover mt-auto self-end"
        />
      </div>
    );
  }

  // Strip "project-" prefix for display and link
  const displaySlug = project.slug.replace(/^project-/, "");

  return (
    <a href={`/projects/${displaySlug}`} className="flex flex-col h-full p-4 hover:opacity-80 transition-opacity">
      <h3>Featured Project</h3>
      <p className="text-xs text-neutral-400 mt-1">
        {project.views.toLocaleString()} views
      </p>
      <img
        src="/Development.svg"
        alt="Featured Project"
        className="object-cover mt-auto self-end"
      />
    </a>
  );
}
