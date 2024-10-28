const express = require("express");
const {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  listUserProjects,
} = require("../controllers/projectController.js");

const router = express.Router();

// Route to create a new project
router.post("/", createProject);

// Route to get a project by its ID
router.get("/:id", getProjectById);

// Route to update a project by its ID
router.put("/:id", updateProject);

// Route to delete a project by its ID
router.delete("/:id", deleteProject);

// Route to list all projects for a user
router.get("/users/projects", listUserProjects);

module.exports = router;
