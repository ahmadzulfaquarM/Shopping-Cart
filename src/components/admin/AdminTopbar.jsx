import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminTopbar = ({ setIsOpen }) => {

    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm md:px-8">

            {/* Left Side */}
            <div className="flex items-center gap-4">

                {/* Mobile Menu */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-xl text-gray-700 lg:hidden"
                >
                    <FaBars />
                </button>

                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>

                    <p className="hidden text-sm text-gray-500 sm:block">
                        Manage your shopping platform
                    </p>
                </div>

            </div>


            {/* Right Side */}
            <div className="flex items-center gap-4">

                {/* User Information */}
                <div className="hidden text-right sm:block">

                    <p className="font-semibold text-gray-900">
                        {user?.name}
                    </p>

                    <p className="text-xs capitalize text-gray-500">
                        {user?.role}
                    </p>

                </div>


                {/* User Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>


                {/* Logout */}
                <button
                    onClick={logout}
                    title="Logout"
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                >
                    <FaSignOutAlt />
                </button>

            </div>

        </header>
    );
};

export default AdminTopbar;