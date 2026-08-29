import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// ======================================================
// ADMIN DASHBOARD STATISTICS
// ======================================================

export const getDashboardStats = async (req, res) => {
    try {

        // ==================================================
        // BASIC STATISTICS
        // ==================================================

        const totalProducts =
            await Product.countDocuments();

        const totalUsers =
            await User.countDocuments();

        const totalOrders =
            await Order.countDocuments();


        // ==================================================
        // TOTAL REVENUE
        // ==================================================

        // Count only paid and non-cancelled orders

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    orderStatus: {
                        $ne: "cancelled",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice",
                    },
                },
            },
        ]);


        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        // ==================================================
        // ORDER STATUS STATISTICS
        // ==================================================

        const statusResult = await Order.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);


        // Default values

        const orderStatusStats = {
            processing: 0,
            confirmed: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
        };


        // Fill actual values

        statusResult.forEach((item) => {

            if (
                Object.prototype.hasOwnProperty.call(
                    orderStatusStats,
                    item._id
                )
            ) {
                orderStatusStats[item._id] =
                    item.count;
            }

        });


        // ==================================================
        // RECENT ORDERS
        // ==================================================

        const recentOrders =
            await Order.find()
                .populate(
                    "user",
                    "name email"
                )
                .sort({
                    createdAt: -1,
                })
                .limit(5);


        // ==================================================
        // LOW STOCK PRODUCTS
        // ==================================================

        const lowStockProducts =
            await Product.find({
                stock: {
                    $lte: 5,
                },
            })
                .sort({
                    stock: 1,
                })
                .limit(5);


        // ==================================================
        // RESPONSE
        // ==================================================

        return res.status(200).json({

            success: true,

            stats: {
                totalProducts,
                totalOrders,
                totalUsers,
                totalRevenue,
            },

            orderStatusStats,

            recentOrders,

            lowStockProducts,

        });

    } catch (error) {

        console.error(
            "Admin Dashboard Stats Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};


// ======================================================
// ADMIN - GET ALL USERS
// ======================================================

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch (error) {

        console.error(
            "Get All Users Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET SINGLE USER DETAILS
// ======================================================

export const getUserById = async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        ).select("-password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }


        // Get user's orders

        const orders = await Order.find({
            user: user._id,
        })
            .sort({
                createdAt: -1,
            });


        // Order statistics

        const totalOrders = orders.length;

        const deliveredOrders =
            orders.filter(
                (order) =>
                    order.orderStatus === "delivered"
            ).length;

        const processingOrders =
            orders.filter(
                (order) =>
                    order.orderStatus === "processing"
            ).length;

        const cancelledOrders =
            orders.filter(
                (order) =>
                    order.orderStatus === "cancelled"
            ).length;


        // Total spent

        const totalSpent = orders
            .filter(
                (order) =>
                    order.paymentStatus === "paid" &&
                    order.orderStatus !== "cancelled"
            )
            .reduce(
                (total, order) =>
                    total + order.totalPrice,
                0
            );


        return res.status(200).json({

            success: true,

            user,

            statistics: {
                totalOrders,
                deliveredOrders,
                processingOrders,
                cancelledOrders,
                totalSpent,
            },

            orders,

        });

    } catch (error) {

        console.error(
            "Get User Details Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ======================================================
// DELETE USER
// ======================================================

export const deleteUser = async (req, res) => {

    try {

        const userId = req.params.id;


        // Prevent admin from deleting himself

        if (
            userId ===
            req.user._id.toString()
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "You cannot delete your own admin account",
            });

        }


        const user = await User.findById(
            userId
        );


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }


        // Prevent deleting another admin

        if (user.role === "admin") {

            return res.status(403).json({
                success: false,
                message:
                    "Admin accounts cannot be deleted",
            });

        }


        await User.findByIdAndDelete(
            userId
        );


        return res.status(200).json({

            success: true,

            message:
                "User deleted successfully",

        });

    } catch (error) {

        console.error(
            "Delete User Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ======================================================
// BLOCK / UNBLOCK USER
// ======================================================

export const toggleUserBlock = async (
    req,
    res
) => {

    try {

        const userId = req.params.id;


        // Prevent admin from blocking himself

        if (
            userId ===
            req.user._id.toString()
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "You cannot block your own admin account",
            });

        }


        const user = await User.findById(
            userId
        );


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }


        // Prevent blocking another admin

        if (user.role === "admin") {

            return res.status(403).json({
                success: false,
                message:
                    "Admin accounts cannot be blocked",
            });

        }


        user.isBlocked = !user.isBlocked;

        await user.save();


        return res.status(200).json({

            success: true,

            message: user.isBlocked
                ? "User blocked successfully"
                : "User unblocked successfully",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isBlocked: user.isBlocked,
            },

        });

    } catch (error) {

        console.error(
            "Toggle User Block Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};