import { Link } from "react-router-dom";
import {
    FaHeart,
    FaEye,
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

const ProductCard = ({ product }) => {
    return (
        <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]">

            {/* Image Section */}

            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">

                {/* Discount Badge */}

                <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                    {Math.round(
                        ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                    )}
                    % OFF
                </span>

                {/* Wishlist & Quick View */}

                <div className="absolute right-5 top-5 flex flex-col gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">

                    <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white">
                        <FaHeart />
                    </button>

                    <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white">
                        <FaEye />
                    </button>

                </div>

                <Link to={`/products/${product.id}`}>

                    <img
                        src={product.image}
                        alt={product.name}
                        className="mx-auto h-60 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                    />

                </Link>

            </div>

            {/* Content */}

            <div className="p-6">

                <Link to={`/products/${product.id}`}>

                    {product.isNew && (
                        <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            NEW
                        </span>
                    )}

                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        {product.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                        {product.name}
                    </h3>

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
                            {product.rating} ({product.reviews})
                        </span>

                    </div>

                    {/* Price */}

                    <div className="mt-5 flex items-center gap-3">

                        <span className="text-2xl font-bold text-gray-900">
                            ₹{product.price}
                        </span>

                        <span className="text-gray-400 line-through">
                            ₹{product.originalPrice}
                        </span>

                    </div>

                    {/* Stock */}

                    <p
                        className={`mt-2 text-sm font-medium ${
                            product.inStock
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>

                </Link>

                {/* Add to Cart */}

                <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 active:scale-95">

                    <FaShoppingCart />

                    Add to Cart

                </button>

            </div>

        </div>
    );
};

export default ProductCard;