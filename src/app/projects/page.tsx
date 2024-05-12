import React from "react";
import { GridLayout } from "./_components/GridLayout";
import { Filter } from "./_components/Filter";
import RadialGradient from "@/components/ui/radial-gradient";

const Projects = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-full z-50">
        <h1 className="text-2xl font-bold font-display">Projects</h1>
      </div>
      <GridLayout />
      <RadialGradient origin="left" />
      <RadialGradient origin="top right" />
      <RadialGradient origin="bottom right" />
    </div>
  );
};

export default Projects;
