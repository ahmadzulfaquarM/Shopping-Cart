import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

const CartIcon = () => {
    const { cartCount } = useCart();

    return (
        <NavLink
            to="/cart"
            aria-label="Cart"
            title="Cart"
            className={({ isActive }) =>
                `group relative flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-white/10"
                }`
            }
        >
            <FaShoppingCart className="text-base transition-transform duration-200 group-hover:scale-110" />

            <span className="hidden xl:inline">Cart</span>

            {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600 shadow-sm">
                    {cartCount > 99 ? "99+" : cartCount}
                </span>
            )}
        </NavLink>
    );
};

export default CartIcon;