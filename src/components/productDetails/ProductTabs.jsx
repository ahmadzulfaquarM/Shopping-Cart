import { useState } from "react";
import ReviewList from "../reviews/ReviewList";


const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* Tabs */}

            <div className="flex flex-wrap border-b border-gray-200">

                <button
                    onClick={() => setActiveTab("description")}
                    className={`px-8 py-5 text-lg font-semibold transition ${activeTab === "description"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                >
                    Description
                </button>

                <button
                    onClick={() => setActiveTab("specifications")}
                    className={`px-8 py-5 text-lg font-semibold transition ${activeTab === "specifications"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                >
                    Specifications
                </button>

                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-8 py-5 text-lg font-semibold transition ${activeTab === "reviews"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                >
                    Reviews
                </button>

            </div>

            {/* Content */}

            <div className="p-8">

                {/* Description */}

                {activeTab === "description" && (

                    <div className="space-y-5">

                        <h3 className="text-2xl font-bold text-gray-900">
                            Product Description
                        </h3>

                        <p className="leading-8 text-gray-600">
                            {product?.description ||
                                "Experience premium quality with this product, designed using high-quality materials for durability, comfort, and modern style. Perfect for daily use with an elegant finish and outstanding performance."}
                        </p>

                    </div>

                )}

                {/* Specifications */}

                {activeTab === "specifications" && (

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="rounded-xl bg-gray-50 p-5">

                            <h4 className="font-semibold">
                                Brand
                            </h4>

                            <p className="mt-2 text-gray-600">
                                {product?.brand || "ShopEase"}
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">

                            <h4 className="font-semibold">
                                Category
                            </h4>

                            <p className="mt-2 text-gray-600 capitalize">
                                {product?.category || "N/A"}
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">

                            <h4 className="font-semibold">
                                Warranty
                            </h4>

                            <p className="mt-2 text-gray-600">
                                1 Year
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">

                            <h4 className="font-semibold">
                                Delivery
                            </h4>

                            <p className="mt-2 text-gray-600">
                                Free Delivery
                            </p>

                        </div>

                    </div>

                )}

                {/* Reviews */}

                {activeTab === "reviews" && (

                    <div className="space-y-8">

                        <div>

                            <h3 className="text-2xl font-bold text-gray-900">
                                Customer Reviews
                            </h3>

                            <p className="mt-2 text-gray-500">
                                See what customers are saying about this product.
                            </p>

                        </div>

                        {/* Existing Reviews */}

                        <ReviewList
                            productId={product?._id}
                        />


                    </div>

                )}

            </div>

        </div>
    );
};

export default ProductTabs;