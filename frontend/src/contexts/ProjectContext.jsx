import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Project Context
const ProjectContext = createContext();

// Custom Hook to use Project Context
export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [singleProject, setSingleProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Axios instance with token configuration
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // Function to retrieve token from sessionStorage and set in headers
  const setAuthToken = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      setError("No token, authorization denied");
    }
  };

  // Fetch all projects for the authenticated user
  const fetchProjects = async () => {
    setAuthToken();
    if (!axiosInstance.defaults.headers.common["Authorization"]) return; // Exit if no token

    try {
      setLoading(true);
      const response = await axiosInstance.get("/projects/users/projects");
      setProjects(response.data.projects);
      setError(null); // Clear any previous error on successful fetch
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = async (id) => {
    setAuthToken();
    if (!axiosInstance.defaults.headers.common["Authorization"]) return; // Exit if no token

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/projects/${id}`);
      setSingleProject(response.data);
      setError(null); // Clear any previous error on successful fetch
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    setAuthToken();
    if (!axiosInstance.defaults.headers.common["Authorization"]) return; // Exit if no token

    try {
      setLoading(true);
      const response = await axiosInstance.post("/projects", projectData);
      const project = response.data.project; // Get the created project from response
      setProjects((prevProjects) => [...prevProjects, project]);
      setError(null); // Clear any previous error on successful creation
      return project; // Return the created project
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing project
  const updateProject = async (id, projectData) => {
    setAuthToken();
    if (!axiosInstance.defaults.headers.common["Authorization"]) return; // Exit if no token

    try {
      setLoading(true);
      const response = await axiosInstance.put(`/projects/${id}`, projectData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? response.data.project : project
        )
      );
      setError(null); // Clear any previous error on successful update
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const deleteProject = async (id) => {
    setAuthToken();
    if (!axiosInstance.defaults.headers.common["Authorization"]) return; // Exit if no token

    try {
      setLoading(true);
      await axiosInstance.delete(`/projects/${id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
      setError(null); // Clear any previous error on successful deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        createProject,
        updateProject,
        deleteProject,
        fetchProjects,
        getProjectById,
        singleProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
