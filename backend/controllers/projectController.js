const Project = require("../models/Project");
const User = require("../models/User");

// Function to create a new project
const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const project = new Project({
      title,
      description,
      userId: req.user._id,
    });

    const savedProject = await project.save();

    // Add project ID to user's projectIds array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { projectIds: savedProject._id },
    });

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};

// Function to get a project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};

// Function to update a project's title and description
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    const updatedProject = await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ message: "Failed to update project", error: error.message });
  }
};

// Function to delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Remove the project ID from user's projectIds array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { projectIds: id },
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
};

// Function to list all projects for the authenticated user
const listUserProjects = async (req, res) => {
  try {
    // Fetch all projects for the user, sorted by creation date in descending order
    const projects = await Project.find({ userId: req.user._id }).sort({
      createdAt: -1,
    }); // Sort in descending order by creation date

    res.status(200).json({
      message: "User projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user projects", error: error.message });
  }
};

module.exports = {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  listUserProjects,
};
