import { protect } from "../middleware/authMiddleware.js";
import express from "express";
import { registerUser, loginUser,getUserProfile } from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// profile
router.get("/profile",protect,getUserProfile);

export default router;