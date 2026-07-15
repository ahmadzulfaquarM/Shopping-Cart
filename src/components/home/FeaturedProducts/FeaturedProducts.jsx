import products from "../../../data/products";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

const FeaturedProducts = () => {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                <SectionHeading />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default FeaturedProducts;