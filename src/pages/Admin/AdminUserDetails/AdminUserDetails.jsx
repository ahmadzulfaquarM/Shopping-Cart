import React, { useEffect, useState } from "react";

import {
    FaArrowLeft,
    FaUser,
    FaEnvelope,
    FaShoppingCart,
    FaRupeeSign,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaBoxOpen,
} from "react-icons/fa";

import {
    getUserById,
} from "../../../services/adminServices";

import {
    useNavigate,
    useParams,
} from "react-router-dom";


const AdminUserDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    // ======================================================
    // STATE
    // ======================================================

    const [user, setUser] = useState(null);

    const [statistics, setStatistics] =
        useState(null);

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ======================================================
    // FETCH USER DETAILS
    // ======================================================

    useEffect(() => {

        const fetchUser = async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getUserById(id);


                setUser(data.user);

                setStatistics(
                    data.statistics
                );

                setOrders(
                    data.orders || []
                );

            } catch (error) {

                console.error(
                    "Admin User Details Error:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    "Failed to load user"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchUser();

    }, [id]);


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

                    <p className="mt-4 font-medium text-gray-600">
                        Loading user...
                    </p>

                </div>

            </div>

        );

    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (

            <div className="rounded-2xl bg-red-50 p-6">

                <p className="font-semibold text-red-600">
                    {error}
                </p>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/users")
                    }
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Back to Users
                </button>

            </div>

        );

    }


    // ======================================================
    // SAFETY CHECK
    // ======================================================

    if (!user) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                <FaUser className="mx-auto text-4xl text-gray-300" />

                <p className="mt-4 font-semibold text-gray-600">
                    User not found
                </p>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/users")
                    }
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    Back to Users
                </button>

            </div>

        );

    }


    // ======================================================
    // STATISTICS FALLBACK
    // ======================================================

    const totalOrders =
        statistics?.totalOrders || 0;

    const deliveredOrders =
        statistics?.deliveredOrders || 0;

    const processingOrders =
        statistics?.processingOrders || 0;

    const totalSpent =
        statistics?.totalSpent || 0;


    // ======================================================
    // ORDER STATUS STYLE
    // ======================================================

    const getOrderStatusStyle = (status) => {

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


    // ======================================================
    // PAYMENT STATUS STYLE
    // ======================================================

    const getPaymentStatusStyle = (status) => {

        switch (status) {

            case "paid":
                return "text-green-600";

            case "failed":
                return "text-red-600";

            default:
                return "text-yellow-600";

        }

    };


    // ======================================================
    // UI
    // ======================================================

    return (

        <div>

            {/* ==================================================
                BACK BUTTON
            ================================================== */}

            <button
                type="button"
                onClick={() =>
                    navigate("/admin/users")
                }
                className="mb-6 flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-800"
            >

                <FaArrowLeft />

                Back to Users

            </button>


            {/* ==================================================
                USER HEADER
            ================================================== */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">


                    {/* Avatar */}

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-3xl text-blue-600">

                        {user.avatar ? (

                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />

                        ) : (

                            <FaUser />

                        )}

                    </div>


                    {/* User Information */}

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            {user.name || "Unknown User"}
                        </h1>


                        <p className="mt-2 flex items-center gap-2 text-gray-500">

                            <FaEnvelope />

                            {user.email || "No email"}

                        </p>


                        <div className="mt-3">

                            {user.role === "admin" ? (

                                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">

                                    Admin

                                </span>

                            ) : user.isBlocked ? (

                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                                    Blocked

                                </span>

                            ) : (

                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                    Active User

                                </span>

                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


                {/* Total Orders */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <FaShoppingCart className="text-2xl text-blue-600" />

                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Total Orders
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {totalOrders}
                    </p>

                </div>


                {/* Delivered */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <FaCheckCircle className="text-2xl text-green-600" />

                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Delivered
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {deliveredOrders}
                    </p>

                </div>


                {/* Processing */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <FaClock className="text-2xl text-yellow-600" />

                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Processing
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {processingOrders}
                    </p>

                </div>


                {/* Total Spent */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <FaRupeeSign className="text-2xl text-blue-600" />

                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Total Spent
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        ₹{totalSpent}
                    </p>

                </div>

            </div>


            {/* ==================================================
                USER ORDERS
            ================================================== */}

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                    <FaBoxOpen className="text-xl text-blue-600" />

                    <h2 className="text-xl font-bold text-gray-900">
                        User Orders
                    </h2>

                </div>


                {orders.length === 0 ? (

                    /* No Orders */

                    <div className="mt-6 rounded-xl bg-gray-50 py-12 text-center">

                        <FaShoppingCart className="mx-auto text-4xl text-gray-300" />

                        <p className="mt-3 font-medium text-gray-600">
                            No orders found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            This user has not placed any orders yet.
                        </p>

                    </div>

                ) : (

                    <div className="mt-6 space-y-4">

                        {orders.map((order) => (

                            <div
                                key={order._id}
                                onClick={() =>
                                    navigate(
                                        `/admin/orders/${order._id}`
                                    )
                                }
                                className="cursor-pointer rounded-xl bg-gray-50 p-5 transition hover:bg-gray-100"
                            >

                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                                    {/* Order Information */}

                                    <div>

                                        <p className="font-semibold text-gray-900">

                                            Order #

                                            {order._id?.slice(-8)}

                                        </p>


                                        <p className="mt-1 text-sm text-gray-500">

                                            {order.createdAt
                                                ? new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()
                                                : "Unknown date"}

                                        </p>

                                    </div>


                                    {/* Status */}

                                    <div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getOrderStatusStyle(
                                                order.orderStatus
                                            )}`}
                                        >

                                            {order.orderStatus ||
                                                "Unknown"}

                                        </span>

                                    </div>


                                    {/* Payment */}

                                    <div>

                                        <p className="text-xs text-gray-400">
                                            Payment
                                        </p>

                                        <p
                                            className={`mt-1 text-sm font-semibold capitalize ${getPaymentStatusStyle(
                                                order.paymentStatus
                                            )}`}
                                        >
                                            {order.paymentStatus ||
                                                "pending"}
                                        </p>

                                    </div>


                                    {/* Total */}

                                    <div className="text-left md:text-right">

                                        <p className="text-xs text-gray-400">
                                            Total
                                        </p>

                                        <p className="mt-1 font-bold text-gray-900">
                                            ₹{order.totalPrice || 0}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ==================================================
                USER ACCOUNT INFORMATION
            ================================================== */}

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900">
                    Account Information
                </h2>


                <div className="mt-6 grid gap-5 sm:grid-cols-2">


                    {/* User ID */}

                    <div className="rounded-xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            User ID
                        </p>

                        <p className="mt-1 break-all font-semibold text-gray-900">
                            {user._id}
                        </p>

                    </div>


                    {/* Role */}

                    <div className="rounded-xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            Account Role
                        </p>

                        <p className="mt-1 font-semibold capitalize text-gray-900">
                            {user.role || "user"}
                        </p>

                    </div>


                    {/* Joined */}

                    <div className="rounded-xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            Joined
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">

                            {user.createdAt
                                ? new Date(
                                    user.createdAt
                                ).toLocaleDateString()
                                : "Unknown"}

                        </p>

                    </div>


                    {/* Account Status */}

                    <div className="rounded-xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            Account Status
                        </p>

                        <p
                            className={`mt-1 font-semibold ${
                                user.isBlocked
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >

                            {user.isBlocked
                                ? "Blocked"
                                : "Active"}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default AdminUserDetails;