import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    FaBars,
    FaTimes,
    FaUser,
    FaBoxOpen,
    FaHeart,
    FaShoppingCart,
    FaHome,
    FaThLarge,
} from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const MobileMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();


    const menuItems = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome />,
        },
        {
            name: "Products",
            path: "/products",
            icon: <FaThLarge />,
        },
        {
            name: "Categories",
            path: "/categories",
            icon: <FaThLarge />,
        },
        {
            name: "Wishlist",
            path: "/wishlist",
            icon: <FaHeart />,
        },
        {
            name: "My Orders",
            path: "/orders",
            icon: <FaBoxOpen />,
        },
    ];


    return (
        <>

            {/* =================================================
                MOBILE HEADER ACTIONS
            ================================================= */}

            <div className="flex items-center gap-3 text-white sm:gap-4">


                {/* ================= WISHLIST ================= */}

                <NavLink
                    to="/wishlist"
                    aria-label="Wishlist"
                    className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 active:bg-white/20"
                >

                    <FaHeart className="text-lg" />

                    {wishlistCount > 0 && (

                        <span className="absolute right-0 top-0 flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-blue-600">

                            {wishlistCount}

                        </span>

                    )}

                </NavLink>


                {/* ================= CART ================= */}

                <NavLink
                    to="/cart"
                    aria-label="Cart"
                    className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 active:bg-white/20"
                >

                    <FaShoppingCart className="text-lg" />

                    {cartCount > 0 && (

                        <span className="absolute right-0 top-0 flex h-4 min-w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-blue-600">

                            {cartCount}

                        </span>

                    )}

                </NavLink>


                {/* ================= MENU ================= */}

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 active:bg-white/20"
                >

                    <FaBars className="text-xl" />

                </button>

            </div>


            {/* =================================================
                SIDE DRAWER
            ================================================= */}

            {isOpen && (

                <>

                    {/* ================= OVERLAY ================= */}

                    <div
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px]"
                        onClick={() => setIsOpen(false)}
                    />


                    {/* ================= DRAWER ================= */}

                    <aside
                        className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-[360px] flex-col bg-white shadow-2xl"
                        aria-label="Mobile navigation"
                    >


                        {/* ================= DRAWER HEADER ================= */}

                        <div className="flex items-center justify-between bg-blue-600 px-5 py-5 text-white">

                            <div className="min-w-0">

                                <p className="truncate text-lg font-bold">

                                    {user
                                        ? `Hello, ${user.name}`
                                        : "Welcome"}

                                </p>

                                <p className="mt-1 text-sm text-white/80">

                                    Explore Shopping Cart

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
                            >

                                <FaTimes className="text-xl" />

                            </button>

                        </div>


                        {/* ================= MENU CONTENT ================= */}

                        <div className="flex-1 overflow-y-auto px-4 py-5">


                            {/* ================= MAIN LINKS ================= */}

                            <div className="space-y-1">

                                {menuItems.map((item) => (

                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 rounded-xl px-4 py-4 font-medium transition ${
                                                isActive
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "text-gray-700 hover:bg-gray-50"
                                            }`
                                        }
                                    >

                                        <span className="flex w-6 justify-center text-lg">

                                            {item.icon}

                                        </span>

                                        <span>
                                            {item.name}
                                        </span>

                                    </NavLink>

                                ))}

                            </div>


                            {/* ================= DIVIDER ================= */}

                            <div className="my-5 h-px bg-gray-100" />


                            {/* ================= PROFILE ================= */}

                            {user && (

                                <NavLink
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 rounded-xl px-4 py-4 font-medium text-gray-700 transition hover:bg-gray-50"
                                >

                                    <span className="flex w-6 justify-center text-lg">

                                        <FaUser />

                                    </span>

                                    My Profile

                                </NavLink>

                            )}


                            {/* ================= LOGIN / LOGOUT ================= */}

                            {user ? (

                                <button
                                    type="button"
                                    onClick={() => {

                                        logout();
                                        setIsOpen(false);

                                    }}
                                    className="mt-4 w-full rounded-xl bg-red-50 px-4 py-4 text-left font-semibold text-red-600 transition hover:bg-red-100"
                                >

                                    Logout

                                </button>

                            ) : (

                                <NavLink
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 block rounded-xl bg-blue-600 px-4 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
                                >

                                    Login

                                </NavLink>

                            )}

                        </div>


                        {/* ================= DRAWER FOOTER ================= */}

                        <div className="border-t border-gray-100 px-5 py-4">

                            <p className="text-center text-xs text-gray-400">

                                Shopping Cart • Secure Shopping

                            </p>

                        </div>

                    </aside>

                </>

            )}

        </>
    );
};

export default MobileMenu;