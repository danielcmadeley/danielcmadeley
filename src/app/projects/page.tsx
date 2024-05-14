import BlogPage from "./_components/GridLayout";

const Projects = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-full z-50">
        <h1 className="text-2xl font-bold font-display">Projects</h1>
      </div>
      {/* <GridLayout /> */}
      <BlogPage />
    </div>
  );
};

export default Projects;
