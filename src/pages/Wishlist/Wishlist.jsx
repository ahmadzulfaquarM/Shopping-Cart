import { Link } from "react-router-dom";
import {
    FaHeart,
    FaShoppingCart,
    FaTrash,
    FaStar,
} from "react-icons/fa";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {
    const {
        wishlistItems,
        removeFromWishlist,
    } = useWishlist();

    const { addToCart } = useCart();

    if (wishlistItems.length === 0) {
        return (
            <section className="min-h-screen bg-slate-50 px-4 py-16 sm:py-20">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 sm:h-32 sm:w-32">
                        <FaHeart className="text-4xl text-red-500 sm:text-5xl" />
                    </div>

                    <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-red-500">
                        Saved Products
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Your Wishlist is Empty
                    </h1>

                    <p className="mt-4 max-w-md text-base leading-7 text-gray-500 sm:text-lg">
                        Save your favorite products here and come back
                        whenever you're ready to shop.
                    </p>

                    <Link
                        to="/products"
                        className="mt-8 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Explore Products
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                            Saved Products
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            My Wishlist
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Products you've saved for later.
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                        {wishlistItems.length}{" "}
                        {wishlistItems.length === 1
                            ? "Item"
                            : "Items"}
                    </span>
                </div>

                {/* Products */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">

                    {wishlistItems.map((product) => {
                        const rating =
                            Number(product.rating) || 0;

                        const originalPrice =
                            product.discount > 0
                                ? Math.round(
                                      product.price /
                                          (1 -
                                              product.discount /
                                                  100)
                                  )
                                : null;

                        return (
                            <article
                                key={product._id}
                                className="group min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* Image */}
                                <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 sm:p-6">

                                    {product.discount > 0 && (
                                        <span className="absolute left-3 top-3 z-10 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white sm:left-4 sm:top-4 sm:text-xs">
                                            {product.discount}% OFF
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromWishlist(
                                                product._id
                                            )
                                        }
                                        aria-label={`Remove ${product.name} from wishlist`}
                                        title="Remove from wishlist"
                                        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:right-4 sm:top-4"
                                    >
                                        <FaTrash className="text-xs" />
                                    </button>

                                    <Link
                                        to={`/products/${product._id}`}
                                        className="block"
                                    >
                                        <div className="flex h-44 items-center justify-center sm:h-52">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    </Link>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5">

                                    <p className="truncate text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                                        {product.category}
                                    </p>

                                    <Link
                                        to={`/products/${product._id}`}
                                        className="block"
                                    >
                                        <h2 className="mt-1.5 line-clamp-2 min-h-[40px] text-sm font-bold text-gray-900 transition hover:text-blue-600 sm:text-base">
                                            {product.name}
                                        </h2>
                                    </Link>

                                    {/* Rating */}
                                    <div className="mt-3 flex items-center gap-1.5">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`text-[10px] sm:text-xs ${
                                                            star <=
                                                            Math.round(
                                                                rating
                                                            )
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>

                                        <span className="text-[10px] text-gray-500 sm:text-xs">
                                            {rating.toFixed(1)} (
                                            {product.numReviews || 0})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                        <span className="text-lg font-bold text-gray-900 sm:text-xl">
                                            ₹{product.price}
                                        </span>

                                        {originalPrice && (
                                            <span className="text-xs text-gray-400 line-through sm:text-sm">
                                                ₹{originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Cart */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                        disabled={product.stock <= 0}
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:py-3 sm:text-sm"
                                    >
                                        <FaShoppingCart />
                                        {product.stock > 0
                                            ? "Add to Cart"
                                            : "Out of Stock"}
                                    </button>

                                </div>
                            </article>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default Wishlist;