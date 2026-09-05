// Add these imports at the top of orderRoutes.js:
import {
    getOrderChatMessages,
    sendOrderChatMessage,
} from "../controllers/chatController.js";

// Add these two routes alongside your existing order routes
// (wherever /:id/cancel etc. are defined):
router.get("/:id/chat", protect, getOrderChatMessages);
router.post("/:id/chat", protect, sendOrderChatMessage);
