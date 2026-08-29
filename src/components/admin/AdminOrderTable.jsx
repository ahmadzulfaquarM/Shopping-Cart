import React from "react";
import {
    FaEye,
    FaBoxOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminOrderTable = ({
    orders,
}) => {

    const navigate = useNavigate();


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


    if (orders.length === 0) {

        return (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

                <FaBoxOpen className="mx-auto mb-5 text-5xl text-gray-300" />

                <h2 className="text-xl font-bold text-gray-800">
                    No orders found
                </h2>

                <p className="mt-2 text-gray-500">
                    There are no customer orders yet.
                </p>

            </div>
        );
    }


    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                    {/* Header */}

                    <thead className="border-b border-gray-200 bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Order
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Date
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Payment
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Total
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Status
                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                Action
                            </th>

                        </tr>

                    </thead>


                    {/* Body */}

                    <tbody className="divide-y divide-gray-100">

                        {orders.map((order) => (

                            <tr
                                key={order._id}
                                className="transition hover:bg-gray-50"
                            >

                                {/* Order ID */}

                                <td className="px-6 py-5">

                                    <p className="font-semibold text-gray-900">
                                        #{order._id.slice(-8)}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {order.items?.length || 0} item(s)
                                    </p>

                                </td>


                                {/* Customer */}

                                <td className="px-6 py-5">

                                    <p className="font-semibold text-gray-800">
                                        {order.user?.name || "Unknown"}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {order.user?.email || ""}
                                    </p>

                                </td>


                                {/* Date */}

                                <td className="px-6 py-5 text-sm text-gray-600">

                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}

                                </td>


                                {/* Payment */}

                                <td className="px-6 py-5">

                                    <p className="font-medium uppercase text-gray-800">
                                        {order.paymentMethod}
                                    </p>

                                    <p
                                        className={`mt-1 text-sm font-medium capitalize ${
                                            order.paymentStatus === "paid"
                                                ? "text-green-600"
                                                : order.paymentStatus === "failed"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }`}
                                    >
                                        {order.paymentStatus}
                                    </p>

                                </td>


                                {/* Total */}

                                <td className="px-6 py-5 font-bold text-gray-900">

                                    ₹{order.totalPrice}

                                </td>


                                {/* Status */}

                                <td className="px-6 py-5">

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusStyle(
                                            order.orderStatus
                                        )}`}
                                    >
                                        {order.orderStatus}
                                    </span>

                                </td>


                                {/* Action */}

                                <td className="px-6 py-5">

                                    <div className="flex justify-end">

                                        <button
                                            type="button"
                                            title="View Order"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/orders/${order._id}`
                                                )
                                            }
                                            className="rounded-lg p-3 text-blue-600 transition hover:bg-blue-50"
                                        >
                                            <FaEye />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminOrderTable;