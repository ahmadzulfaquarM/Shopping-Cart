import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaBoxOpen,
    FaMapMarkerAlt,
    FaCreditCard,
    FaUser,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaTruck,
    FaTimesCircle,
    FaRupeeSign,
} from "react-icons/fa";

import {
    getAdminOrderById,
    updateOrderStatus,
} from "../../../services/orderService";


const AdminOrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingStatus, setUpdatingStatus] =
        useState(false);

    const [statusMessage, setStatusMessage] =
        useState("");


    // ======================================================
    // FETCH ORDER
    // ======================================================

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


    // ======================================================
    // STATUS CHANGE
    // ======================================================

    const handleStatusChange = async (event) => {

        const newStatus = event.target.value;

        if (!order) {
            return;
        }

        if (newStatus === order.orderStatus) {
            return;
        }

        try {

            setUpdatingStatus(true);

            setError("");

            setStatusMessage("");


            const data =
                await updateOrderStatus(
                    order._id,
                    newStatus
                );


            setOrder(data.order);


            setStatusMessage(
                `Order status updated to ${formatStatus(
                    newStatus
                )}.`
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


    // ======================================================
    // FORMAT STATUS
    // ======================================================

    const formatStatus = (status) => {

        if (!status) {
            return "";
        }

        return status
            .charAt(0)
            .toUpperCase() +
            status.slice(1);
    };


    // ======================================================
    // STATUS STYLE
    // ======================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "processing":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";

            case "confirmed":
                return "bg-blue-100 text-blue-700 border-blue-300";

            case "shipped":
                return "bg-purple-100 text-purple-700 border-purple-300";

            case "delivered":
                return "bg-green-100 text-green-700 border-green-300";

            case "cancelled":
                return "bg-red-100 text-red-700 border-red-300";

            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };


    // ======================================================
    // STATUS ICON
    // ======================================================

    const getStatusIcon = (status) => {

        switch (status) {

            case "processing":
                return <FaClock />;

            case "confirmed":
                return <FaCheckCircle />;

            case "shipped":
                return <FaTruck />;

            case "delivered":
                return <FaCheckCircle />;

            case "cancelled":
                return <FaTimesCircle />;

            default:
                return null;
        }
    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">

                <p className="font-medium text-gray-600">
                    Loading order...
                </p>

            </div>
        );
    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error && !order) {

        return (
            <div className="min-h-[60vh] bg-gray-50 px-4 py-10">

                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="font-semibold text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
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


    return (

        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="mx-auto max-w-6xl">


                {/* ==================================================
                    BACK BUTTON
                ================================================== */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/orders")
                    }
                    className="mb-6 flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-800"
                >

                    <FaArrowLeft />

                    Back to Orders

                </button>


                {/* ==================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {statusMessage && (

                    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 font-medium text-green-700">

                        {statusMessage}

                    </div>

                )}


                {/* ==================================================
                    ERROR MESSAGE
                ================================================== */}

                {error && (

                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-700">

                        {error}

                    </div>

                )}


                {/* ==================================================
                    ORDER HEADER
                ================================================== */}

                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">


                        {/* ORDER INFORMATION */}

                        <div>

                            <h1 className="text-2xl font-bold text-gray-900">

                                Order Details

                            </h1>


                            <p className="mt-2 text-sm text-gray-500">

                                Order ID: #

                                {order._id}

                            </p>


                            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                                <FaCalendarAlt />

                                Placed on{" "}

                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}

                            </p>

                        </div>


                        {/* STATUS */}

                        <div className="flex flex-col items-start gap-3 lg:items-end">

                            <p className="text-sm font-semibold text-gray-600">

                                Order Status

                            </p>


                            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">

                                <div
                                    className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${getStatusStyle(
                                        order.orderStatus
                                    )}`}
                                >

                                    {getStatusIcon(
                                        order.orderStatus
                                    )}

                                    {formatStatus(
                                        order.orderStatus
                                    )}

                                </div>


                                {/* STATUS UPDATE */}

                                {order.orderStatus !==
                                    "delivered" &&
                                    order.orderStatus !==
                                    "cancelled" && (

                                        <select
                                            value={
                                                order.orderStatus
                                            }
                                            onChange={
                                                handleStatusChange
                                            }
                                            disabled={
                                                updatingStatus
                                            }
                                            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold capitalize text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        >

                                            {/* PROCESSING */}

                                            {order.orderStatus ===
                                                "processing" && (
                                                    <>

                                                        <option value="processing">
                                                            Processing
                                                        </option>

                                                        <option value="confirmed">
                                                            Confirmed
                                                        </option>

                                                        <option value="cancelled">
                                                            Cancelled
                                                        </option>

                                                    </>
                                                )}


                                            {/* CONFIRMED */}

                                            {order.orderStatus ===
                                                "confirmed" && (
                                                    <>

                                                        <option value="confirmed">
                                                            Confirmed
                                                        </option>

                                                        <option value="shipped">
                                                            Shipped
                                                        </option>

                                                        <option value="cancelled">
                                                            Cancelled
                                                        </option>

                                                    </>
                                                )}


                                            {/* SHIPPED */}

                                            {order.orderStatus ===
                                                "shipped" && (
                                                    <>

                                                        <option value="shipped">
                                                            Shipped
                                                        </option>

                                                        <option value="delivered">
                                                            Delivered
                                                        </option>

                                                    </>
                                                )}

                                        </select>

                                    )}

                            </div>


                            {updatingStatus && (

                                <p className="text-xs text-gray-500">

                                    Updating order status...

                                </p>

                            )}


                            {order.orderStatus ===
                                "delivered" && (

                                    <p className="text-xs font-medium text-green-600">

                                        Order completed.

                                    </p>

                                )}


                            {order.orderStatus ===
                                "cancelled" && (

                                    <p className="text-xs font-medium text-red-600">

                                        This order has been cancelled.

                                    </p>

                                )}

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    MAIN CONTENT
                ================================================== */}

                <div className="grid gap-8 lg:grid-cols-3">


                    {/* ==================================================
                        LEFT SIDE
                    ================================================== */}

                    <div className="space-y-8 lg:col-span-2">


                        {/* ==================================================
                            CUSTOMER INFORMATION
                        ================================================== */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaUser className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">

                                    Customer Information

                                </h2>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-2">


                                <div className="rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">

                                        Name

                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">

                                        {order.user?.name ||
                                            "Unknown"}

                                    </p>

                                </div>


                                <div className="rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">

                                        Email

                                    </p>

                                    <p className="mt-1 break-all font-semibold text-gray-900">

                                        {order.user?.email ||
                                            "No email"}

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ==================================================
                            ORDERED ITEMS
                        ================================================== */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaBoxOpen className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">

                                    Ordered Items

                                </h2>

                            </div>


                            <div className="space-y-5">

                                {order.items?.map(
                                    (item) => (

                                        <div
                                            key={
                                                item._id ||
                                                item.product
                                            }
                                            className="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0 sm:flex-row"
                                        >


                                            {/* IMAGE */}

                                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">

                                                <img
                                                    src={
                                                        item.image
                                                    }
                                                    alt={
                                                        item.name
                                                    }
                                                    className="h-full w-full object-contain p-2"
                                                />

                                            </div>


                                            {/* ITEM INFORMATION */}

                                            <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">

                                                <div>

                                                    <p className="font-semibold text-gray-900">

                                                        {
                                                            item.name
                                                        }

                                                    </p>


                                                    <p className="mt-2 text-sm text-gray-500">

                                                        Quantity:{" "}

                                                        {
                                                            item.quantity
                                                        }

                                                    </p>


                                                    <p className="mt-1 text-sm text-gray-500">

                                                        Unit Price: ₹

                                                        {
                                                            item.price
                                                        }

                                                    </p>

                                                </div>


                                                <div className="text-left sm:text-right">

                                                    <p className="text-sm text-gray-500">

                                                        Item Total

                                                    </p>

                                                    <p className="mt-1 font-bold text-gray-900">

                                                        ₹

                                                        {(
                                                            Number(
                                                                item.price
                                                            ) *
                                                            Number(
                                                                item.quantity
                                                            )
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                        {/* ==================================================
                            SHIPPING ADDRESS
                        ================================================== */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaMapMarkerAlt className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">

                                    Shipping Address

                                </h2>

                            </div>


                            <div className="rounded-xl bg-gray-50 p-5">

                                <p className="font-bold text-gray-900">

                                    {
                                        order
                                            .shippingAddress
                                            ?.fullName ||
                                        "N/A"
                                    }

                                </p>


                                <p className="mt-2 text-gray-600">

                                    {
                                        order
                                            .shippingAddress
                                            ?.address ||
                                        "N/A"
                                    }

                                </p>


                                <p className="text-gray-600">

                                    {
                                        order
                                            .shippingAddress
                                            ?.city ||
                                        "N/A"
                                    }

                                    ,{" "}

                                    {
                                        order
                                            .shippingAddress
                                            ?.state ||
                                        "N/A"
                                    }

                                    {" - "}

                                    {
                                        order
                                            .shippingAddress
                                            ?.pincode ||
                                        "N/A"
                                    }

                                </p>


                                <p className="mt-2 text-gray-600">

                                    Phone:{" "}

                                    {
                                        order
                                            .shippingAddress
                                            ?.phone ||
                                        "N/A"
                                    }

                                </p>

                            </div>

                        </div>


                        {/* ==================================================
                            PAYMENT INFORMATION
                        ================================================== */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <FaCreditCard className="text-xl text-blue-600" />

                                <h2 className="text-xl font-bold text-gray-900">

                                    Payment Information

                                </h2>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-2">


                                {/* PAYMENT METHOD */}

                                <div className="rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">

                                        Payment Method

                                    </p>

                                    <p className="mt-1 font-semibold uppercase text-gray-900">

                                        {order.paymentMethod ||
                                            "N/A"}

                                    </p>

                                </div>


                                {/* PAYMENT STATUS */}

                                <div className="rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">

                                        Payment Status

                                    </p>

                                    <p
                                        className={`mt-1 font-semibold capitalize ${
                                            order.paymentStatus ===
                                            "paid"
                                                ? "text-green-600"
                                                : order.paymentStatus ===
                                                  "failed"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }`}
                                    >

                                        {order.paymentStatus ||
                                            "pending"}

                                    </p>

                                </div>


                                {/* RAZORPAY ORDER ID */}

                                {order.razorpayOrderId && (

                                    <div className="rounded-xl bg-gray-50 p-5">

                                        <p className="text-sm text-gray-500">

                                            Razorpay Order ID

                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-gray-900">

                                            {
                                                order.razorpayOrderId
                                            }

                                        </p>

                                    </div>

                                )}


                                {/* RAZORPAY PAYMENT ID */}

                                {order.razorpayPaymentId && (

                                    <div className="rounded-xl bg-gray-50 p-5">

                                        <p className="text-sm text-gray-500">

                                            Razorpay Payment ID

                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-gray-900">

                                            {
                                                order.razorpayPaymentId
                                            }

                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        RIGHT SIDE - ORDER SUMMARY
                    ================================================== */}

                    <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">

                        <div className="mb-6 flex items-center gap-3">

                            <FaRupeeSign className="text-xl text-blue-600" />

                            <h2 className="text-xl font-bold text-gray-900">

                                Order Summary

                            </h2>

                        </div>


                        <div className="space-y-4">


                            {/* SUBTOTAL */}

                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span className="font-medium text-gray-900">

                                    ₹

                                    {Number(
                                        order.subtotal || 0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </span>

                            </div>


                            {/* DELIVERY */}

                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Delivery
                                </span>

                                <span
                                    className={
                                        Number(
                                            order.deliveryFee
                                        ) === 0
                                            ? "font-semibold text-green-600"
                                            : "font-medium text-gray-900"
                                    }
                                >

                                    {Number(
                                        order.deliveryFee || 0
                                    ) === 0
                                        ? "FREE"
                                        : `₹${Number(
                                              order.deliveryFee
                                          ).toLocaleString(
                                              "en-IN"
                                          )}`}

                                </span>

                            </div>

                        </div>


                        <div className="my-6 h-px bg-gray-200" />


                        {/* TOTAL */}

                        <div className="flex items-center justify-between">

                            <span className="text-lg font-bold text-gray-900">

                                Total

                            </span>

                            <span className="text-2xl font-bold text-blue-600">

                                ₹

                                {Number(
                                    order.totalPrice || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </span>

                        </div>


                        {/* STATUS SUMMARY */}

                        <div className="mt-6 rounded-xl bg-gray-50 p-4">

                            <p className="text-sm text-gray-500">

                                Current Status

                            </p>

                            <div
                                className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${getStatusStyle(
                                    order.orderStatus
                                )}`}
                            >

                                {getStatusIcon(
                                    order.orderStatus
                                )}

                                {formatStatus(
                                    order.orderStatus
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default AdminOrderDetails;