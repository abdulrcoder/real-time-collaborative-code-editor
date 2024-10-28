const express = require("express");
const {
  initializeEditorSession,
  saveCodeChanges,
  getCodeSnapshot,
  getEditorHistory,
  addCollaborator,
  removeCollaborator,
  broadcastCodeChange,
  listCollaborators,
} = require("../controllers/editorController");

const router = express.Router();

// Route to initialize the editor session
router.post("/session", initializeEditorSession);

// Route to save code changes
router.post("/save", saveCodeChanges);

// Route to get a snapshot of the code
router.get("/snapshot", getCodeSnapshot);

// Route to get the editor history
router.get("/history", getEditorHistory);

// Route to add a collaborator
router.post("/collaborators/add", addCollaborator);

// Route to remove a collaborator
router.delete("/collaborators/remove", removeCollaborator);

// Route to broadcast code changes
router.post("/broadcast", broadcastCodeChange);

// Route to list collaborators
router.get("/collaborators", listCollaborators);

module.exports = router;
