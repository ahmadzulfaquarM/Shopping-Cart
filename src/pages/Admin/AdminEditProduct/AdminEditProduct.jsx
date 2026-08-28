import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProductById,
    updateProduct,
} from "../../../services/productService";

const AdminEditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        image: "",
        stock: "",
        discount: "",
    });


    // Fetch product

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getProductById(id);

                const product = data.product;

                setFormData({
                    name: product.name || "",
                    description: product.description || "",
                    price: product.price || "",
                    category: product.category || "",
                    brand: product.brand || "",
                    image: product.image || "",
                    stock: product.stock || "",
                    discount: product.discount || "",
                });

            } catch (error) {

                console.error(
                    "Get Product Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);


    // Handle input

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // Submit

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            await updateProduct(id, {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                discount: Number(formData.discount),
            });

            setSuccess(
                "Product updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);

        } catch (error) {

            console.error(
                "Update Product Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="font-medium text-gray-600">
                    Loading product...
                </p>
            </div>
        );

    }


    return (
        <div className="max-w-4xl">

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Product
                </h1>

                <p className="mt-1 text-gray-500">
                    Update your product information
                </p>

            </div>


            {error && (
                <div className="mb-6 rounded-xl bg-red-100 px-5 py-4 font-medium text-red-700">
                    {error}
                </div>
            )}


            {success && (
                <div className="mb-6 rounded-xl bg-green-100 px-5 py-4 font-medium text-green-700">
                    {success}
                </div>
            )}


            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
            >

                {/* Name */}

                <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>


                {/* Description */}

                <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>


                {/* Price + Stock */}

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>


                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                </div>


                {/* Category + Brand */}

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>


                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                </div>


                {/* Image */}

                <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                        Image URL
                    </label>

                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>


                {/* Discount */}

                <div>

                    <label className="mb-2 block font-semibold text-gray-700">
                        Discount (%)
                    </label>

                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>


                {/* Buttons */}

                <div className="flex gap-4 pt-4">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                        className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {saving
                            ? "Updating..."
                            : "Update Product"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default AdminEditProduct;