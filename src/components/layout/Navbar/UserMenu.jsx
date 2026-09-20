import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaUser,
    FaChevronDown,
    FaHeart,
    FaBoxOpen,
} from "react-icons/fa";

const UserMenu = ({ user, logout }) => {
    const [open, setOpen] = useState(false);

    if (!user) {
        return (
            <NavLink
                to="/login"
                className="flex h-10 items-center gap-2 rounded-md bg-white px-6 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-md active:scale-[0.98]"
            >
                <FaUser className="text-xs" />
                Login
            </NavLink>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* User Button */}

            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex h-10 max-w-[170px] items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
            >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <FaUser className="text-[11px] text-blue-600" />
                </span>

                <span className="max-w-[105px] truncate">
                    {user.name}
                </span>

                <FaChevronDown
                    className={`shrink-0 text-[10px] text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown */}

            {open && (
                <div
                    className="absolute right-0 top-full z-50 w-64 pt-2"
                    onMouseEnter={() => setOpen(true)}
                >
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">

                        {/* User Information */}

                        <div className="bg-gray-50 px-4 py-4">
                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                    <FaUser className="text-sm text-blue-600" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-900">
                                        {user.name}
                                    </p>

                                    <p className="truncate text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Menu Items */}

                        <div className="p-2">

                            <NavLink
                                to="/profile"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                    }`
                                }
                            >
                                <FaUser className="text-sm text-gray-400" />
                                My Profile
                            </NavLink>

                            <NavLink
                                to="/orders"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                    }`
                                }
                            >
                                <FaBoxOpen className="text-sm text-gray-400" />
                                Orders
                            </NavLink>

                            <NavLink
                                to="/wishlist"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                    }`
                                }
                            >
                                <FaHeart className="text-sm text-gray-400" />
                                Wishlist
                            </NavLink>

                        </div>

                        {/* Logout */}

                        <div className="border-t border-gray-100 p-2">
                            <button
                                type="button"
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;