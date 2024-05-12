import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function GridLayout() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
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
];
