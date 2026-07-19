import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* Tabs */}

            <div className="flex flex-wrap border-b border-gray-200">

                <button
                    onClick={() => setActiveTab("description")}
                    className={`px-8 py-5 text-lg font-semibold transition ${
                        activeTab === "description"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                    }`}
                >
                    Description
                </button>

                <button
                    onClick={() => setActiveTab("specifications")}
                    className={`px-8 py-5 text-lg font-semibold transition ${
                        activeTab === "specifications"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                    }`}
                >
                    Specifications
                </button>

                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-8 py-5 text-lg font-semibold transition ${
                        activeTab === "reviews"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                    }`}
                >
                    Reviews
                </button>

            </div>

            {/* Content */}

            <div className="p-8">

                {activeTab === "description" && (

                    <div className="space-y-5">

                        <h3 className="text-2xl font-bold text-gray-900">
                            Product Description
                        </h3>

                        <p className="leading-8 text-gray-600">
                            Experience premium quality with this product,
                            designed using high-quality materials for
                            durability, comfort, and modern style.
                            Perfect for daily use with an elegant finish
                            and outstanding performance.
                        </p>

                    </div>

                )}

                {activeTab === "specifications" && (

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="rounded-xl bg-gray-50 p-5">

                            <h4 className="font-semibold">
                                Brand
                            </h4>

                            <p className="mt-2 text-gray-600">
                                ShopEase
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">

                            <h4 className="font-semibold">
                                Material
                            </h4>

                            <p className="mt-2 text-gray-600">
                                Premium Quality
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

                {activeTab === "reviews" && (

                    <div className="space-y-8">

                        <div className="rounded-2xl border border-gray-200 p-6">

                            <div className="flex items-center justify-between">

                                <h4 className="text-lg font-semibold">
                                    Rahul Sharma
                                </h4>

                                <div className="flex text-yellow-400">

                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} />
                                    ))}

                                </div>

                            </div>

                            <p className="mt-4 text-gray-600">
                                Excellent product. Premium quality and
                                fast delivery. Highly recommended.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-gray-200 p-6">

                            <div className="flex items-center justify-between">

                                <h4 className="text-lg font-semibold">
                                    Priya Singh
                                </h4>

                                <div className="flex text-yellow-400">

                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} />
                                    ))}

                                </div>

                            </div>

                            <p className="mt-4 text-gray-600">
                                Amazing experience. Looks exactly as shown.
                                Worth every rupee.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default ProductTabs;