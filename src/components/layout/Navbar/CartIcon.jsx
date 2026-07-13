import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
    // Temporary count
    const cartCount = 0;

    return (
        <NavLink
            to="/cart"
            aria-label="Cart"
            className="relative flex items-center justify-center text-2xl text-gray-700 transition-all duration-300 ease-in-out hover:scale-110 hover:text-blue-600"
        >
            <FaShoppingCart />

            {/* Badge */}
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                {cartCount}
            </span>
        </NavLink>
    );
};

export default CartIcon;