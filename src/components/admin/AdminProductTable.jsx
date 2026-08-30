import React, { useState } from "react";

import {
    FaEdit,
    FaTrash,
    FaExclamationTriangle,
    FaImage,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { deleteProduct } from "../../services/productService";


const AdminProductTable = ({
    products,
    refreshProducts,
}) => {

    const navigate = useNavigate();

    const [deletingId, setDeletingId] = useState(null);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [productToDelete, setProductToDelete] =
        useState(null);

    const [imagePreview, setImagePreview] =
        useState(null);


    // ======================================================
    // STOCK STATUS
    // ======================================================

    const getStockStatus = (stock) => {

        if (stock === 0) {
            return {
                label: "Out of Stock",
                className:
                    "bg-red-100 text-red-700",
            };
        }

        if (stock <= 5) {
            return {
                label: "Low Stock",
                className:
                    "bg-yellow-100 text-yellow-700",
            };
        }

        return {
            label: "In Stock",
            className:
                "bg-green-100 text-green-700",
        };
    };


    // ======================================================
    // SELECT SINGLE PRODUCT
    // ======================================================

    const handleSelectProduct = (id) => {

        setSelectedProducts((previous) => {

            if (previous.includes(id)) {

                return previous.filter(
                    (productId) =>
                        productId !== id
                );
            }

            return [
                ...previous,
                id,
            ];
        });
    };


    // ======================================================
    // SELECT ALL PRODUCTS
    // ======================================================

    const handleSelectAll = () => {

        if (
            selectedProducts.length ===
            products.length
        ) {

            setSelectedProducts([]);

        } else {

            setSelectedProducts(
                products.map(
                    (product) =>
                        product._id
                )
            );
        }
    };


    // ======================================================
    // OPEN SINGLE DELETE MODAL
    // ======================================================

    const openDeleteModal = (product) => {

        setProductToDelete(product);

        setShowDeleteModal(true);
    };


    // ======================================================
    // CLOSE DELETE MODAL
    // ======================================================

    const closeDeleteModal = () => {

        if (deletingId) {
            return;
        }

        setShowDeleteModal(false);

        setProductToDelete(null);
    };


    // ======================================================
    // DELETE SINGLE PRODUCT
    // ======================================================

    const handleDelete = async () => {

        if (!productToDelete) {
            return;
        }

        try {

            setDeletingId(
                productToDelete._id
            );

            await deleteProduct(
                productToDelete._id
            );

            setSelectedProducts(
                (previous) =>
                    previous.filter(
                        (id) =>
                            id !==
                            productToDelete._id
                    )
            );

            await refreshProducts();

            setShowDeleteModal(false);

            setProductToDelete(null);

        } catch (error) {

            console.error(
                "Delete Product Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        } finally {

            setDeletingId(null);
        }
    };


    // ======================================================
    // BULK DELETE
    // ======================================================

    const handleBulkDelete = async () => {

        if (
            selectedProducts.length === 0
        ) {
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete ${selectedProducts.length} selected product(s)?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId("bulk");

            for (
                const productId
                of selectedProducts
            ) {

                await deleteProduct(
                    productId
                );
            }

            setSelectedProducts([]);

            await refreshProducts();

        } catch (error) {

            console.error(
                "Bulk Delete Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete selected products"
            );

        } finally {

            setDeletingId(null);
        }
    };


    return (
        <>
            {/* ==================================================
                BULK ACTION BAR
            ================================================== */}

            {selectedProducts.length > 0 && (

                <div className="mb-4 flex flex-col justify-between gap-4 rounded-2xl bg-blue-50 p-4 sm:flex-row sm:items-center">

                    <p className="font-semibold text-blue-700">

                        {selectedProducts.length}
                        {" "}
                        product
                        {selectedProducts.length > 1
                            ? "s"
                            : ""}
                        {" "}
                        selected

                    </p>


                    <button
                        type="button"
                        onClick={handleBulkDelete}
                        disabled={
                            deletingId === "bulk"
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <FaTrash />

                        {deletingId === "bulk"
                            ? "Deleting..."
                            : "Delete Selected"}

                    </button>

                </div>
            )}


            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        {/* ==================================================
                            HEADER
                        ================================================== */}

                        <thead className="border-b border-gray-200 bg-gray-50">

                            <tr>

                                {/* Select */}

                                <th className="w-12 px-4 py-4">

                                    <input
                                        type="checkbox"
                                        checked={
                                            products.length > 0 &&
                                            selectedProducts.length ===
                                                products.length
                                        }
                                        onChange={
                                            handleSelectAll
                                        }
                                        className="h-4 w-4 cursor-pointer rounded border-gray-300"
                                    />

                                </th>


                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Product
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Stock
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Rating
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        {/* ==================================================
                            BODY
                        ================================================== */}

                        <tbody className="divide-y divide-gray-100">

                            {products.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        No products found.
                                    </td>

                                </tr>

                            ) : (

                                products.map(
                                    (product) => {

                                        const stockStatus =
                                            getStockStatus(
                                                product.stock
                                            );


                                        return (

                                            <tr
                                                key={
                                                    product._id
                                                }
                                                className="transition hover:bg-gray-50"
                                            >

                                                {/* ==================================================
                                                    CHECKBOX
                                                ================================================== */}

                                                <td className="px-4 py-4">

                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.includes(
                                                            product._id
                                                        )}
                                                        onChange={() =>
                                                            handleSelectProduct(
                                                                product._id
                                                            )
                                                        }
                                                        className="h-4 w-4 cursor-pointer rounded border-gray-300"
                                                    />

                                                </td>


                                                {/* ==================================================
                                                    PRODUCT
                                                ================================================== */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-4">

                                                        {/* Image */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setImagePreview(
                                                                    product.image
                                                                )
                                                            }
                                                            className="group relative h-14 w-14 overflow-hidden rounded-xl bg-gray-100"
                                                        >

                                                            {product.image ? (

                                                                <img
                                                                    src={
                                                                        product.image
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="h-full w-full object-contain p-2 transition group-hover:scale-110"
                                                                />

                                                            ) : (

                                                                <div className="flex h-full w-full items-center justify-center text-gray-400">

                                                                    <FaImage />

                                                                </div>

                                                            )}

                                                        </button>


                                                        {/* Name */}

                                                        <div>

                                                            <p className="font-semibold text-gray-900">

                                                                {
                                                                    product.name
                                                                }

                                                            </p>

                                                            <p className="mt-1 text-sm text-gray-500">

                                                                {
                                                                    product.brand
                                                                }

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* ==================================================
                                                    CATEGORY
                                                ================================================== */}

                                                <td className="px-6 py-4 text-sm text-gray-600">

                                                    {
                                                        product.category
                                                    }

                                                </td>


                                                {/* ==================================================
                                                    PRICE
                                                ================================================== */}

                                                <td className="px-6 py-4 font-semibold text-gray-900">

                                                    ₹
                                                    {
                                                        product.price
                                                    }

                                                </td>


                                                {/* ==================================================
                                                    STOCK
                                                ================================================== */}

                                                <td className="px-6 py-4">

                                                    <div className="flex flex-col items-start gap-1">

                                                        <span
                                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${stockStatus.className}`}
                                                        >

                                                            {
                                                                product.stock
                                                            }

                                                        </span>


                                                        <span
                                                            className={`text-xs font-medium ${
                                                                product.stock === 0
                                                                    ? "text-red-600"
                                                                    : product.stock <= 5
                                                                    ? "text-yellow-600"
                                                                    : "text-green-600"
                                                            }`}
                                                        >

                                                            {
                                                                stockStatus.label
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* ==================================================
                                                    RATING
                                                ================================================== */}

                                                <td className="px-6 py-4 text-sm text-gray-600">

                                                    ⭐
                                                    {" "}
                                                    {
                                                        product.rating
                                                    }

                                                </td>


                                                {/* ==================================================
                                                    ACTIONS
                                                ================================================== */}

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        {/* Edit */}

                                                        <button
                                                            type="button"
                                                            title="Edit Product"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/products/edit/${product._id}`
                                                                )
                                                            }
                                                            className="rounded-lg p-3 text-blue-600 transition hover:bg-blue-50"
                                                        >

                                                            <FaEdit />

                                                        </button>


                                                        {/* Delete */}

                                                        <button
                                                            type="button"
                                                            title="Delete Product"
                                                            onClick={() =>
                                                                openDeleteModal(
                                                                    product
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                product._id
                                                            }
                                                            className="rounded-lg p-3 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >

                                                            {deletingId ===
                                                            product._id ? (
                                                                "..."
                                                            ) : (
                                                                <FaTrash />
                                                            )}

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );
                                    }
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ==================================================
                IMAGE PREVIEW MODAL
            ================================================== */}

            {imagePreview && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() =>
                        setImagePreview(null)
                    }
                >

                    <div
                        className="relative max-h-[90vh] max-w-3xl rounded-2xl bg-white p-4 shadow-xl"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            onClick={() =>
                                setImagePreview(null)
                            }
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-lg text-white"
                        >
                            ×
                        </button>

                        <img
                            src={imagePreview}
                            alt="Product preview"
                            className="max-h-[80vh] max-w-full rounded-xl object-contain"
                        />

                    </div>

                </div>

            )}


            {/* ==================================================
                DELETE CONFIRMATION MODAL
            ================================================== */}

            {showDeleteModal &&
                productToDelete && (

                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={closeDeleteModal}
                    >

                        <div
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">

                                    <FaExclamationTriangle />

                                </div>


                                <div>

                                    <h2 className="text-xl font-bold text-gray-900">

                                        Delete Product?

                                    </h2>

                                    <p className="mt-2 text-gray-600">

                                        Are you sure you want to delete

                                        {" "}

                                        <span className="font-semibold text-gray-900">

                                            "{productToDelete.name}"

                                        </span>

                                        ?

                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">

                                        This action cannot be undone.

                                    </p>

                                </div>

                            </div>


                            <div className="mt-6 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={
                                        closeDeleteModal
                                    }
                                    disabled={
                                        !!deletingId
                                    }
                                    className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                                >

                                    Cancel

                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        handleDelete
                                    }
                                    disabled={
                                        !!deletingId
                                    }
                                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {deletingId
                                        ? "Deleting..."
                                        : "Delete Product"}

                                </button>

                            </div>

                        </div>

                    </div>
                )}

        </>
    );
};


export default AdminProductTable;