import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Logo = () => {
  return (
    <NavLink
      to="/"
     className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
    >
      <FaShoppingCart className="text-3xl text-blue-600" />

      <h1 className="text-2xl font-extrabold text-blue-600">
        Shopping Cart
      </h1>
    </NavLink>
  );
};

export default Logo;