import express from "express";

import {
    getDashboardStats,
    getAllUsers, 
    getUserById,
    deleteUser,
    toggleUserBlock,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();


// ======================================================
// ADMIN DASHBOARD
// ======================================================

router.get(
    "/dashboard",
    protect,
    admin,
    getDashboardStats
);


// ======================================================
// ADMIN - GET ALL USERS
// ======================================================

router.get(
    "/users",
    protect,
    admin,
    getAllUsers
);


// Get single user

router.get(
    "/users/:id",
    protect,
    admin,
    getUserById
);


// Delete user

router.delete(
    "/users/:id",
    protect,
    admin,
    deleteUser
);


// Block / Unblock user

router.put(
    "/users/:id/block",
    protect,
    admin,
    toggleUserBlock
);


export default router;