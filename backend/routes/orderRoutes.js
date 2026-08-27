import express from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

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