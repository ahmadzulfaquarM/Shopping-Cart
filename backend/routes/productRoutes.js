import express from "express";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/ProductController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    createProduct
);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put(
    "/:id",
    protect,
    admin,
    upload.single("image"),
    updateProduct
);

router.delete("/:id",protect,admin, deleteProduct);

export default router;