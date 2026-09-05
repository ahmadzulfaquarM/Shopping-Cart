import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaUser,
    FaBoxOpen,
    FaHeart,
    FaShoppingCart,
    FaHome,
    FaThLarge,
    FaSearch,
} from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const MobileMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const categories = [
        "Fashion",
        "Mobiles",
        "Electronics",
        "Beauty",
        "Home",
        "Appliances",
        "Shoes",
        "Furniture",
        "Sports",
    ];

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
        <div className="w-full">

            {/* ================= TOP HEADER (brand blue) ================= */}

            <div className="flex h-14 items-center justify-between text-white">

                {/* Logo */}

                <NavLink
                    to="/"
                    className="flex items-center gap-2"
                >
                    <FaShoppingCart className="text-xl" />

                    <span className="text-lg font-extrabold">
                        Shopping Cart
                    </span>
                </NavLink>


                {/* Actions */}

                <div className="flex items-center gap-4">

                    {/* Wishlist */}

                    <NavLink
                        to="/wishlist"
                        className="relative text-xl"
                    >
                        <FaHeart />

                        {wishlistCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600">
                                {wishlistCount}
                            </span>
                        )}
                    </NavLink>


                    {/* Cart */}

                    <NavLink
                        to="/cart"
                        className="relative text-xl"
                    >
                        <FaShoppingCart />

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-blue-600">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>


                    {/* Menu */}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-xl"
                        aria-label="Menu"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

            </div>


            {/* ================= SEARCH BAR ================= */}

            <div className="pb-3">

                <button
                    onClick={() => navigate("/products")}
                    className="flex h-11 w-full items-center rounded-sm bg-white px-4 text-left text-sm text-gray-500 shadow-sm"
                >
                    <FaSearch className="mr-3 text-base text-gray-400" />

                    <span>
                        Search products, brands and more
                    </span>
                </button>

            </div>


            {/* ================= CATEGORY SCROLL ================= */}

            <div className="overflow-x-auto pb-3 scrollbar-hide">

                <div className="flex min-w-max gap-6">

                    {categories.map((category) => (

                        <button
                            key={category}
                            onClick={() =>
                                navigate(
                                    `/products?category=${encodeURIComponent(category)}`
                                )
                            }
                            className="text-sm font-medium text-white/90 whitespace-nowrap"
                        >
                            {category}
                        </button>

                    ))}

                </div>

            </div>


            {/* ================= SIDE MENU ================= */}

            {isOpen && (

                <>

                    {/* Overlay */}

                    <div
                        className="fixed inset-0 z-40 bg-black/30"
                        onClick={() => setIsOpen(false)}
                    />


                    {/* Menu */}

                    <div className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-2xl">

                        {/* Header */}

                        <div className="flex items-center justify-between border-b bg-blue-600 px-5 py-5 text-white">

                            <div>

                                <p className="text-lg font-bold">
                                    {user
                                        ? `Hello, ${user.name}`
                                        : "Welcome"}
                                </p>

                                <p className="text-sm text-white/80">
                                    Explore Shopping Cart
                                </p>

                            </div>


                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-xl"
                            >
                                <FaTimes />
                            </button>

                        </div>


                        {/* Menu Items */}

                        <div className="p-4">

                            {menuItems.map((item) => (

                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `mb-2 flex items-center gap-4 rounded-xl px-4 py-4 font-medium ${
                                            isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`
                                    }
                                >

                                    <span className="text-lg">
                                        {item.icon}
                                    </span>

                                    {item.name}

                                </NavLink>

                            ))}


                            {/* Profile */}

                            {user && (

                                <NavLink
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="mb-2 flex items-center gap-4 rounded-xl px-4 py-4 font-medium text-gray-700 hover:bg-gray-50"
                                >

                                    <FaUser />

                                    My Profile

                                </NavLink>

                            )}


                            {/* Login / Logout */}

                            {user ? (

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="mt-4 w-full rounded-xl bg-red-50 px-4 py-4 text-left font-semibold text-red-600"
                                >
                                    Logout
                                </button>

                            ) : (

                                <NavLink
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 block rounded-xl bg-blue-600 px-4 py-4 text-center font-semibold text-white"
                                >
                                    Login
                                </NavLink>

                            )}

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};

export default MobileMenu;
