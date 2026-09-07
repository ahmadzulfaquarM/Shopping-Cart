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


                {/* ================= LOADING ================= */}

                {loading && (

                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:gap-5
                        lg:grid-cols-4
                        lg:gap-6
                    ">

                        {[...Array(4)].map((_, index) => (

                            <div
                                key={index}
                                className="
                                    h-[430px]
                                    animate-pulse
                                    rounded-2xl
                                    bg-gray-100

                                    sm:h-[470px]

                                    lg:h-[520px]
                                    lg:rounded-3xl
                                "
                            />

                        ))}

                    </div>

                )}


                {/* ================= ERROR ================= */}

                {!loading && error && (

                    <div className="
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        p-6
                        text-center
                        sm:p-8
                    ">

                        <p className="text-sm font-medium text-red-600 sm:text-base">
                            {error}
                        </p>

                    </div>

                )}


                {/* ================= PRODUCTS ================= */}

                {!loading &&
                    !error &&
                    products.length > 0 && (

                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:gap-5
                        lg:grid-cols-4
                        lg:gap-6
                    ">

                        {products.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))}

                    </div>

                )}


                {/* ================= NO PRODUCTS ================= */}

                {!loading &&
                    !error &&
                    products.length === 0 && (

                    <div className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-8
                        text-center
                        sm:p-12
                    ">

                        <p className="text-sm text-gray-500 sm:text-base">
                            No products available.
                        </p>

                    </div>

                )}


                {/* ================= VIEW ALL ================= */}

                {!loading &&
                    !error &&
                    products.length > 0 && (

                    <div className="mt-8 flex justify-center sm:mt-10">

                        <Link
                            to="/products"
                            className="
                                rounded-xl
                                border-2
                                border-blue-600
                                px-6
                                py-2.5
                                text-sm
                                font-semibold
                                text-blue-600
                                transition
                                hover:bg-blue-600
                                hover:text-white

                                sm:px-8
                                sm:py-3
                                sm:text-base
                            "
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