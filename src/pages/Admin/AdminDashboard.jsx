import React, { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import {
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaRupeeSign,
} from "react-icons/fa";

const AdminDashboard = () => {

    const [isOpen, setIsOpen] = useState(false);

    const stats = [
        {
            title: "Total Products",
            value: "0",
            icon: FaBox,
        },
        {
            title: "Total Orders",
            value: "0",
            icon: FaShoppingCart,
        },
        {
            title: "Total Users",
            value: "0",
            icon: FaUsers,
        },
        {
            title: "Total Revenue",
            value: "₹0",
            icon: FaRupeeSign,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Sidebar */}
            <AdminSidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />


            {/* Main Content */}
            <div className="lg:ml-64">

                {/* Header */}
                <AdminTopbar
                    setIsOpen={setIsOpen}
                />


                {/* Dashboard */}
                <main className="p-4 md:p-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="mb-8">

                            <h2 className="text-2xl font-bold text-gray-900">
                                Overview
                            </h2>

                            <p className="mt-1 text-gray-500">
                                Here's what's happening with your store.
                            </p>

                        </div>


                        {/* Statistics */}
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            {stats.map((stat) => {

                                const Icon = stat.icon;

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


                        {/* Recent Orders */}
                        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                            <h3 className="text-xl font-bold text-gray-900">
                                Recent Orders
                            </h3>

                            <div className="mt-6 rounded-xl bg-gray-50 py-12 text-center">

                                <FaShoppingCart className="mx-auto text-4xl text-gray-300" />

                                <p className="mt-3 font-medium text-gray-600">
                                    No recent orders
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Orders will appear here.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default AdminDashboard;