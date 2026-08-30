import React, {
    useEffect,
    useState,
} from "react";

import {
    FaPlus,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import {
    getProducts,
} from "../../services/productService";

import AdminProductTable from "../../components/admin/AdminProductTable";

import { useNavigate } from "react-router-dom";


const AdminProducts = () => {

    const navigate = useNavigate();


    // ======================================================
    // PRODUCTS
    // ======================================================

    const [products, setProducts] =
        useState([]);


    // ======================================================
    // LOADING / ERROR
    // ======================================================

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ======================================================
    // PAGINATION
    // ======================================================

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [totalProducts, setTotalProducts] =
        useState(0);


    const limit = 10;


    // ======================================================
    // FETCH PRODUCTS
    // ======================================================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getProducts({
                    page,
                    limit,
                });


            setProducts(
                data.products || []
            );


            setTotalPages(
                data.totalPages || 1
            );


            setTotalProducts(
                data.totalProducts || 0
            );


        } catch (error) {

            console.error(
                "Admin Products Error:",
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


    // ======================================================
    // FETCH WHEN PAGE CHANGES
    // ======================================================

    useEffect(() => {

        fetchProducts();

    }, [page]);


    // ======================================================
    // REFRESH
    // ======================================================

    const refreshProducts = async () => {

        await fetchProducts();

    };


    // ======================================================
    // PAGE CHANGE
    // ======================================================

    const goToPreviousPage = () => {

        if (page > 1) {

            setPage(
                (previous) =>
                    previous - 1
            );
        }
    };


    const goToNextPage = () => {

        if (page < totalPages) {

            setPage(
                (previous) =>
                    previous + 1
            );
        }
    };


    return (

        <div className="min-h-screen bg-gray-50">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <h1 className="text-2xl font-bold text-gray-900">

                        Products

                    </h1>


                    <p className="mt-1 text-gray-500">

                        Manage your store products

                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/admin/products/add"
                        )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                    <FaPlus />

                    Add Product

                </button>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div className="mb-6 rounded-xl bg-red-100 px-5 py-4 font-medium text-red-700">

                    {error}

                </div>

            )}


            {/* ==================================================
                TOTAL PRODUCTS
            ================================================== */}

            {!loading && !error && (

                <div className="mb-5 flex items-center justify-between">

                    <p className="text-sm text-gray-500">

                        Total Products:

                        {" "}

                        <span className="font-semibold text-gray-900">

                            {totalProducts}

                        </span>

                    </p>


                    <p className="text-sm text-gray-500">

                        Page

                        {" "}

                        <span className="font-semibold text-gray-900">

                            {page}

                        </span>

                        {" "}
                        of
                        {" "}

                        <span className="font-semibold text-gray-900">

                            {totalPages}

                        </span>

                    </p>

                </div>

            )}


            {/* ==================================================
                LOADING
            ================================================== */}

            {loading ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="font-medium text-gray-600">

                        Loading products...

                    </p>

                </div>

            ) : (

                <>

                    {/* Product Table */}

                    <AdminProductTable
                        products={products}
                        refreshProducts={
                            refreshProducts
                        }
                    />


                    {/* ==================================================
                        PAGINATION
                    ================================================== */}

                    {totalPages > 1 && (

                        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">

                            <p className="text-sm text-gray-500">

                                Showing

                                {" "}

                                <span className="font-semibold text-gray-900">

                                    {(page - 1) *
                                        limit +
                                        1}

                                </span>

                                {" "}
                                to

                                {" "}

                                <span className="font-semibold text-gray-900">

                                    {Math.min(
                                        page *
                                            limit,
                                        totalProducts
                                    )}

                                </span>

                                {" "}
                                of

                                {" "}

                                <span className="font-semibold text-gray-900">

                                    {totalProducts}

                                </span>

                                {" "}
                                products

                            </p>


                            <div className="flex items-center gap-3">

                                {/* Previous */}

                                <button
                                    type="button"
                                    onClick={
                                        goToPreviousPage
                                    }
                                    disabled={
                                        page === 1
                                    }
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >

                                    <FaChevronLeft />

                                    Previous

                                </button>


                                {/* Page Number */}

                                <span className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-700">

                                    {page}

                                </span>


                                {/* Next */}

                                <button
                                    type="button"
                                    onClick={
                                        goToNextPage
                                    }
                                    disabled={
                                        page ===
                                        totalPages
                                    }
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >

                                    Next

                                    <FaChevronRight />

                                </button>

                            </div>

                        </div>

                    )}

                </>

            )}

        </div>
    );
};


export default AdminProducts;