import ChatMessage from "../models/ChatMessage.js";
import Order from "../models/Order.js";

// Stand-in for a real support inbox. Once you build an admin panel for
// support staff to reply live, remove this and just create the user
// message — an admin route would create the "support" message instead.
const generateAutoReply = (order, text) => {
    const lower = text.toLowerCase();

    if (lower.includes("refund")) {
        return "We've noted your refund request. Our team will review your order and follow up within 24 hours.";
    }

    if (lower.includes("where is") || lower.includes("track")) {
        return `Your order is currently "${order.orderStatus}". Check the tracking timeline above for the latest update.`;
    }

    if (lower.includes("damage")) {
        return "Sorry to hear that! Please share a photo of the damaged item and we'll arrange a replacement.";
    }

    if (lower.includes("address")) {
        return "Delivery address changes are only possible before the order ships. Let us know right away if it hasn't shipped yet.";
    }

    return "Thanks for reaching out! Our support team will get back to you shortly.";
};

export const getOrderChatMessages = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const messages = await ChatMessage.find({
            order: order._id,
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {
        console.error("Get Order Chat Messages Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendOrderChatMessage = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message text is required",
            });
        }

        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const userMessage = await ChatMessage.create({
            order: order._id,
            user: req.user._id,
            sender: "user",
            text: text.trim(),
        });

        const supportMessage = await ChatMessage.create({
            order: order._id,
            user: req.user._id,
            sender: "support",
            text: generateAutoReply(order, text),
        });

        return res.status(201).json({
            success: true,
            userMessage,
            supportMessage,
        });

    } catch (error) {
        console.error("Send Order Chat Message Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
