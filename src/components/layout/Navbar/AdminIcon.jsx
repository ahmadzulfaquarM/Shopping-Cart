import React from "react";
import { FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminIcon = () => {
    return (
        <NavLink
            to="/admin"
            title="Admin Dashboard"
            className={({ isActive }) =>
                `relative flex items-center justify-center rounded-xl p-3 text-xl transition ${
                    isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
            }
        >
            <FaUserShield />
        </NavLink>
    );
};

export default AdminIcon;