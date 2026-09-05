import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

import {
    FaHeart,
    FaEye,
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

const ProductCard = ({ product }) => {

    const { addToCart } = useCart();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    } = useWishlist();

    const wishlisted = isInWishlist(product._id);


    // Calculate original price
    const originalPrice =
        product.discount > 0
            ? Math.round(
                product.price /
                (1 - product.discount / 100)
            )
            : null;


    return (
        <div
            className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-gray-300
                hover:shadow-xl
            "
        >

            {/* ================= IMAGE ================= */}

            <div
                className="
                    relative
                    overflow-hidden
                    bg-gray-50
                    p-6
                "
            >

                {/* Discount */}

                {product.discount > 0 && (
                    <span
                        className="
                            absolute
                            left-4
                            top-4
                            z-10
                            rounded-md
                            bg-blue-600
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-white
                        "
                    >
                        {product.discount}% OFF
                    </span>
                )}


                {/* Actions */}

                <div
                    className="
                        absolute
                        right-4
                        top-4
                        z-20
                        flex
                        flex-col
                        gap-2
                        opacity-0
                        translate-x-2
                        transition-all
                        duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                    "
                >

                    {/* Wishlist */}

                    <button
                        type="button"
                        aria-label="Wishlist"
                        onClick={(e) => {

                            e.preventDefault();
                            e.stopPropagation();

                            if (wishlisted) {
                                removeFromWishlist(product._id);
                            } else {
                                addToWishlist(product);
                            }

                        }}
                        className={`
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            shadow-md
                            transition-all
                            duration-300
                            hover:scale-110

                            ${wishlisted
                                ? "bg-red-500 text-white"
                                : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                            }
                        `}
                    >
                        <FaHeart className="text-sm" />
                    </button>


                    {/* Quick View */}

                    <Link
                        to={`/products/${product._id}`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="View Product"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-gray-600
                            shadow-md
                            transition-all
                            duration-300
                            hover:scale-110
                            hover:bg-blue-600
                            hover:text-white
                        "
                    >
                        <FaEye className="text-sm" />
                    </Link>

                </div>


                {/* Product Image */}

                <Link to={`/products/${product._id}`}>

                    <div className="flex h-60 items-center justify-center">

                        <img
                            src={product.image}
                            alt={product.name}
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


            {/* ================= CONTENT ================= */}

            <div className="p-5">

                {/* Category */}

                <p
                    className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-blue-600
                    "
                >
                    {product.category}
                </p>


                {/* Product Name */}

                <Link to={`/products/${product._id}`}>

                    <h3
                        className="
                            mt-2
                            line-clamp-1
                            text-lg
                            font-bold
                            text-gray-900
                            transition-colors
                            duration-300
                            hover:text-blue-600
                        "
                    >
                        {product.name}
                    </h3>

                </Link>


                {/* Rating */}

                <div className="mt-2 flex items-center gap-2">

                    <div className="flex items-center gap-0.5">

                        {[...Array(5)].map((_, index) => (

                            <FaStar
                                key={index}
                                className={`
                                    text-xs
                                    ${index < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                `}
                            />

                        ))}

                    </div>

                    <span className="text-xs text-gray-500">
                        {product.rating} ({product.numReviews})
                    </span>

                </div>


                {/* Price */}

                <div className="mt-4 flex items-center gap-2">

                    <span className="text-xl font-extrabold text-gray-900">
                        ₹{product.price}
                    </span>

                    {originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{originalPrice}
                        </span>
                    )}

                </div>


                {/* Stock */}

                <p
                    className={`
                        mt-1
                        text-xs
                        font-semibold
                        ${product.stock > 0
                            ? "text-green-600"
                            : "text-red-500"
                        }
                    `}
                >
                    {product.stock > 0
                        ? "✓ In Stock"
                        : "Out of Stock"
                    }
                </p>


                {/* Add To Cart */}

                <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    className={`
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        py-3
                        text-sm
                        font-bold
                        transition-all
                        duration-300

                        ${product.stock > 0
                            ? `
                                bg-blue-600
                                text-white
                                hover:bg-blue-700
                                hover:shadow-lg
                              `
                            : `
                                cursor-not-allowed
                                bg-gray-200
                                text-gray-400
                              `
                        }
                    `}
                >
                    <FaShoppingCart />

                    {product.stock > 0
                        ? "Add to Cart"
                        : "Out of Stock"
                    }

                </button>

            </div>

        </div>
    );
};

export default ProductCard;