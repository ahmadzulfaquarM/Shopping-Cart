import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductToolbar from "../../components/products/ProductToolbar";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10; // Number of products per page


    // Search
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    // Sorting
    const [sortOption, setSortOption] = useState("featured");

    // Filters
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getProducts({
                    search: searchTerm,
                    category: selectedCategories[0] || "",
                    price: selectedPrice,
                    inStock: inStockOnly.toString(),
                    sort: sortOption,
                    page,
                    limit,
                });

                setProducts(data.products);
                setTotalPages(data.totalPages);
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
    }, [
        searchTerm,
        selectedCategories,
        selectedPrice,
        inStockOnly,
        sortOption,
        page,
    ]);

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
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            handleSearch={handleSearch}
                            productCount={products.length}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />

                        {/* Products */}

                        <div className="mt-8">

                            <ProductGrid
                                products={products}
                            />

                            {totalPages > 1 && (
                                <div className="mt-10 flex items-center justify-center gap-2">

                                    <button
                                        onClick={() => setPage((prev) => prev - 1)}
                                        disabled={page === 1}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        ← Previous
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setPage(pageNumber)}
                                                className={`h-10 w-10 rounded-xl font-semibold transition ${page === pageNumber
                                                        ? "bg-blue-600 text-white"
                                                        : "border border-gray-200 bg-white hover:border-blue-600 hover:text-blue-600"
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => setPage((prev) => prev + 1)}
                                        disabled={page === totalPages}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next →
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Products;