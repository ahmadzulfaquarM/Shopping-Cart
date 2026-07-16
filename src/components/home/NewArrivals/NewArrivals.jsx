import { Link } from "react-router-dom";
import products from "../../../data/products";
import ProductCard from "../FeaturedProducts/ProductCard";

const NewArrivals = () => {
    const newProducts = products.filter((product) => product.isNew);

    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full border border-blue-600 bg-blue-50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                        New Arrivals
                    </span>

                    <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Fresh Picks{" "}
                        <span className="text-blue-600">
                            Just For You
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        Explore our newest collections featuring premium
                        fashion, electronics, beauty, furniture and more.
                    </p>

                </div>

                {/* Products */}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">

                    {newProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

                {/* Button */}

                <div className="mt-16 flex justify-center">

                    <Link
                        to="/products"
                        className="rounded-2xl border-2 border-blue-600 px-10 py-4 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
                    >
                        View All Products
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default NewArrivals;