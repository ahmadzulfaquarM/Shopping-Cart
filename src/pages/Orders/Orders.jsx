import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaEye } from "react-icons/fa";
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

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-lg font-medium text-gray-600">
                    Loading orders...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <p className="font-medium text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">

            {/* Header */}

            <div className="mx-auto mb-8 max-w-5xl">

                <h1 className="text-3xl font-bold text-gray-900">
                    My Orders
                </h1>

                <p className="mt-2 text-gray-500">
                    View and track your orders
                </p>

            </div>


            {/* No Orders */}

            {orders.length === 0 ? (

                <div className="mx-auto max-w-5xl rounded-2xl bg-white p-12 text-center shadow-sm">

                    <FaBoxOpen className="mx-auto mb-5 text-5xl text-gray-300" />

                    <h2 className="text-xl font-bold text-gray-800">
                        No orders yet
                    </h2>

                    <p className="mt-2 text-gray-500">
                        You haven't placed any orders yet.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Start Shopping
                    </button>

                </div>

            ) : (

                /* Orders */

                <div className="mx-auto max-w-5xl space-y-5">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="rounded-2xl bg-white p-6 shadow-sm"
                        >

                            {/* Order Header */}

                            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Order ID
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        #{order._id}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">
                                        Order Date
                                    </p>

                                    <p className="mt-1 font-medium text-gray-800">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>


                                <span
                                    className={`w-fit rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                                        order.orderStatus === "processing"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.orderStatus === "confirmed"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.orderStatus === "shipped"
                                            ? "bg-purple-100 text-purple-700"
                                            : order.orderStatus === "delivered"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {order.orderStatus}
                                </span>

                            </div>


                            {/* Products */}

                            <div className="mt-5 space-y-4">

                                {order.items.map((item) => (

                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between gap-4"
                                    >

                                        <div className="flex min-w-0 items-center gap-4">

                                            {/* Clickable Product Image */}

                                            <Link
                                                to={`/products/${
                                                    item.product?._id ||
                                                    item.product
                                                }`}
                                                className="shrink-0"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-16 w-16 rounded-xl bg-gray-50 object-contain p-2 transition-transform duration-200 hover:scale-105"
                                                />
                                            </Link>


                                            <div className="min-w-0">

                                                <p className="truncate font-semibold text-gray-800">
                                                    {item.name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>

                                            </div>

                                        </div>


                                        <p className="shrink-0 font-semibold text-gray-900">
                                            ₹{item.price * item.quantity}
                                        </p>

                                    </div>

                                ))}

                            </div>


                            {/* Footer */}

                            <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Total Amount
                                    </p>

                                    <p className="text-xl font-bold text-blue-600">
                                        ₹{order.totalPrice}
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate(
                                            `/orders/${order._id}`
                                        )
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <FaEye />
                                    View Order
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Orders;