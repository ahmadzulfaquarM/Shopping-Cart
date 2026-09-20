import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaEye, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { getMyOrders } from "../../services/orderService";

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyOrders();

                setOrders(data.orders || []);
            } catch (error) {
                console.error("Get Orders Error:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load orders"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "processing":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";
            case "confirmed":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "shipped":
                return "bg-purple-50 text-purple-700 border-purple-200";
            case "delivered":
                return "bg-green-50 text-green-700 border-green-200";
            case "cancelled":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 h-16 animate-pulse rounded-xl bg-gray-200" />

                    <div className="space-y-5">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                            >
                                <div className="h-5 w-40 rounded bg-gray-200" />
                                <div className="mt-6 h-16 rounded bg-gray-100" />
                                <div className="mt-5 h-10 rounded bg-gray-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <FaBoxOpen className="text-2xl text-red-500" />
                    </div>

                    <p className="mt-4 font-medium text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-10 sm:py-12">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Account
                    </p>

                    <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                My Orders
                            </h1>

                            <p className="mt-2 text-gray-500">
                                View and track your orders.
                            </p>
                        </div>

                        {orders.length > 0 && (
                            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                                {orders.length}{" "}
                                {orders.length === 1
                                    ? "Order"
                                    : "Orders"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:px-12">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                            <FaShoppingBag className="text-3xl text-blue-500" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                            No orders yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-gray-500">
                            You haven't placed any orders yet. Start
                            shopping and your orders will appear here.
                        </p>

                        <button
                            onClick={() => navigate("/products")}
                            className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">

                        {orders.map((order) => (
                            <article
                                key={order._id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            >

                                {/* Order Header */}
                                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Order ID
                                            </p>

                                            <p className="mt-1 truncate font-semibold text-gray-800">
                                                #{order._id}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Order Date
                                            </p>

                                            <p className="mt-1 font-medium text-gray-800">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </p>
                                        </div>

                                        <span
                                            className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="px-5 py-5 sm:px-6">
                                    <div className="space-y-4">

                                        {order.items.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex min-w-0 items-center justify-between gap-3"
                                            >
                                                <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                                                    <Link
                                                        to={`/products/${
                                                            item.product?._id ||
                                                            item.product
                                                        }`}
                                                        className="group shrink-0"
                                                    >
                                                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-slate-50 sm:h-20 sm:w-20">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                loading="lazy"
                                                                className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="min-w-0">
                                                        <Link
                                                            to={`/products/${
                                                                item.product?._id ||
                                                                item.product
                                                            }`}
                                                            className="block truncate font-semibold text-gray-800 transition hover:text-blue-600"
                                                        >
                                                            {item.name}
                                                        </Link>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Qty:{" "}
                                                            {item.quantity}
                                                        </p>
                                                    </div>

                                                </div>

                                                <p className="shrink-0 text-sm font-bold text-gray-900 sm:text-base">
                                                    ₹
                                                    {item.price *
                                                        item.quantity}
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col gap-4 border-t border-gray-100 bg-slate-50/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Total Amount
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-blue-600">
                                            ₹{order.totalPrice}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/orders/${order._id}`
                                            )
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                                    >
                                        <FaEye />
                                        View Order
                                    </button>

                                </div>
                            </article>
                        ))}

                    </div>
                )}
            </div>
        </section>
    );
};

export default Orders;