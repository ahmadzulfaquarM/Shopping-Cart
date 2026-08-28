import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../services/api";

const AddProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        image: "",
        stock: "",
        rating: "",
        numReviews: "",
        discount: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await api.post("/products", {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                rating: Number(formData.rating) || 0,
                numReviews: Number(formData.numReviews) || 0,
                discount: Number(formData.discount) || 0,
            });

            if (data.data.success) {
                toast.success("Product added successfully");

                navigate("/admin/products");
            }

        } catch (error) {
            console.error("Add Product Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">

            <div className="mx-auto max-w-4xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Add Product
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add a new product to your store
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Brand
                            </label>

                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="Enter brand"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="Enter price"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="e.g. Shoes"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="Enter stock"
                            />
                        </div>

                        {/* Discount */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Discount (%)
                            </label>

                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="0"
                            />
                        </div>

                        {/* Image */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-medium">
                                Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                                placeholder="Enter product description"
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loading
                                ? "Adding Product..."
                                : "Add Product"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddProduct;