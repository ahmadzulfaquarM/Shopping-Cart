import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import { registerUser, loginUser,getUserProfile,updateUserProfile } from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// profile
router.get("/profile",protect,getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;