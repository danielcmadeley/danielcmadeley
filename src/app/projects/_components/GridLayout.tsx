"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useEffect, useState } from "react";
import { projects } from "#site/content";
import Link from "next/link";

interface Project {
  title: string;
  description?: string;
  category?: string;
  slug: string;
}

export function GridLayout() {
  const [shuffledItems, setShuffledItems] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setShuffledItems(shuffleArray([...projects]));
  }, []);

  function shuffleArray(array: Project[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const filteredProjects = filter
    ? shuffledItems.filter((project) => project.category === filter)
    : shuffledItems;

  return (
    <div className="">
      <BentoGrid className="max-w-4xl mx-auto">
        {filteredProjects.map((project, i) => (
          <Link href={`/${project.slug}`} key={i}>
            <BentoGridItem
              key={i}
              title={project.title}
              description={project.description}
              category={project.category}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          </Link>
        ))}
      </BentoGrid>
    </div>
  );
}
