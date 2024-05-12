import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  category,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  category?: React.ReactNode;
}) => {
  const getCategoryColor = () => {
    if (category === "Structures") return "bg-red-500";
    if (category === "Software") return "bg-blue-500";
    return "bg-gray-500"; // default color if category doesn't match
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-black border-white/[0.2] border justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div
          className={`text-xs ${getCategoryColor()} w-fit h-fit px-2 py-1 rounded-xl`}
        >
          {category}
        </div>
        <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-xs text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
