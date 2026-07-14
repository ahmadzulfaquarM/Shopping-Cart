import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const WishlistIcon = () => {
    const wishlistCount = 0;

    return (
        <NavLink
            to="/wishlist"
            aria-label="Wishlist"
            className="relative flex items-center justify-center text-2xl text-gray-700 transition-all duration-300 ease-in-out hover:scale-110 hover:text-red-500"
        >
            <FaHeart />

            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {wishlistCount}
            </span>
        </NavLink>
    );
};

export default WishlistIcon;