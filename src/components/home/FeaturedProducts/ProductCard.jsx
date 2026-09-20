import { Link } from "react-router-dom";
import {
    FaHeart,
    FaEye,
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    } = useWishlist();

    const wishlisted = isInWishlist(product._id);
    const rating = Number(product.rating) || 0;

    const originalPrice =
        product.discount > 0
            ? Math.round(
                  product.price /
                      (1 - product.discount / 100)
              )
            : null;

    const handleWishlist = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (wishlisted) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = () => {
        if (product.stock > 0) {
            addToCart(product);
        }
    };

    return (
        <article
            className="
                group
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-100
                hover:shadow-xl

                sm:rounded-2xl
            "
        >
            {/* IMAGE AREA */}
            <div className="relative overflow-hidden bg-gray-50 p-3 sm:p-4 lg:p-6">
                {/* DISCOUNT */}
                {product.discount > 0 && (
                    <span
                        className="
                            absolute
                            left-2
                            top-2
                            z-10
                            rounded-md
                            bg-blue-600
                            px-2
                            py-1
                            text-[9px]
                            font-bold
                            text-white
                            shadow-sm

                            sm:left-3
                            sm:top-3
                            sm:px-2.5
                            sm:text-[10px]

                            lg:left-4
                            lg:top-4
                            lg:px-3
                            lg:py-1.5
                            lg:text-xs
                        "
                    >
                        {product.discount}% OFF
                    </span>
                )}

                {/* ACTIONS */}
                <div
                    className="
                        absolute
                        right-2
                        top-2
                        z-20
                        flex
                        flex-col
                        gap-1.5

                        sm:right-3
                        sm:top-3
                        sm:gap-2

                        lg:right-4
                        lg:top-4
                        lg:translate-x-2
                        lg:opacity-0
                        lg:transition-all
                        lg:duration-300
                        lg:group-hover:translate-x-0
                        lg:group-hover:opacity-100
                    "
                >
                    {/* WISHLIST */}
                    <button
                        type="button"
                        aria-label={
                            wishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        title={
                            wishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        onClick={handleWishlist}
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            shadow-md
                            transition-all
                            duration-200
                            hover:scale-110
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2

                            sm:h-9
                            sm:w-9

                            lg:h-10
                            lg:w-10

                            ${
                                wishlisted
                                    ? "bg-red-500 text-white"
                                    : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                            }
                        `}
                    >
                        <FaHeart className="text-[10px] sm:text-xs lg:text-sm" />
                    </button>

                    {/* PRODUCT DETAILS */}
                    <Link
                        to={`/products/${product._id}`}
                        aria-label={`View ${product.name}`}
                        title="View Product"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-gray-600
                            shadow-md
                            transition-all
                            duration-200
                            hover:scale-110
                            hover:bg-blue-600
                            hover:text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2

                            sm:h-9
                            sm:w-9

                            lg:h-10
                            lg:w-10
                        "
                    >
                        <FaEye className="text-[10px] sm:text-xs lg:text-sm" />
                    </Link>
                </div>

                {/* PRODUCT IMAGE */}
                <Link
                    to={`/products/${product._id}`}
                    aria-label={`View ${product.name}`}
                    className="block"
                >
                    <div className="flex h-36 items-center justify-center sm:h-44 md:h-52 lg:h-60">
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="
                                h-full
                                w-full
                                object-contain
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />
                    </div>
                </Link>
            </div>

            {/* CONTENT */}
            <div className="p-3 sm:p-4 lg:p-5">
                {/* CATEGORY */}
                <p
                    className="
                        truncate
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-blue-600

                        sm:text-[10px]

                        lg:text-xs
                    "
                >
                    {product.category}
                </p>

                {/* PRODUCT NAME */}
                <Link
                    to={`/products/${product._id}`}
                    className="block"
                >
                    <h3
                        className="
                            mt-1
                            line-clamp-1
                            text-sm
                            font-bold
                            text-gray-900
                            transition-colors
                            duration-200
                            hover:text-blue-600

                            sm:mt-2
                            sm:text-base

                            lg:text-lg
                        "
                    >
                        {product.name}
                    </h3>
                </Link>

                {/* RATING */}
                <div className="mt-1.5 flex min-w-0 items-center gap-1 sm:mt-2 sm:gap-2">
                    <div className="flex shrink-0 items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                aria-hidden="true"
                                className={`
                                    text-[9px]
                                    sm:text-[10px]
                                    lg:text-xs
                                    ${
                                        index <
                                        Math.floor(rating)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    <span className="truncate text-[9px] text-gray-500 sm:text-[10px] lg:text-xs">
                        {rating.toFixed(1)} (
                        {product.numReviews || 0})
                    </span>
                </div>

                {/* PRICE */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-3 sm:gap-2 lg:mt-4">
                    <span className="text-base font-extrabold text-gray-900 sm:text-lg lg:text-xl">
                        ₹{product.price}
                    </span>

                    {originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through sm:text-xs lg:text-sm">
                            ₹{originalPrice}
                        </span>
                    )}
                </div>

                {/* STOCK */}
                <p
                    className={`
                        mt-1
                        text-[9px]
                        font-semibold
                        sm:text-[10px]
                        lg:text-xs
                        ${
                            product.stock > 0
                                ? "text-green-600"
                                : "text-red-500"
                        }
                    `}
                >
                    {product.stock > 0
                        ? "✓ In Stock"
                        : "Out of Stock"}
                </p>

                {/* ADD TO CART */}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`
                        mt-3
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        py-2.5
                        text-[11px]
                        font-bold
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:ring-offset-2

                        sm:mt-4
                        sm:gap-2
                        sm:rounded-xl
                        sm:py-3
                        sm:text-xs

                        lg:text-sm

                        ${
                            product.stock > 0
                                ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                                : "cursor-not-allowed bg-gray-200 text-gray-400"
                        }
                    `}
                >
                    <FaShoppingCart className="text-[10px] sm:text-xs lg:text-sm" />

                    {product.stock > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;