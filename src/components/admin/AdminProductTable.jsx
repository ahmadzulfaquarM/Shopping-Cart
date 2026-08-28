import React, { useState } from "react";
import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/productService";

const AdminProductTable = ({
    products,
    refreshProducts,
}) => {

    const navigate = useNavigate();

    const [deletingId, setDeletingId] = useState(null);


    const handleDelete = async (product) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(product._id);

            await deleteProduct(product._id);

            await refreshProducts();

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


    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead className="border-b border-gray-200 bg-gray-50">

                        <tr>

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


                    <tbody className="divide-y divide-gray-100">

                        {products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No products found.
                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* Product */}

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-xl bg-gray-100 object-contain p-2"
                                            />

                                            <div>

                                                <p className="font-semibold text-gray-900">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product.brand}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Category */}

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.category}
                                    </td>


                                    {/* Price */}

                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        ₹{product.price}
                                    </td>


                                    {/* Stock */}

                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                product.stock > 0
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {product.stock}
                                        </span>

                                    </td>


                                    {/* Rating */}

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        ⭐ {product.rating}
                                    </td>


                                    {/* Actions */}

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
                                                    handleDelete(product)
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

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminProductTable;