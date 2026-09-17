import React from "react";
import { NavLink } from "react-router-dom";

import {
    FaTachometerAlt,
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaEnvelope,
    FaTimes,
} from "react-icons/fa";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const navItems = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: FaTachometerAlt,
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: FaBox,
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: FaShoppingCart,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: FaUsers,
        },
        {
            name: "Contacts",
            path: "/admin/contacts",
            icon: FaEnvelope,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 lg:translate-x-0 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex h-20 items-center justify-between border-b border-gray-700 px-6">
                    <div>
                        <h2 className="text-xl font-bold">
                            Admin Panel
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Shopping Cart
                        </p>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-xl text-gray-400 hover:text-white lg:hidden"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                                                isActive
                                                    ? "bg-blue-600 text-white"
                                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                            }`
                                        }
                                    >
                                        <Icon />

                                        <span>
                                            {item.name}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;