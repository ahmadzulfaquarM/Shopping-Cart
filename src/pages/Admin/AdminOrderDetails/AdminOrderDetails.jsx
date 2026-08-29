import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaBoxOpen,
    FaMapMarkerAlt,
    FaCreditCard,
} from "react-icons/fa";

import { getAdminOrderById, updateOrderStatus } from "../../../services/orderService";

const AdminOrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");


    useEffect(() => {

        const fetchOrder = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getAdminOrderById(id);

                setOrder(data.order);

            } catch (error) {

                console.error(
                    "Admin Order Details Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load order details"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchOrder();

    }, [id]);


    const handleStatusChange = async (event) => {

        const newStatus = event.target.value;

        try {

            setUpdatingStatus(true);
            setError("");
            setStatusMessage("");

            const data = await updateOrderStatus(
                order._id,
                newStatus
            );

            setOrder(data.order);

            setStatusMessage(
                `Order status updated to ${newStatus}.`
            );

        } catch (error) {

            console.error(
                "Update Order Status Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdatingStatus(false);

        }
    };


    // Loading

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">

                <p className="text-lg font-medium text-gray-600">
                    Loading order...
                </p>

            </div>
        );
    }


    // Error

    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10">

                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="font-medium text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Back to Orders
                    </button>

                </div>

            </div>
        );
    }


    if (!order) {
        return null;
    }


    const getStatusStyle = () => {

        switch (order.orderStatus) {

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
        <div className="min-h-screen bg-gray-50 px-4 py-10">

            <div className="mx-auto max-w-6xl">

                {/* Back */}

                <button
                    onClick={() =>
                        navigate("/admin/orders")
                    }
                    className="mb-6 flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
                >
                    <FaArrowLeft />
                    Back to Orders
                </button>


                {/* Header */}

                
                {statusMessage && (
                    <div className="mb-6 rounded-xl bg-green-100 px-5 py-4 font-medium text-green-700">
                        {statusMessage}
                    </div>
                )}

                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                        <div>

                            <h1 className="text-2xl font-bold text-gray-900">
                                Admin Order Details
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Order ID: #{order._id}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Placed on{" "}
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>

                        </div>

                        <div className="flex flex-col items-start gap-2 sm:items-end">

                            <p className="text-sm font-medium text-gray-500">
                                Update Order Status
                            </p>

                            <select
                                value={order.orderStatus}
                                onChange={handleStatusChange}
                                disabled={
                                    updatingStatus ||
                                    order.orderStatus === "cancelled"
                                }
                                className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold capitalize outline-none transition ${order.orderStatus === "processing"
                                    ? "border-yellow-300 bg-yellow-100 text-yellow-700"
                                    : order.orderStatus === "confirmed"
                                        ? "border-blue-300 bg-blue-100 text-blue-700"
                                        : order.orderStatus === "shipped"
                                            ? "border-purple-300 bg-purple-100 text-purple-700"
                                            : order.orderStatus === "delivered"
                                                ? "border-green-300 bg-green-100 text-green-700"
                                                : "border-red-300 bg-red-100 text-red-700"
                                    }`}
                            >

                                <option value="processing">
                                    Processing
                                </option>

                                <option value="confirmed">
                                    Confirmed
                                </option>

                                <option value="shipped">
                                    Shipped
                                </option>

                                <option value="delivered">
                                    Delivered
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>

                            </select>

                            {updatingStatus && (
                                <p className="text-xs text-gray-500">
                                    Updating...
                                </p>
                            )}

                        </div>

                    </div>

                </div>


                <div className="grid gap-8 lg:grid-cols-3">

                    {/* LEFT */}

                    <div className="space-y-8 lg:col-span-2">

                        {/* Customer */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-xl font-bold text-gray-900">
                                Customer Information
                            </h2>

                            <div className="rounded-xl bg-gray-50 p-5">

                                <p className="font-bold text-gray-900">
                                    {order.user?.name ||
                                        "Unknown"}
                                </p>

                                <p className="mt-2 text-gray-600">
                                    {order.user?.email ||
                                        "No email"}
                                </p>

                            </div>

                        </div>


                        {/* Ordered Items */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaBoxOpen className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">
                                    Ordered Items
                                </h2>

                            </div>

                            <div className="space-y-5">

                                {order.items.map((item) => (

                                    <div
                                        key={item._id}
                                        className="flex gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-20 w-20 rounded-xl bg-gray-50 object-contain p-2"
                                        />

                                        <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">

                                            <div>

                                                <p className="font-semibold text-gray-900">
                                                    {item.name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Quantity:{" "}
                                                    {item.quantity}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Price: ₹
                                                    {item.price}
                                                </p>

                                            </div>

                                            <p className="mt-3 font-bold text-gray-900 sm:mt-0">
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Shipping Address */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaMapMarkerAlt className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">
                                    Shipping Address
                                </h2>

                            </div>

                            <div className="rounded-xl bg-gray-50 p-5">

                                <p className="font-bold text-gray-900">
                                    {order.shippingAddress.fullName}
                                </p>

                                <p className="mt-2 text-gray-600">
                                    {order.shippingAddress.address}
                                </p>

                                <p className="text-gray-600">
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.state} -{" "}
                                    {order.shippingAddress.pincode}
                                </p>

                                <p className="mt-2 text-gray-600">
                                    Phone:{" "}
                                    {order.shippingAddress.phone}
                                </p>

                            </div>

                        </div>


                        {/* Payment */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaCreditCard className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">
                                    Payment Information
                                </h2>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">

                                <div className="rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">
                                        Payment Method
                                    </p>

                                    <p className="mt-1 font-semibold uppercase">
                                        {order.paymentMethod}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">
                                        Payment Status
                                    </p>

                                    <p className="mt-1 font-semibold capitalize">
                                        {order.paymentStatus}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT */}

                    <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                        <h2 className="mb-6 text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{order.subtotal}
                                </span>

                            </div>

                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Delivery
                                </span>

                                <span className="font-semibold text-green-600">
                                    {order.deliveryFee === 0
                                        ? "FREE"
                                        : `₹${order.deliveryFee}`}
                                </span>

                            </div>

                        </div>

                        <div className="my-5 h-px bg-gray-200" />

                        <div className="flex justify-between">

                            <span className="text-lg font-bold">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-blue-600">
                                ₹{order.totalPrice}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminOrderDetails;