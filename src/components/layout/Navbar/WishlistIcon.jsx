import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../../context/WishlistContext";

const WishlistIcon = () => {

    const { wishlistCount } = useWishlist();

    return (
        <NavLink
            to="/wishlist"
            aria-label="Wishlist"
            className="group relative flex h-9 w-9 items-center justify-center rounded-sm text-white transition hover:bg-white/10"
        >

            <FaHeart className="text-base transition group-hover:scale-105" />

            {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
            )}

        </NavLink>
    );
};

export default WishlistIcon;
