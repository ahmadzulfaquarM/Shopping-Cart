import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaChevronDown, FaHeart, FaBoxOpen } from "react-icons/fa";

const UserMenu = ({ user, logout }) => {

    const [open, setOpen] = useState(false);

    if (!user) {
        return (
            <NavLink
                to="/login"
                className="flex h-9 items-center gap-2 rounded-sm bg-white px-6 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
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
            <button
                type="button"
                className="flex h-9 max-w-[160px] items-center gap-2 rounded-sm bg-white px-4 text-sm font-semibold text-gray-800 shadow-sm"
            >
                <FaUser className="shrink-0 text-xs text-blue-600" />
                <span className="truncate">{user.name}</span>
                <FaChevronDown
                    className={`text-[10px] text-gray-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 w-60 rounded-md border border-gray-100 bg-white py-2 shadow-lg">

                    <div className="border-b border-gray-100 px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <NavLink
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FaUser className="text-sm text-gray-400" />
                        My Profile
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FaBoxOpen className="text-sm text-gray-400" />
                        Orders
                    </NavLink>

                    <NavLink
                        to="/wishlist"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FaHeart className="text-sm text-gray-400" />
                        Wishlist
                    </NavLink>

                    <button
                        onClick={logout}
                        className="mt-1 flex w-full items-center gap-3 border-t border-gray-100 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        Logout
                    </button>

                </div>
            )}
        </div>
    );
};

export default UserMenu;
