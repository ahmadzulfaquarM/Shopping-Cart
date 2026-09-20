import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../../../services/productService";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProducts({
                    limit: 4,
                    sort: "rating",
                    page: 1,
                });

                setProducts(data.products || []);
            } catch (error) {
                console.error(
                    "Failed to fetch featured products:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        "Failed to load products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                <SectionHeading />

                {/* LOADING */}
                {loading && (
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-gray-100
                                    bg-white
                                    shadow-sm
                                    sm:rounded-2xl
                                    lg:rounded-3xl
                                "
                            >
                                <div className="h-36 animate-pulse bg-gray-100 sm:h-44 md:h-52 lg:h-60" />

                                <div className="space-y-3 p-3 sm:p-4 lg:p-5">
                                    <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100 sm:h-3" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100 sm:h-5" />
                                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                                    <div className="h-5 w-24 animate-pulse rounded bg-gray-100 sm:h-6" />
                                    <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100 sm:h-10 sm:rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6 text-center sm:mt-10 sm:p-8">
                        <p className="text-sm font-medium text-red-600 sm:text-base">
                            {error}
                        </p>
                    </div>
                )}

                {/* PRODUCTS */}
                {!loading && !error && products.length > 0 && (
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                )}

                {/* NO PRODUCTS */}
                {!loading &&
                    !error &&
                    products.length === 0 && (
                        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center sm:mt-10 sm:p-12">
                            <p className="text-sm text-gray-500 sm:text-base">
                                No products available.
                            </p>
                        </div>
                    )}

                {/* VIEW ALL */}
                {!loading &&
                    !error &&
                    products.length > 0 && (
                        <div className="mt-8 flex justify-center sm:mt-10 lg:mt-12">
                            <Link
                                to="/products"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border-2
                                    border-blue-600
                                    px-6
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-blue-600
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-blue-600
                                    hover:text-white
                                    hover:shadow-lg
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:ring-offset-2

                                    sm:px-8
                                    sm:py-3
                                    sm:text-base
                                "
                            >
                                <span>View All Products</span>

                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>
                    )}
            </div>
        </section>
    );
};

export default FeaturedProducts;