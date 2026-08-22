import express from "express";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
} from "../controllers/addressController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


// Get all addresses
router.get(
    "/",
    protect,
    getAddresses
);


// Add address
router.post(
    "/",
    protect,
    addAddress
);


// Update address
router.put(
    "/:id",
    protect,
    updateAddress
);


// Delete address
router.delete(
    "/:id",
    protect,
    deleteAddress
);


export default router;