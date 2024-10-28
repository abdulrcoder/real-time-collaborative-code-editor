import React, { useState } from "react";
import { useProjects } from "../../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";

const NewProjectModal = ({ closeModal }) => {
  const { createProject } = useProjects();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !projectDescription) {
      console.error("Title and description are required");
      return;
    }

    try {
      const newProject = await createProject({
        title: projectName,
        description: projectDescription,
      });

      console.log("New Project Created:", newProject); // Should display the created project with _id

      closeModal();

      if (newProject?._id) {
        navigate(`/editor/${newProject._id}`);
      } else {
        console.error("Project ID not available for navigation");
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-primary p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
            required
          />
          <textarea
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-600 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
