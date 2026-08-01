import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductToolbar from "../../components/products/ProductToolbar";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // Search
    const [searchTerm, setSearchTerm] = useState("");

    // Sorting
    const [sortOption, setSortOption] = useState("featured");

    // Filters
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();

                setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                {/* Breadcrumb */}

                <p className="text-sm text-gray-500">
                    Home /
                    <span className="font-medium text-blue-600">
                        {" "}Products
                    </span>
                </p>

                {/* Heading */}

                <div className="mt-4">

                    <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Our <span className="text-blue-600">Products</span>
                    </h1>

                    <p className="mt-4 text-lg text-gray-600">
                        Explore our premium collection of fashion,
                        electronics, beauty, furniture and more.
                    </p>

                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">

                    {/* Filters */}

                    <ProductFilters
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                    />

                    <div>

                        {/* Toolbar */}

                        <ProductToolbar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            productCount={products.length}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />

                        {/* Products */}

                        <div className="mt-8">

                            <ProductGrid
                                products={products}
                            />

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Products;