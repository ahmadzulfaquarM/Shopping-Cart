import React, { useEffect, useState } from "react";
import {
    FaSearch,
    FaFilter,
    FaTimes,
    FaBoxOpen,
} from "react-icons/fa";
import { getAllOrders } from "../../../services/orderService";
import AdminOrderTable from "../../../components/admin/AdminOrderTable";

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const fetchOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllOrders();

            setOrders(data.orders || []);

        } catch (error) {

            console.error(
                "Admin Orders Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);


    const filteredOrders = orders.filter((order) => {

        const searchText = search.toLowerCase().trim();

        const matchesSearch =
            order._id?.toLowerCase().includes(searchText) ||
            order.user?.name?.toLowerCase().includes(searchText) ||
            order.user?.email?.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "all" ||
            order.orderStatus === statusFilter;

        const matchesPayment =
            paymentFilter === "all" ||
            order.paymentStatus === paymentFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPayment
        );
    });


    return (
        <div>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-900">
                    Orders
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage customer orders
                </p>

            </div>


            {/* Search & Filters */}

            <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">

                <div className="flex flex-col gap-4 lg:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">

                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search by order ID, customer name or email..."
                            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* Order Status */}

                    <div className="flex items-center gap-2">

                        <FaFilter className="text-gray-400" />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500"
                        >

                            <option value="all">
                                All Status
                            </option>

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

                    </div>


                    {/* Payment Status */}

                    <select
                        value={paymentFilter}
                        onChange={(e) =>
                            setPaymentFilter(e.target.value)
                        }
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500"
                    >

                        <option value="all">
                            All Payments
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="paid">
                            Paid
                        </option>

                        <option value="failed">
                            Failed
                        </option>

                    </select>


                    {/* Clear */}

                    {(search ||
                        statusFilter !== "all" ||
                        paymentFilter !== "all") && (

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("all");
                                    setPaymentFilter("all");
                                }}
                                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                            >

                                <FaTimes />

                                Clear

                            </button>

                        )}

                </div>


                {/* Result count */}

                <p className="mt-4 text-sm text-gray-500">

                    Showing{" "}
                    <span className="font-semibold text-gray-800">
                        {filteredOrders.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-800">
                        {orders.length}
                    </span>{" "}
                    orders

                </p>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-6 rounded-xl bg-red-100 px-5 py-4 font-medium text-red-700">
                    {error}
                </div>
            )}


            {/* Loading */}

            {loading ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="font-medium text-gray-600">
                        Loading orders...
                    </p>

                </div>

            ) : (

                <AdminOrderTable
                    orders={filteredOrders}
                    refreshOrders={fetchOrders}
                />

            )}

        </div>
    );
};

export default AdminOrders;