
import ProductCard from "../../home/FeaturedProducts/ProductCard";

const ProductGrid = ({ products }) => {
    return (
        <>
            {products.length === 0 ? (
                <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white">

                    <div className="text-center">

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Products Found
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Try changing your search or filters.
                        </p>

                    </div>

                </div>
            ) : (

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">

                    {products.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            )}
        </>
    );
};

export default ProductGrid;