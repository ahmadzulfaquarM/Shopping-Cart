import express from "express";

import {
    createContactMessage,
    verifyContactEmail,
    getContactMessages,
    getContactMessage,
    updateContactStatus,
    deleteContactMessage,
    replyToContactMessage,
} from "../controllers/contactController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| CUSTOMER ROUTES
|--------------------------------------------------------------------------
*/

// Submit contact form
router.post(
    "/",
    createContactMessage
);

// Verify email
router.get(
    "/verify/:token",
    verifyContactEmail
);


/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

// Get all verified contact messages
router.get(
    "/admin",
    protect,
    adminOnly,
    getContactMessages
);

// Get one contact message
router.get(
    "/admin/:id",
    protect,
    adminOnly,
    getContactMessage
);

// Update status
router.patch(
    "/admin/:id/status",
    protect,
    adminOnly,
    updateContactStatus
);

// Reply
router.post(
    "/admin/:id/reply",
    protect,
    adminOnly,
    replyToContactMessage
);

// Delete
router.delete(
    "/admin/:id",
    protect,
    adminOnly,
    deleteContactMessage
);


export default router;