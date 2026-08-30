import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";


// ======================================================
// ADMIN DASHBOARD STATISTICS
// ======================================================

export const getDashboardStats = async (req, res) => {
    try {

        const totalProducts = await Product.countDocuments();

        const totalUsers = await User.countDocuments();

        const totalOrders = await Order.countDocuments();

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

        const recentOrders = await Order.find()
            .populate(
                "user",
                "name email"
            )
            .sort({
                createdAt: -1,
            })
            .limit(5);

        const lowStockProducts = await Product.find({
            stock: {
                $lte: 5,
            },
        })
            .sort({
                stock: 1,
            })
            .limit(5);

        return res.status(200).json({

            success: true,

            stats: {
                totalProducts,
                totalOrders,
                totalUsers,
                totalRevenue,
            },

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
// ADMIN - GET SINGLE USER
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


        const orders = await Order.find({
            user: user._id,
        })
            .sort({
                createdAt: -1,
            });


        const totalOrders = orders.length;

        const deliveredOrders =
            orders.filter(
                order =>
                    order.orderStatus === "delivered"
            ).length;

        const processingOrders =
            orders.filter(
                order =>
                    order.orderStatus === "processing"
            ).length;

        const totalSpent = orders
            .filter(
                order =>
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
                totalSpent,
            },

            orders,

        });

    } catch (error) {

        console.error(
            "Get User By ID Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });
    }
};



// ======================================================
// ADMIN - DELETE USER
// ======================================================

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });
        }


        // Prevent deleting an admin
        if (user.role === "admin") {

            return res.status(400).json({

                success: false,

                message:
                    "Admin user cannot be deleted",

            });
        }


        await User.findByIdAndDelete(
            req.params.id
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
// ADMIN - BLOCK / UNBLOCK USER
// ======================================================

export const toggleUserBlock = async (
    req,
    res
) => {

    try {

        const user = await User.findById(
            req.params.id
        );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });
        }


        // Prevent blocking admin
        if (user.role === "admin") {

            return res.status(400).json({

                success: false,

                message:
                    "Admin user cannot be blocked",

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



// ======================================================
// ADMIN - GET ALL ORDERS
// ======================================================

export const getAllOrders = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 10,
            status,
            paymentStatus,
            search,
            startDate,
            endDate,
        } = req.query;


        const filter = {};


        // ----------------------------------------------
        // STATUS FILTER
        // ----------------------------------------------

        if (status) {

            filter.orderStatus = status;

        }


        // ----------------------------------------------
        // PAYMENT STATUS FILTER
        // ----------------------------------------------

        if (paymentStatus) {

            filter.paymentStatus =
                paymentStatus;

        }


        // ----------------------------------------------
        // DATE FILTER
        // ----------------------------------------------

        if (startDate || endDate) {

            filter.createdAt = {};

            if (startDate) {

                filter.createdAt.$gte =
                    new Date(startDate);

            }

            if (endDate) {

                const end = new Date(endDate);

                end.setHours(
                    23,
                    59,
                    59,
                    999
                );

                filter.createdAt.$lte = end;

            }
        }


        // ----------------------------------------------
        // CUSTOMER SEARCH
        // ----------------------------------------------

        let query = Order.find(filter)
            .populate(
                "user",
                "name email"
            )
            .populate(
                "items.product",
                "name price image"
            );


        if (search) {

            const matchingUsers =
                await User.find({

                    $or: [
                        {
                            name: {
                                $regex: search,
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: search,
                                $options: "i",
                            },
                        },
                    ],

                }).select("_id");


            const userIds =
                matchingUsers.map(
                    user => user._id
                );


            filter.user = {
                $in: userIds,
            };


            query = Order.find(filter)
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "items.product",
                    "name price image"
                );
        }


        // ----------------------------------------------
        // PAGINATION
        // ----------------------------------------------

        const currentPage =
            Math.max(
                Number(page) || 1,
                1
            );

        const itemsPerPage =
            Math.max(
                Number(limit) || 10,
                1
            );

        const skip =
            (currentPage - 1) *
            itemsPerPage;


        const totalOrders =
            await Order.countDocuments(
                filter
            );


        const orders =
            await query
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(itemsPerPage);


        return res.status(200).json({

            success: true,

            count: orders.length,

            totalOrders,

            page: currentPage,

            limit: itemsPerPage,

            totalPages:
                Math.ceil(
                    totalOrders /
                    itemsPerPage
                ),

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



// ======================================================
// ADMIN - ORDER STATISTICS
// ======================================================

export const getOrderStatistics = async (
    req,
    res
) => {

    try {

        const totalOrders =
            await Order.countDocuments();


        const processing =
            await Order.countDocuments({
                orderStatus: "processing",
            });


        const confirmed =
            await Order.countDocuments({
                orderStatus: "confirmed",
            });


        const shipped =
            await Order.countDocuments({
                orderStatus: "shipped",
            });


        const delivered =
            await Order.countDocuments({
                orderStatus: "delivered",
            });


        const cancelled =
            await Order.countDocuments({
                orderStatus: "cancelled",
            });


        const paid =
            await Order.countDocuments({
                paymentStatus: "paid",
            });


        const pendingPayment =
            await Order.countDocuments({
                paymentStatus: "pending",
            });


        const failedPayment =
            await Order.countDocuments({
                paymentStatus: "failed",
            });


        const revenueResult =
            await Order.aggregate([

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

                        revenue: {
                            $sum: "$totalPrice",
                        },
                    },
                },

            ]);


        const revenue =
            revenueResult.length > 0
                ? revenueResult[0].revenue
                : 0;


        return res.status(200).json({

            success: true,

            statistics: {

                totalOrders,

                processing,

                confirmed,

                shipped,

                delivered,

                cancelled,

                paid,

                pendingPayment,

                failedPayment,

                revenue,

            },

        });

    } catch (error) {

        console.error(
            "Order Statistics Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });
    }
};



// ======================================================
// ADMIN - GET SINGLE ORDER
// ======================================================

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



// ======================================================
// ADMIN - UPDATE ORDER STATUS
// ======================================================

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


        if (
            !allowedStatuses.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid order status",

            });
        }


        const order =
            await Order.findById(
                req.params.id
            );


        if (!order) {

            return res.status(404).json({

                success: false,

                message:
                    "Order not found",

            });
        }


        // ==================================================
        // PREVENT INVALID STATUS TRANSITIONS
        // ==================================================

        const validTransitions = {

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


        const currentStatus =
            order.orderStatus;


        if (
            currentStatus !== status &&
            !validTransitions[
                currentStatus
            ].includes(status)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `Cannot change order status from ${currentStatus} to ${status}`,

            });
        }


        // ==================================================
        // RESTORE STOCK WHEN CANCELLED
        // ==================================================

        if (
            status === "cancelled" &&
            currentStatus !== "cancelled"
        ) {

            for (
                const item of order.items
            ) {

                await Product.findByIdAndUpdate(

                    item.product,

                    {
                        $inc: {
                            stock:
                                item.quantity,
                        },
                    }
                );
            }
        }


        order.orderStatus =
            status;


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