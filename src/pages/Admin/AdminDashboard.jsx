import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import { getDashboardStats } from "../../services/adminServices";

import {
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaRupeeSign,
    FaTruck,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaPlus,
    FaEye,
} from "react-icons/fa";


const AdminDashboard = () => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [dashboardData, setDashboardData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==================================================
    // FETCH DASHBOARD DATA
    // ==================================================

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getDashboardStats();

                setDashboardData(data);

            } catch (error) {

                console.error(
                    "Dashboard Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">

                <p className="text-lg font-semibold text-gray-600">
                    Loading dashboard...
                </p>

            </div>
        );

    }


    // ==================================================
    // ERROR
    // ==================================================

    if (error) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="font-semibold text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );

    }


    const stats =
        dashboardData?.stats || {};

    const orderStatusStats =
        dashboardData?.orderStatusStats || {};

    const recentOrders =
        dashboardData?.recentOrders || [];

    const lowStockProducts =
        dashboardData?.lowStockProducts || [];


    // ==================================================
    // STAT CARDS
    // ==================================================

    const statCards = [

        {
            title: "Total Products",
            value: stats.totalProducts || 0,
            icon: FaBox,
        },

        {
            title: "Total Orders",
            value: stats.totalOrders || 0,
            icon: FaShoppingCart,
        },

        {
            title: "Total Users",
            value: stats.totalUsers || 0,
            icon: FaUsers,
        },

        {
            title: "Total Revenue",
            value: `₹${stats.totalRevenue || 0}`,
            icon: FaRupeeSign,
        },

    ];


    // ==================================================
    // STATUS CARDS
    // ==================================================

    const statusCards = [

        {
            title: "Processing",
            value: orderStatusStats.processing || 0,
            icon: FaClock,
            style: "bg-yellow-100 text-yellow-700",
        },

        {
            title: "Confirmed",
            value: orderStatusStats.confirmed || 0,
            icon: FaCheckCircle,
            style: "bg-blue-100 text-blue-700",
        },

        {
            title: "Shipped",
            value: orderStatusStats.shipped || 0,
            icon: FaTruck,
            style: "bg-purple-100 text-purple-700",
        },

        {
            title: "Delivered",
            value: orderStatusStats.delivered || 0,
            icon: FaCheckCircle,
            style: "bg-green-100 text-green-700",
        },

        {
            title: "Cancelled",
            value: orderStatusStats.cancelled || 0,
            icon: FaTimesCircle,
            style: "bg-red-100 text-red-700",
        },

    ];


    // ==================================================
    // ORDER STATUS STYLE
    // ==================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "processing":
                return "bg-yellow-100 text-yellow-700";

            case "confirmed":
                return "bg-blue-100 text-blue-700";

            case "shipped":
                return "bg-purple-100 text-purple-700";

            case "delivered":
                return "bg-green-100 text-green-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };


    return (

        <div className="min-h-screen bg-gray-50">

            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <AdminSidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />


            {/* ==================================================
                MAIN
            ================================================== */}

            <div className="lg:ml-64">

                <AdminTopbar
                    setIsOpen={setIsOpen}
                />


                <main className="p-4 md:p-8">

                    <div className="mx-auto max-w-7xl">


                        {/* ==================================================
                            HEADER
                        ================================================== */}

                        <div className="mb-8">

                            <h1 className="text-2xl font-bold text-gray-900">
                                Overview
                            </h1>

                            <p className="mt-1 text-gray-500">
                                Here's what's happening with your store.
                            </p>

                        </div>


                        {/* ==================================================
                            MAIN STATISTICS
                        ================================================== */}

                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            {statCards.map((stat) => {

                                const Icon =
                                    stat.icon;

                                return (

                                    <div
                                        key={stat.title}
                                        className="rounded-2xl bg-white p-6 shadow-sm"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <p className="text-sm font-medium text-gray-500">
                                                    {stat.title}
                                                </p>

                                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                                    {stat.value}
                                                </p>

                                            </div>


                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">

                                                <Icon />

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>


                        {/* ==================================================
                            ORDER STATUS
                        ================================================== */}

                        <div className="mt-8">

                            <div className="mb-5">

                                <h2 className="text-xl font-bold text-gray-900">
                                    Order Status
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Current order distribution
                                </p>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

                                {statusCards.map((status) => {

                                    const Icon =
                                        status.icon;

                                    return (

                                        <div
                                            key={status.title}
                                            className="rounded-2xl bg-white p-5 shadow-sm"
                                        >

                                            <div className="flex items-center justify-between">

                                                <div>

                                                    <p className="text-sm font-medium text-gray-500">
                                                        {status.title}
                                                    </p>

                                                    <p className="mt-2 text-2xl font-bold text-gray-900">
                                                        {status.value}
                                                    </p>

                                                </div>


                                                <div
                                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${status.style}`}
                                                >

                                                    <Icon />

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>


                        


                        {/* ==================================================
                            RECENT ORDERS
                        ================================================== */}

                        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                                <div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        Recent Orders
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Latest orders from your store
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate(
                                            "/admin/orders"
                                        )
                                    }
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </button>

                            </div>


                            {recentOrders.length === 0 ? (

                                <div className="mt-6 rounded-xl bg-gray-50 py-12 text-center">

                                    <FaShoppingCart className="mx-auto text-4xl text-gray-300" />

                                    <p className="mt-3 font-medium text-gray-600">
                                        No recent orders
                                    </p>

                                </div>

                            ) : (

                                <div className="mt-6 overflow-x-auto">

                                    <table className="w-full min-w-[700px]">

                                        <thead>

                                            <tr className="border-b border-gray-200">

                                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-500">
                                                    Order
                                                </th>

                                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-500">
                                                    Customer
                                                </th>

                                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-500">
                                                    Total
                                                </th>

                                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-500">
                                                    Status
                                                </th>

                                                <th className="px-4 py-4 text-right text-sm font-semibold text-gray-500">
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody className="divide-y divide-gray-100">

                                            {recentOrders.map(
                                                (order) => (

                                                    <tr
                                                        key={
                                                            order._id
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >

                                                        <td className="px-4 py-4">

                                                            <p className="font-semibold text-gray-900">
                                                                #
                                                                {
                                                                    order._id.slice(
                                                                        -8
                                                                    )
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {new Date(
                                                                    order.createdAt
                                                                ).toLocaleDateString()}
                                                            </p>

                                                        </td>


                                                        <td className="px-4 py-4">

                                                            <p className="font-semibold text-gray-900">
                                                                {
                                                                    order
                                                                        .user
                                                                        ?.name ||
                                                                    "Unknown"
                                                                }
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    order
                                                                        .user
                                                                        ?.email ||
                                                                    "No email"
                                                                }
                                                            </p>

                                                        </td>


                                                        <td className="px-4 py-4 font-bold text-gray-900">
                                                            ₹
                                                            {
                                                                order.totalPrice
                                                            }
                                                        </td>


                                                        <td className="px-4 py-4">

                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                                                                    order.orderStatus
                                                                )}`}
                                                            >
                                                                {
                                                                    order.orderStatus
                                                                }
                                                            </span>

                                                        </td>


                                                        <td className="px-4 py-4 text-right">

                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/orders/${order._id}`
                                                                    )
                                                                }
                                                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                                                            >

                                                                <FaEye />

                                                                View

                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>


                        {/* ==================================================
                            LOW STOCK PRODUCTS
                        ================================================== */}

                        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                                <div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        Low Stock Products
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Products that need your attention
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate(
                                            "/admin/products"
                                        )
                                    }
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    Manage Products
                                </button>

                            </div>


                            {lowStockProducts.length === 0 ? (

                                <div className="mt-6 rounded-xl bg-green-50 py-8 text-center">

                                    <p className="font-medium text-green-700">
                                        All products have sufficient stock.
                                    </p>

                                </div>

                            ) : (

                                <div className="mt-6 space-y-3">

                                    {lowStockProducts.map(
                                        (product) => (

                                            <div
                                                key={
                                                    product._id
                                                }
                                                className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                                            >

                                                <div className="flex items-center gap-4">

                                                    <img
                                                        src={
                                                            product.image
                                                        }
                                                        alt={
                                                            product.name
                                                        }
                                                        className="h-14 w-14 rounded-lg bg-white object-contain p-2"
                                                    />

                                                    <div>

                                                        <p className="font-semibold text-gray-900">
                                                            {
                                                                product.name
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                product.brand
                                                            }
                                                        </p>

                                                    </div>

                                                </div>


                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                        product.stock ===
                                                        0
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >

                                                    {product.stock ===
                                                    0
                                                        ? "Out of stock"
                                                        : `${product.stock} left`}

                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

};

export default AdminDashboard;