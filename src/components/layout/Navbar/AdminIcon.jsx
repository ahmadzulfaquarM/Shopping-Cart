import React from "react";
import { FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminIcon = () => {
    return (
        <NavLink
            to="/admin"
            title="Admin Dashboard"
            className={({ isActive }) =>
                `relative flex h-9 w-9 items-center justify-center rounded-sm text-lg transition ${
                    isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-white/10"
                }`
            }
        >
            <FaUserShield />
        </NavLink>
    );
};

export default AdminIcon;
