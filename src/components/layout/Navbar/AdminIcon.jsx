import { FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminIcon = () => {
    return (
        <NavLink
            to="/admin"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
            className={({ isActive }) =>
                `group flex h-10 w-10 items-center justify-center rounded-md text-base transition-all duration-200 ${
                    isActive
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-white hover:bg-white/10"
                }`
            }
        >
            <FaUserShield className="transition-transform duration-200 group-hover:scale-110" />
        </NavLink>
    );
};

export default AdminIcon;