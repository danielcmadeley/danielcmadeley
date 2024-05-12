"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useEffect, useState } from "react";

interface Item {
  title: string;
  description: string;
  header: JSX.Element;
  category: string;
}

export function GridLayout() {
  const [shuffledItems, setShuffledItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setShuffledItems(shuffleArray([...items]));
  }, []);

  function shuffleArray(array: Item[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const filteredItems = filter
    ? shuffledItems.filter((item) => item.category === filter)
    : shuffledItems;

  return (
    <div className="">
      <BentoGrid className="max-w-4xl mx-auto">
        {filteredItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            category={item.category}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br  from-neutral-900 to-neutral-800 "></div>
);
const items = [
  {
    title: "The Digital Dino",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    category: "Software",
  },
  {
    title: "Camel Tracks",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    category: "Software",
  },
  {
    title: "Structopia",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    category: "Software",
  },
  {
    title: "mxdeley",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    category: "Software",
  },
  {
    title: "Cardiff Bay Train Station",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    category: "Structures",
  },
  {
    title: "Porthcawl Metro Link",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    category: "Structures",
  },
  {
    title: "Paddle Steamer, Cardiff",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    category: "Structures",
  },
  {
    title: "Berner Street",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    category: "Structures",
  },
];
