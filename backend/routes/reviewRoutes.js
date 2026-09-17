import express from "express";

import {
    createReview,
    getProductReviews,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
    Get all reviews for a product
    Public route
*/
router.get(
    "/product/:productId",
    getProductReviews
);

/*
    Create a review
    User must be logged in
*/
router.post(
    "/",
    protect,
    createReview
);

export default router;