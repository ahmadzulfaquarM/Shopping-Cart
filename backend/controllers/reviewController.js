import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* =========================================
   CREATE REVIEW
========================================= */

export const createReview = async (req, res) => {
    try {
        const {
            productId,
            orderId,
            rating,
            comment,
        } = req.body;

        /* =========================================
           BASIC VALIDATION
        ========================================= */

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        if (!rating) {
            return res.status(400).json({
                success: false,
                message: "Rating is required",
            });
        }

        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: "Review comment is required",
            });
        }

        /* =========================================
           VALIDATE RATING
        ========================================= */

        const numericRating = Number(rating);

        if (
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Rating must be an integer between 1 and 5",
            });
        }

        /* =========================================
           VALIDATE COMMENT LENGTH
        ========================================= */

        const trimmedComment = comment.trim();

        if (trimmedComment.length < 3) {
            return res.status(400).json({
                success: false,
                message:
                    "Review must contain at least 3 characters",
            });
        }

        if (trimmedComment.length > 1000) {
            return res.status(400).json({
                success: false,
                message:
                    "Review cannot exceed 1000 characters",
            });
        }

        /* =========================================
           CHECK PRODUCT
        ========================================= */

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        /* =========================================
           CHECK ORDER
        ========================================= */

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        /* =========================================
           ORDER MUST BE DELIVERED
        ========================================= */

        if (order.orderStatus !== "delivered") {
            return res.status(400).json({
                success: false,
                message:
                    "You can review a product only after the order is delivered",
            });
        }

        /* =========================================
           CHECK PRODUCT WAS IN THE ORDER
        ========================================= */

        const purchasedProduct = order.items.some((item) => {
            /*
             * item.product can be:
             *
             * 1. ObjectId
             * 2. Populated product object
             *
             * Handle both cases.
             */

            const itemProductId =
                item.product?._id?.toString() ||
                item.product?.toString();

            return (
                itemProductId ===
                productId.toString()
            );
        });

        if (!purchasedProduct) {
            return res.status(403).json({
                success: false,
                message:
                    "You can review only products purchased in this order",
            });
        }

        /* =========================================
           CHECK DUPLICATE REVIEW
        ========================================= */

        const existingReview = await Review.findOne({
            product: productId,
            user: req.user._id,
            order: orderId,
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already reviewed this product for this order",
            });
        }

        /* =========================================
           CREATE REVIEW
        ========================================= */

        const review = await Review.create({
            product: productId,
            user: req.user._id,
            order: orderId,
            rating: numericRating,
            comment: trimmedComment,
        });

        /* =========================================
           RECALCULATE PRODUCT RATING
        ========================================= */

        const reviews = await Review.find({
            product: productId,
        });

        const totalReviews = reviews.length;

        const totalRating = reviews.reduce(
            (sum, review) =>
                sum + review.rating,
            0
        );

        const averageRating =
            totalReviews > 0
                ? totalRating / totalReviews
                : 0;

        /* =========================================
           UPDATE PRODUCT
        ========================================= */

        product.rating = Number(
            averageRating.toFixed(1)
        );

        product.numReviews = totalReviews;

        await product.save();

        /* =========================================
           RESPONSE
        ========================================= */

        return res.status(201).json({
            success: true,
            message:
                "Review submitted successfully",
            review,
            rating: product.rating,
            numReviews: product.numReviews,
        });
    } catch (error) {
        console.error(
            "Create Review Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


/* =========================================
   GET PRODUCT REVIEWS
========================================= */

export const getProductReviews = async (
    req,
    res
) => {
    try {
        const { productId } = req.params;

        /* =========================================
           CHECK PRODUCT
        ========================================= */

        const product =
            await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        /* =========================================
           GET REVIEWS
        ========================================= */

        const reviews =
            await Review.find({
                product: productId,
            })
                .populate(
                    "user",
                    "name"
                )
                .sort({
                    createdAt: -1,
                });

        /* =========================================
           RESPONSE
        ========================================= */

        return res.status(200).json({
            success: true,
            reviews,
            count: reviews.length,
        });
    } catch (error) {
        console.error(
            "Get Product Reviews Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};