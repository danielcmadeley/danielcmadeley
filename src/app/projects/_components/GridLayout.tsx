"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useEffect, useState } from "react";
import { projects } from "#site/content";
import Link from "next/link";

interface Project {
  title: string;
  description?: string;
  header?: JSX.Element;
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
              header={project.header}
              category={project.category}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          </Link>
        ))}
      </BentoGrid>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br  from-neutral-900 to-neutral-800 "></div>
);
// const items = [
//   {
//     title: "The Digital Dino",
//     description: "Explore the birth of groundbreaking ideas and inventions.",
//     header: <Skeleton />,
//     category: "Software",
//   },
//   {
//     title: "Camel Tracks",
//     description: "Dive into the transformative power of technology.",
//     header: <Skeleton />,
//     category: "Software",
//   },
//   {
//     title: "Structopia",
//     description: "Discover the beauty of thoughtful and functional design.",
//     header: <Skeleton />,
//     category: "Software",
//   },
//   {
//     title: "mxdeley",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     category: "Software",
//   },
//   {
//     title: "Cardiff Bay Train Station",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     category: "Structures",
//   },
//   {
//     title: "Porthcawl Metro Link",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     category: "Structures",
//   },
//   {
//     title: "Paddle Steamer, Cardiff",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     category: "Structures",
//   },
//   {
//     title: "Berner Street",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     category: "Structures",
//   },
// ];
