import { Link } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../home/FeaturedProducts/ProductCard";

const RelatedProducts = ({ product }) => {

    const relatedProducts = products
        .filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 4);

    if (relatedProducts.length === 0) return null;

    return (
        <section>

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Recommended
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-gray-900">
                        You May Also Like
                    </h2>

                </div>

                <Link
                    to="/products"
                    className="rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                    View All
                </Link>

            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

                {relatedProducts.map((item) => (

                    <ProductCard
                        key={item.id}
                        product={item}
                    />

                ))}

            </div>

        </section>
    );
};

export default RelatedProducts;