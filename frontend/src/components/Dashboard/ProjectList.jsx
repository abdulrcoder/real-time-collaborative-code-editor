import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            title={project.title}
            description={project.description}
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No projects found
        </p>
      )}
    </div>
  );
};

export default ProjectList;
