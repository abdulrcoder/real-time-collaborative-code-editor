// authRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const upload = require("../config/cloudinary");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes and map them to controller functions
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", upload.none(), loginUser);
router.get("/profile", upload.none(), authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

module.exports = router;
