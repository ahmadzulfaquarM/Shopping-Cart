import express from "express";

import {
    getDashboardStats,

    getAllUsers,
    getUserById,
    deleteUser,
    toggleUserBlock,

    getAllOrders,
    getOrderStatistics,
    updateOrderStatus,
    getAdminOrderById,

} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();
router.get(
    "/dashboard",
    protect,
    admin,
    getDashboardStats
);
router.get(
    "/users",
    protect,
    admin,
    getAllUsers
);

router.get(
    "/users/:id",
    protect,
    admin,
    getUserById
);

router.delete(
    "/users/:id",
    protect,
    admin,
    deleteUser
);

router.put(
    "/users/:id/block",
    protect,
    admin,
    toggleUserBlock
);


// ======================================================
// ADMIN - ORDERS
// ======================================================

router.get(
    "/orders",
    protect,
    admin,
    getAllOrders
);

router.get(
    "/orders/statistics",
    protect,
    admin,
    getOrderStatistics
);

router.get(
    "/orders/:id",
    protect,
    admin,
    getAdminOrderById
);

router.put(
    "/orders/:id/status",
    protect,
    admin,
    updateOrderStatus
);


export default router;