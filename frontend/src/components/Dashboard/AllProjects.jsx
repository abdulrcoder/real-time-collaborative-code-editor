import React from "react";
import Header from "./Header";
import ProjectList from "./ProjectList";
import { useProjects } from "../../contexts/ProjectContext";

const AllProjects = ({ openModal }) => {
  const { projects, fetchProjects, loading, error } = useProjects();

  // Fetch projects when the component mounts
  // React.useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header openModal={openModal} />

      {/* Title Heading */}
      <h2 className="text-2xl font-bold mb-2">All Projects</h2>

      <main>
        {/* Display ProjectList with the fetched projects */}
        <ProjectList projects={projects} />
      </main>
    </div>
  );
};

export default AllProjects;
