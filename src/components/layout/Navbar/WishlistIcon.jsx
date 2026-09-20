import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../../context/WishlistContext";

const WishlistIcon = () => {
    const { wishlistCount } = useWishlist();

    return (
        <NavLink
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className={({ isActive }) =>
                `group relative flex h-10 w-10 items-center justify-center rounded-md transition-all duration-200 ${
                    isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-white/10"
                }`
            }
        >
            <FaHeart className="text-base transition-transform duration-200 group-hover:scale-110" />

            {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600 shadow-sm">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
            )}
        </NavLink>
    );
};

export default WishlistIcon;