import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import {
    FaStar,
    FaCheckCircle,
    FaHeart,
    FaTruck,
    FaUndo,
    FaLock,
} from "react-icons/fa";

import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    } = useWishlist();
    const wishlisted = isInWishlist(product._id);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const discount = product.discount || 0;

    return (
        <div>

            {/* Category */}

            <p className="font-semibold uppercase tracking-widest text-blue-600">
                {product.category}
            </p>

            {/* Product Name */}

            <h1 className="mt-3 text-4xl font-bold text-gray-900">
                {product.name}
            </h1>

            {/* Rating */}

            <div className="mt-5 flex items-center gap-3">

                <div className="flex">

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

                <span className="text-gray-600">
                    {product.rating} ({product.numReviews} Reviews)
                </span>

            </div>

            {/* Price */}

            <div className="mt-8 flex items-center gap-4">

                <span className="text-5xl font-bold text-gray-900">
                    ₹{product.price}
                </span>

                {product.discount > 0 && (
                    <span className="text-2xl text-gray-400 line-through">
                        ₹
                        {Math.round(
                            product.price / (1 - product.discount / 100)
                        )}
                    </span>
                )}

                {product.discount > 0 && (
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                        {product.discount}% OFF
                    </span>
                )}

            </div>

            {/* Stock */}

            <div className="mt-8 flex items-center gap-3">

                <FaCheckCircle
                    className={
                        product.stock > 0
                            ? "text-green-600"
                            : "text-red-600"
                    }
                />

                <span
                    className={`font-semibold ${product.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {product.stock > 0
                        ? `${product.stock} In Stock`
                        : "Out of Stock"}
                </span>

            </div>

            {/* Divider */}

            <div className="my-8 h-px bg-gray-200" />

            {/* Quantity */}

            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxStock={product.stock}
            />

            {/* Buttons */}

            <div className="mt-8 space-y-4">

                <button
                    className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock <= 0}
                >
                    Add To Cart
                </button>

                <button
                    onClick={() => {
                        addToCart(product, quantity);
                        navigate("/cart");
                    }}
                    disabled={product.stock <= 0}
                    className="w-full rounded-2xl border-2 border-blue-600 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
                >
                    Buy Now
                </button>

                <button
                    onClick={() => {
                        if (wishlisted) {
                            removeFromWishlist(product._id);
                        } else {
                            addToWishlist(product);
                        }
                    }}
                    className={`flex w-full items-center justify-center gap-3 rounded-2xl border py-4 font-semibold transition ${wishlisted
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-gray-300 hover:border-red-500 hover:text-red-500"
                        }`}
                >
                    <FaHeart />

                    {wishlisted
                        ? "Remove From Wishlist"
                        : "Add To Wishlist"}
                </button>

            </div>

            {/* Services */}

            <div className="mt-10 space-y-5 rounded-3xl border border-gray-200 bg-white p-6">

                <div className="flex items-center gap-3">

                    <FaTruck className="text-blue-600" />

                    <span>Free Delivery</span>

                </div>

                <div className="flex items-center gap-3">

                    <FaUndo className="text-blue-600" />

                    <span>Easy 7-Day Returns</span>

                </div>

                <div className="flex items-center gap-3">

                    <FaLock className="text-blue-600" />

                    <span>100% Secure Payment</span>

                </div>

            </div>

        </div>
    );
};

export default ProductInfo;