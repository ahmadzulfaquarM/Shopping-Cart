import { useMemo, useState } from "react";

import products from "../../data/products";

import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductToolbar from "../../components/products/ProductToolbar";

const Products = () => {
    // Search
    const [searchTerm, setSearchTerm] = useState("");

    // Sorting
    const [sortOption, setSortOption] = useState("featured");

    // Filters
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            // Search
            const keyword = searchTerm.toLowerCase();

            const matchesSearch =
                product.name.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword);

            // Category
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            // Price
            const matchesPrice =
                !selectedPrice ||

                (selectedPrice === "under500" &&
                    product.price < 500) ||

                (selectedPrice === "500-2000" &&
                    product.price >= 500 &&
                    product.price <= 2000) ||

                (selectedPrice === "2000-5000" &&
                    product.price > 2000 &&
                    product.price <= 5000) ||

                (selectedPrice === "5000+" &&
                    product.price > 5000);

            // Stock
            const matchesStock =
                !inStockOnly ||
                product.inStock;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice &&
                matchesStock
            );
        });

        // Sorting
        switch (sortOption) {
            case "price-low":
                return [...filtered].sort(
                    (a, b) => a.price - b.price
                );

            case "price-high":
                return [...filtered].sort(
                    (a, b) => b.price - a.price
                );

            case "rating":
                return [...filtered].sort(
                    (a, b) => b.rating - a.rating
                );

            case "newest":
                return [...filtered].sort(
                    (a, b) => b.id - a.id
                );

            default:
                return filtered;
        }
    }, [
        searchTerm,
        sortOption,
        selectedCategories,
        selectedPrice,
        inStockOnly,
    ]);

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
                            productCount={filteredProducts.length}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />

                        {/* Products */}

                        <div className="mt-8">

                            <ProductGrid
                                products={filteredProducts}
                            />

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Products;