import React from "react";
import { GridLayout } from "./_components/GridLayout";
import { Filter } from "./_components/Filter";

const Projects = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-full z-50">
        <h1 className="text-2xl font-bold font-display">Projects</h1>
        <Filter />
      </div>
      <GridLayout />
    </div>
  );
};

export default Projects;
