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
    const discount = Math.round(
        ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
    );

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
                    {product.rating} ({product.reviews} Reviews)
                </span>

            </div>

            {/* Price */}

            <div className="mt-8 flex items-center gap-4">

                <span className="text-5xl font-bold text-gray-900">
                    ₹{product.price}
                </span>

                <span className="text-2xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                </span>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                    {discount}% OFF
                </span>

            </div>

            {/* Stock */}

            <div className="mt-8 flex items-center gap-3">

                <FaCheckCircle className="text-green-600" />

                <span className="font-semibold text-green-600">
                    In Stock
                </span>

            </div>

            {/* Divider */}

            <div className="my-8 h-px bg-gray-200" />

            {/* Quantity */}

            <QuantitySelector />

            {/* Buttons */}

            <div className="mt-8 space-y-4">

                <button className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">

                    Add To Cart

                </button>

                <button className="w-full rounded-2xl border-2 border-blue-600 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">

                    Buy Now

                </button>

                <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-300 py-4 font-semibold transition hover:border-blue-600 hover:text-blue-600">

                    <FaHeart />

                    Add To Wishlist

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