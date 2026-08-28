import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getProducts } from "../../services/productService";
import AdminProductTable from "../../components/admin/AdminProductTable";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getProducts({
                page: 1,
                limit: 100,
            });

            setProducts(data.products || []);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}

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
                    onClick={() => navigate("/admin/products/add")}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Add Product
                </button>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-6 rounded-xl bg-red-100 px-5 py-4 font-medium text-red-700">
                    {error}
                </div>
            )}


            {/* Loading */}

            {loading ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <p className="font-medium text-gray-600">
                        Loading products...
                    </p>
                </div>

            ) : (

                <AdminProductTable
                    products={products}
                    refreshProducts={fetchProducts}
                />

            )}

        </div>
    );
};

export default AdminProducts;