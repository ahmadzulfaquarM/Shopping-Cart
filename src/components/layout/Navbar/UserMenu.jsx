import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UserMenu = ({ user, logout }) => {

    if (!user) {
        return (
            <NavLink
                to="/login"
                aria-label="Login"
                className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-7 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
                <FaUser />
                <span>Login</span>
            </NavLink>
        );
    }

    return (
        <div className="flex items-center gap-3">

            <NavLink
                to="/profile"
                aria-label="Profile"
                className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
                <FaUser />
                <span>{user.name}</span>
            </NavLink>

            <button
                onClick={logout}
                className="flex h-11 items-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
                Logout
            </button>

        </div>
    );
};

export default UserMenu;