import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../../../services/productService";
import ProductCard from "../FeaturedProducts/ProductCard";

const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchNewArrivals = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getProducts({
                    limit: 4,
                    sort: "newest",
                    page: 1,
                });

                setProducts(data.products || []);

            } catch (error) {

                console.error(
                    "Failed to fetch new arrivals:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load new arrivals"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchNewArrivals();

    }, []);


    return (
        <section className="bg-slate-50 py-20">

            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                {/* Heading */}

                <div className="mb-14 text-center">

                    <span className="inline-block rounded-full border border-blue-600 bg-blue-50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                        New Arrivals
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Fresh Picks{" "}
                        <span className="text-blue-600">
                            Just For You
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                        Discover the latest products added to our
                        collection.
                    </p>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="grid grid-cols-4 gap-6">

                        {[...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className="h-[520px] animate-pulse rounded-3xl bg-gray-200"
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

                {!loading &&
                    !error &&
                    products.length > 0 && (

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

                        <div className="rounded-2xl bg-white p-12 text-center">

                            <p className="text-gray-500">
                                No new products available.
                            </p>

                        </div>

                    )}


                {/* View All */}

                {!loading &&
                    !error &&
                    products.length > 0 && (

                        <div className="mt-12 flex justify-center">

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

export default NewArrivals;