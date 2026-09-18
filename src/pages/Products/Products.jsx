import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/productService";

import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductToolbar from "../../components/products/ProductToolbar";

const Products = () => {
    const [searchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";
    const categoryFromUrl = searchParams.get("category") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;

    const [sortOption, setSortOption] = useState("featured");

    const [selectedCategories, setSelectedCategories] = useState(
        categoryFromUrl ? [categoryFromUrl] : []
    );

    const [selectedPrice, setSelectedPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    // =====================================================
    // SYNC CATEGORY WITH URL
    // =====================================================

    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategories([categoryFromUrl]);
        } else {
            setSelectedCategories([]);
        }

        setPage(1);
    }, [categoryFromUrl]);

    // =====================================================
    // RESET PAGE WHEN SEARCH CHANGES
    // =====================================================

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    // =====================================================
    // FETCH PRODUCTS
    // =====================================================

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

                setProducts(data.products || []);
                setTotalPages(data.totalPages || 1);
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

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="py-20 text-center">
                <p className="text-lg font-medium text-gray-600">
                    Loading products...
                </p>
            </div>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================

    if (error) {
        return (
            <div className="px-4 py-20 text-center">
                <p className="text-lg font-medium text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <section className="w-full min-w-0 overflow-x-hidden bg-slate-50 py-10 sm:py-12 lg:py-16">
            <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">

                {/* =================================================
                    BREADCRUMB
                ================================================= */}

                <div className="text-sm text-gray-500">
                    <span>Home</span>

                    <span className="mx-2">
                        /
                    </span>

                    <span className="font-medium text-blue-600">
                        Products
                    </span>
                </div>

                {/* =================================================
                    PAGE HEADING
                ================================================= */}

                <div className="mt-5 min-w-0">

                    {searchTerm ? (
                        <>
                            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                                Search Results
                            </h1>

                            <p className="mt-3 text-base text-gray-600 sm:mt-4 sm:text-lg">
                                Showing products matching{" "}
                                <span className="font-semibold text-blue-600">
                                    "{searchTerm}"
                                </span>
                            </p>
                        </>
                    ) : categoryFromUrl ? (
                        <>
                            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                                <span className="text-blue-600">
                                    {categoryFromUrl}
                                </span>{" "}
                                Products
                            </h1>

                            <p className="mt-3 text-base text-gray-600 sm:mt-4 sm:text-lg">
                                Explore our collection of{" "}
                                {categoryFromUrl.toLowerCase()} products.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                                Our{" "}
                                <span className="text-blue-600">
                                    Products
                                </span>
                            </h1>

                            <p className="mt-3 text-base text-gray-600 sm:mt-4 sm:text-lg">
                                Explore our collection of fashion,
                                electronics, beauty, furniture, sports
                                and more.
                            </p>
                        </>
                    )}

                </div>

                {/* =================================================
                    FILTER + PRODUCTS
                ================================================= */}

                <div className="mt-8 grid min-w-0 grid-cols-1 gap-6 sm:mt-10 sm:gap-8 lg:mt-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">

                    {/* FILTERS */}

                    <div className="min-w-0">
                        <ProductFilters
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            inStockOnly={inStockOnly}
                            setInStockOnly={setInStockOnly}
                        />
                    </div>

                    {/* PRODUCTS */}

                    <div className="min-w-0">

                        <ProductToolbar
                            productCount={products.length}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />

                        <div className="mt-6 min-w-0 sm:mt-8">

                            {products.length > 0 ? (
                                <ProductGrid
                                    products={products}
                                />
                            ) : (
                                <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">

                                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                        No Products Found
                                    </h2>

                                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                                        We couldn't find any products
                                        matching your search or filters.
                                    </p>

                                </div>
                            )}

                            {/* =================================================
                                PAGINATION
                            ================================================= */}

                            {totalPages > 1 && (
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">

                                    <button
                                        onClick={() =>
                                            setPage((prev) => prev - 1)
                                        }
                                        disabled={page === 1}
                                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                                    >
                                        ← Previous
                                    </button>

                                    <div className="flex flex-wrap justify-center gap-2">

                                        {[...Array(totalPages)].map(
                                            (_, index) => {

                                                const pageNumber =
                                                    index + 1;

                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() =>
                                                            setPage(
                                                                pageNumber
                                                            )
                                                        }
                                                        className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                                                            page ===
                                                            pageNumber
                                                                ? "bg-blue-600 text-white"
                                                                : "border border-gray-200 bg-white hover:border-blue-600 hover:text-blue-600"
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                    <button
                                        onClick={() =>
                                            setPage((prev) => prev + 1)
                                        }
                                        disabled={
                                            page === totalPages
                                        }
                                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
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