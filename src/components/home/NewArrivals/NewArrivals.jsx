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
        <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

                {/* ================= HEADING ================= */}

                <div className="
                    mb-9
                    text-center

                    sm:mb-11

                    lg:mb-14
                ">

                    <span className="
                        inline-block
                        rounded-full
                        border
                        border-blue-600
                        bg-blue-50
                        px-3.5
                        py-1.5
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-blue-600

                        sm:px-6
                        sm:py-2
                        sm:text-sm
                        sm:tracking-[0.18em]
                    ">
                        New Arrivals
                    </span>


                    <h2 className="
                        mt-4
                        text-3xl
                        font-extrabold
                        leading-tight
                        text-gray-900

                        sm:mt-5
                        sm:text-4xl

                        md:text-5xl
                    ">
                        Fresh Picks{" "}

                        <span className="text-blue-600">
                            Just For You
                        </span>
                    </h2>


                    <p className="
                        mx-auto
                        mt-3
                        max-w-3xl
                        text-sm
                        leading-6
                        text-gray-600

                        sm:mt-5
                        sm:text-base
                        sm:leading-7

                        lg:text-lg
                        lg:leading-8
                    ">
                        Discover the latest products added to our
                        collection.
                    </p>

                </div>


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
                                    bg-gray-200

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

                        <p className="font-medium text-red-600">
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
                            bg-white
                            p-8
                            text-center

                            sm:p-12
                        ">

                            <p className="text-sm text-gray-500 sm:text-base">
                                No new products available.
                            </p>

                        </div>

                    )}


                {/* ================= VIEW ALL ================= */}

                {!loading &&
                    !error &&
                    products.length > 0 && (

                        <div className="
                            mt-8
                            flex
                            justify-center

                            sm:mt-10

                            lg:mt-12
                        ">

                            <Link
                                to="/products"
                                className="
                                    rounded-xl
                                    border-2
                                    border-blue-600
                                    px-5
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

export default NewArrivals;