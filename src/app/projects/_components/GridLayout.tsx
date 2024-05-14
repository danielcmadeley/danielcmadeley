// "use client";

// import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
// import { useEffect, useState } from "react";
// import { projects } from "#site/content";
// import Link from "next/link";

// interface Project {
//   title: string;
//   description?: string;
//   category?: string;
//   slug: string;
// }

// export function GridLayout() {
//   const [shuffledItems, setShuffledItems] = useState<Project[]>([]);
//   const [filter, setFilter] = useState<string>("");

//   useEffect(() => {
//     setShuffledItems(shuffleArray([...projects]));
//   }, []);

//   function shuffleArray(array: Project[]) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   const filteredProjects = filter
//     ? shuffledItems.filter((project) => project.category === filter)
//     : shuffledItems;

//   return (
//     <div className="">
//       {projects.map((project, i) => (
//         <div key={i}>{project.slug}</div>
//       ))}
//       <BentoGrid className="max-w-4xl mx-auto">
//         {filteredProjects.map((project, i) => (
//           <Link href={`/${project.slug}`} key={i}>
//             <BentoGridItem
//               key={i}
//               title={project.title}
//               description={project.description}
//               category={project.category}
//               className={i === 3 || i === 6 ? "md:col-span-2" : ""}
//             />
//           </Link>
//         ))}
//       </BentoGrid>
//     </div>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { projects as allProjects } from "#site/content";

import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground text-xl">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {projects?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group relative flex flex-col space-y-2"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={804}
                  height={452}
                  className="bg-muted rounded-md border transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{project.title}</h2>
              {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
              )}
              {project.date && (
                <p className="text-muted-foreground text-sm">
                  {formatDate(project.date)}
                </p>
              )}
              <Link href={project.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
