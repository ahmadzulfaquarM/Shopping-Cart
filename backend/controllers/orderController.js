import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";

export const createOrder = async (req, res) => {
    try {
        const {
            items,
            addressId,
            paymentMethod,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        if (!addressId) {
            return res.status(400).json({
                success: false,
                message: "Delivery address is required",
            });
        }

        if (!paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Payment method is required",
            });
        }

        const allowedPaymentMethods = [
            "cod",
            "online",
        ];

        if (!allowedPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method",
            });
        }

        const address = await Address.findOne({
            _id: addressId,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        const orderItems = [];
        let subtotal = 0;

        for (const item of items) {
            if (!item.product || !item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order item",
                });
            }

            if (item.quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Product quantity must be at least 1",
                });
            }

            const product = await Product.findById(
                item.product
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message:
                        `Product not found: ${item.product}`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message:
                        `${product.name} does not have enough stock`,
                });
            }

            const itemPrice =
                product.price * item.quantity;

            subtotal += itemPrice;

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
            });
        }

        const deliveryFee = 0;

        const totalPrice =
            subtotal + deliveryFee;

        const order = await Order.create({
            user: req.user._id,

            items: orderItems,

            shippingAddress: {
                fullName: address.fullName,
                phone: address.phone,
                address: address.address,
                city: address.city,
                state: address.state,
                pincode: address.postalCode,
            },

            paymentMethod,

            paymentStatus: "pending",

            orderStatus: "processing",

            subtotal,

            deliveryFee,

            totalPrice,
        });

        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error(
            "Create Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        })
            .populate(
                "items.product",
                "name price image"
            )
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {
        console.error(
            "Get My Orders Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        })
            .populate(
                "items.product",
                "name price image"
            );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error(
            "Get Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelOrder = async (req, res) => {
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

        if (
            order.orderStatus !== "processing" &&
            order.orderStatus !== "confirmed"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Order cannot be cancelled because it is already ${order.orderStatus}`,
            });
        }

        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity,
                    },
                }
            );
        }

        order.orderStatus = "cancelled";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });

    } catch (error) {
        console.error(
            "Cancel Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

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

        if (order.paymentMethod !== "online") {
            return res.status(400).json({
                success: false,
                message:
                    "This order is not an online payment order",
            });
        }

        if (order.paymentStatus === "paid") {
            return res.status(400).json({
                success: false,
                message: "Order is already paid",
            });
        }

        const amountInPaise = Math.round(
            order.totalPrice * 100
        );

        const razorpayOrder =
            await razorpay.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt: order._id.toString(),
            });

        order.razorpayOrderId =
            razorpayOrder.id;

        await order.save();

        return res.status(201).json({
            success: true,
            razorpayOrderId:
                razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key:
                process.env.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.error(
            "Create Razorpay Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const verifyRazorpayPayment = async (
    req,
    res
) => {
    try {
        const {
            orderId,
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
        } = req.body;

        if (
            !orderId ||
            !razorpayOrderId ||
            !razorpayPaymentId ||
            !razorpaySignature
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Payment details are required",
            });
        }

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

        if (
            order.razorpayOrderId !==
            razorpayOrderId
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid Razorpay order",
            });
        }

        if (order.paymentStatus === "paid") {
            return res.status(200).json({
                success: true,
                message: "Order is already paid",
                order,
            });
        }

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    `${order.razorpayOrderId}|${razorpayPaymentId}`
                )
                .digest("hex");

        if (
            generatedSignature !==
            razorpaySignature
        ) {
            order.paymentStatus = "failed";

            await order.save();

            return res.status(400).json({
                success: false,
                message:
                    "Payment signature verification failed",
            });
        }

        order.paymentStatus = "paid";

        order.razorpayPaymentId =
            razorpayPaymentId;

        order.razorpaySignature =
            razorpaySignature;

        order.orderStatus = "confirmed";

        await order.save();

        return res.status(200).json({
            success: true,
            message:
                "Payment verified successfully",
            order,
        });

    } catch (error) {
        console.error(
            "Verify Razorpay Payment Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllOrders = async (
    req,
    res
) => {
    try {
        const orders = await Order.find()
            .populate(
                "user",
                "name email"
            )
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {
        console.error(
            "Get All Orders Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateOrderStatus = async (
    req,
    res
) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "processing",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order =
            await Order.findById(
                req.params.id
            );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const currentStatus =
            order.orderStatus;

        const allowedTransitions = {
            processing: [
                "confirmed",
                "cancelled",
            ],

            confirmed: [
                "shipped",
                "cancelled",
            ],

            shipped: [
                "delivered",
            ],

            delivered: [],

            cancelled: [],
        };

        const possibleStatuses =
            allowedTransitions[
                currentStatus
            ] || [];

        if (currentStatus === status) {
            return res.status(400).json({
                success: false,
                message:
                    `Order is already ${currentStatus}`,
            });
        }

        if (
            !possibleStatuses.includes(
                status
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Cannot change order status from ${currentStatus} to ${status}`,
            });
        }

        order.orderStatus = status;

        await order.save();

        return res.status(200).json({
            success: true,
            message:
                "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.error(
            "Update Order Status Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAdminOrderById = async (
    req,
    res
) => {
    try {
        const order =
            await Order.findById(
                req.params.id
            )
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "items.product",
                    "name price image"
                );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error(
            "Get Admin Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};