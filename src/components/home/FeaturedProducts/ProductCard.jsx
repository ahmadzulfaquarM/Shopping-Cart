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
    return (
        <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]">

            {/* Image Section */}

            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">

                {/* Discount Badge */}

                {product.discount > 0 && (
                    <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                        {product.discount}% OFF
                    </span>
                )}

                {/* Wishlist & Quick View */}

                <div className="absolute right-5 top-5 flex flex-col gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">

                    <button
                        onClick={() => {
                            if (wishlisted) {
                                removeFromWishlist(product._id);
                            } else {
                                addToWishlist(product);
                            }
                        }}
                        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-all duration-300 hover:scale-110 ${wishlisted
                                ? "border-red-500 bg-red-500 text-white"
                                : "border-gray-200 bg-white hover:bg-red-500 hover:text-white"
                            }`}
                    >
                        <FaHeart />
                    </button>

                    <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white">
                        <FaEye />
                    </button>

                </div>

                {/* Product Image */}

                <Link to={`/products/${product._id}`}>

                    <img
                        src={product.image}
                        alt={product.name}
                        className="mx-auto h-60 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                    />

                </Link>

            </div>

            {/* Content */}

            <div className="p-6">

                {/* NEW Badge */}

                {/* {product.isNew && (
                    <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        NEW
                    </span>
                )} */}

                {/* Category */}

                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    {product.category}
                </p>

                {/* Product Name */}

                <Link to={`/products/${product._id}`}>

                    <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600">
                        {product.name}
                    </h3>

                </Link>

                {/* Rating */}

                <div className="mt-3 flex items-center gap-2">

                    <div className="flex items-center gap-1">

                        {[...Array(5)].map((_, index) => (

                            <FaStar
                                key={index}
                                className={
                                    index < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }
                            />

                        ))}

                    </div>

                    <span className="text-sm text-gray-500">
                        {product.rating} ({product.numReviews})
                    </span>

                </div>

                {/* Price */}

                <div className="mt-5 flex items-center gap-3">

                    <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                    </span>

                    {product.discount > 0 && (
                        <span className="text-gray-400 line-through">
                            ₹
                            {Math.round(
                                product.price / (1 - product.discount / 100)
                            )}
                        </span>
                    )}

                </div>

                {/* Stock */}

                <p
                    className={`mt-2 text-sm font-medium ${product.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* Add To Cart */}

                <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-95" onClick={() => addToCart(product)}>

                    <FaShoppingCart />

                    Add to Cart

                </button>

            </div>

        </div>
    );
};

export default ProductCard;