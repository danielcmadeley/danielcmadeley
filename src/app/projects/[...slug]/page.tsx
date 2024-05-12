import React from "react";

// Update the type definition to include title and description
const Project = ({
  params,
}: {
  params: { slug: string[]; title?: string; description?: string };
}) => {
  const slugPath = params.slug.join("/");

  return (
    <div>
      Project {slugPath}
      <h1>{params.title}</h1>
      <h2>{params.description}</h2>
    </div>
  );
};

export default Project;
