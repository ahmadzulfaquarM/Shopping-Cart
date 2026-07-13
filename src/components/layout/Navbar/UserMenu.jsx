import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UserMenu = () => {
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
};

export default UserMenu;