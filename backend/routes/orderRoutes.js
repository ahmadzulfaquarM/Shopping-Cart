import express from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
    getAllOrders,
    updateOrderStatus,
    getAdminOrderById,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();


// Create order
router.post(
    "/",
    protect,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/",
    protect,
    getMyOrders
);


router.post(
    "/razorpay/create",
    protect,
    createRazorpayOrder
);

router.post(
    "/razorpay/verify",
    protect,
    verifyRazorpayPayment
);


// Get ALL orders

router.get(
    "/admin/all",
    protect,
    admin,
    getAllOrders
);

// Get single order - ADMIN

router.get(
    "/admin/:id",
    protect,
    admin,
    getAdminOrderById
);


// Update order status

router.put(
    "/admin/:id/status",
    protect,
    admin,
    updateOrderStatus
);


// Get single order
router.get(
    "/:id",
    protect,
    getOrderById
);


// Cancel order
router.put(
    "/:id/cancel",
    protect,
    cancelOrder
);


export default router;