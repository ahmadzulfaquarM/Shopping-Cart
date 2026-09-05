import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

const CartIcon = () => {

    const { cartCount } = useCart();

    return (
        <NavLink
            to="/cart"
            aria-label="Cart"
            className="group relative flex h-9 items-center gap-2 rounded-sm px-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >

            <FaShoppingCart className="text-base transition group-hover:scale-105" />

            <span className="hidden xl:inline">Cart</span>

            {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600">
                    {cartCount > 99 ? "99+" : cartCount}
                </span>
            )}

        </NavLink>
    );
};

export default CartIcon;
