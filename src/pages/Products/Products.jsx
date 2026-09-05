import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/productService";

import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductToolbar from "../../components/products/ProductToolbar";

const Products = () => {

    // =====================================================
    // URL SEARCH
    // =====================================================

    const [searchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";


    // =====================================================
    // PRODUCTS
    // =====================================================

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // PAGINATION
    // =====================================================

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const limit = 10;


    // =====================================================
    // SORTING
    // =====================================================

    const [sortOption, setSortOption] = useState("featured");


    // =====================================================
    // FILTERS
    // =====================================================

    const [selectedCategories, setSelectedCategories] =
        useState([]);

    const [selectedPrice, setSelectedPrice] =
        useState("");

    const [inStockOnly, setInStockOnly] =
        useState(false);


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

                    // Navbar search
                    search: searchTerm,

                    // Category filter
                    category:
                        selectedCategories[0] || "",

                    // Price filter
                    price: selectedPrice,

                    // Stock filter
                    inStock:
                        inStockOnly.toString(),

                    // Sorting
                    sort: sortOption,

                    // Pagination
                    page,

                    limit,

                });


                setProducts(
                    data.products || []
                );

                setTotalPages(
                    data.totalPages || 1
                );


            } catch (error) {

                console.error(
                    "Failed to fetch products:",
                    error
                );

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

            <div className="py-20 text-center">

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

        <section className="bg-slate-50 py-16">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">


                {/* =================================================
                    BREADCRUMB
                ================================================= */}

                <div className="text-sm text-gray-500">

                    <span>
                        Home
                    </span>

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

                <div className="mt-5">

                    {searchTerm ? (

                        <>

                            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">

                                Search Results

                            </h1>

                            <p className="mt-4 text-lg text-gray-600">

                                Showing products matching{" "}

                                <span className="font-semibold text-blue-600">
                                    "{searchTerm}"
                                </span>

                            </p>

                        </>

                    ) : (

                        <>

                            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">

                                Our{" "}

                                <span className="text-blue-600">
                                    Products
                                </span>

                            </h1>

                            <p className="mt-4 text-lg text-gray-600">

                                Explore our collection of fashion,
                                electronics, beauty, furniture,
                                sports and more.

                            </p>

                        </>

                    )}

                </div>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">


                    {/* =================================================
                        LEFT FILTER SIDEBAR
                    ================================================= */}

                    <ProductFilters

                        selectedCategories={
                            selectedCategories
                        }

                        setSelectedCategories={
                            setSelectedCategories
                        }

                        selectedPrice={
                            selectedPrice
                        }

                        setSelectedPrice={
                            setSelectedPrice
                        }

                        inStockOnly={
                            inStockOnly
                        }

                        setInStockOnly={
                            setInStockOnly
                        }

                    />


                    {/* =================================================
                        PRODUCTS AREA
                    ================================================= */}

                    <div>


                        {/* =================================================
                            TOOLBAR

                            NO SEARCH BAR HERE
                        ================================================= */}

                        <ProductToolbar

                            productCount={
                                products.length
                            }

                            sortOption={
                                sortOption
                            }

                            setSortOption={
                                setSortOption
                            }

                        />


                        {/* =================================================
                            PRODUCTS
                        ================================================= */}

                        <div className="mt-8">

                            {products.length > 0 ? (

                                <ProductGrid
                                    products={products}
                                />

                            ) : (

                                <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

                                    <h2 className="text-2xl font-bold text-gray-900">
                                        No Products Found
                                    </h2>

                                    <p className="mt-3 text-gray-500">

                                        We couldn't find any products
                                        matching your search or filters.

                                    </p>

                                </div>

                            )}


                            {/* =================================================
                                PAGINATION
                            ================================================= */}

                            {totalPages > 1 && (

                                <div className="mt-10 flex items-center justify-center gap-2">


                                    {/* Previous */}

                                    <button

                                        onClick={() =>
                                            setPage(
                                                (prev) =>
                                                    prev - 1
                                            )
                                        }

                                        disabled={
                                            page === 1
                                        }

                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                                    >

                                        ← Previous

                                    </button>


                                    {/* Page Numbers */}

                                    {[...Array(totalPages)].map(
                                        (_, index) => {

                                            const pageNumber =
                                                index + 1;

                                            return (

                                                <button

                                                    key={
                                                        pageNumber
                                                    }

                                                    onClick={() =>
                                                        setPage(
                                                            pageNumber
                                                        )
                                                    }

                                                    className={`h-10 w-10 rounded-xl font-semibold transition ${
                                                        page ===
                                                        pageNumber

                                                            ? "bg-blue-600 text-white"

                                                            : "border border-gray-200 bg-white hover:border-blue-600 hover:text-blue-600"
                                                    }`}
                                                >

                                                    {
                                                        pageNumber
                                                    }

                                                </button>

                                            );

                                        }
                                    )}


                                    {/* Next */}

                                    <button

                                        onClick={() =>
                                            setPage(
                                                (prev) =>
                                                    prev + 1
                                            )
                                        }

                                        disabled={
                                            page ===
                                            totalPages
                                        }

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