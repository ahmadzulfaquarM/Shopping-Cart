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
        <section className="bg-white py-20">

            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <SectionHeading />


                {/* Loading */}

                {loading && (
                    <div className="grid grid-cols-4 gap-6">

                        {[...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className="h-[520px] animate-pulse rounded-3xl bg-gray-100"
                            />

                        ))}

                    </div>
                )}


                {/* Error */}

                {!loading && error && (

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

                        <p className="font-medium text-red-600">
                            {error}
                        </p>

                    </div>

                )}


                {/* Products */}

                {!loading && !error && products.length > 0 && (

                    <div className="grid grid-cols-4 gap-6">

                        {products.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))}

                    </div>

                )}


                {/* No Products */}

                {!loading &&
                    !error &&
                    products.length === 0 && (

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center">

                            <p className="text-gray-500">
                                No products available.
                            </p>

                        </div>
                    )}


                {/* View All */}

                {!loading && !error && products.length > 0 && (

                    <div className="mt-10 flex justify-center">

                        <Link
                            to="/products"
                            className="rounded-xl border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        >
                            View All Products
                        </Link>

                    </div>

                )}

            </div>

        </section>
    );
};

export default FeaturedProducts;