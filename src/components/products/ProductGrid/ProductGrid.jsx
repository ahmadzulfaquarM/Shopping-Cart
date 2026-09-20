import ProductCard from "../../home/FeaturedProducts/ProductCard";

const ProductGrid = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="flex min-h-[300px] w-full min-w-0 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-4 sm:min-h-[320px] sm:rounded-3xl">
                <div className="min-w-0 text-center">
                    <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        No Products Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base">
                        Try changing your search or filters.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 xl:gap-8">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="min-w-0"
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;