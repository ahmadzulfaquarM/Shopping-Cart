import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getProductById,
    updateProduct,
} from "../../../services/productService";

import toast from "react-hot-toast";


const AdminEditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        discount: "",
    });


    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");


    // ======================================================
    // FETCH PRODUCT
    // ======================================================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);

                const data =
                    await getProductById(id);

                const product = data.product;


                setFormData({

                    name: product.name || "",

                    description:
                        product.description || "",

                    price:
                        product.price || "",

                    category:
                        product.category || "",

                    brand:
                        product.brand || "",

                    stock:
                        product.stock || "",

                    discount:
                        product.discount || "",

                });


                // Existing Cloudinary image

                setPreview(
                    product.image || ""
                );


            } catch (error) {

                console.error(
                    "Get Product Error:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchProduct();

    }, [id]);


    // ======================================================
    // HANDLE INPUT
    // ======================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };


    // ======================================================
    // HANDLE IMAGE
    // ======================================================

    const handleImageChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        // Maximum 5MB

        if (file.size > 5 * 1024 * 1024) {

            toast.error(
                "Image must be less than 5MB"
            );

            return;

        }


        // Only images

        if (!file.type.startsWith("image/")) {

            toast.error(
                "Please select a valid image"
            );

            return;

        }


        setImage(file);


        // Preview

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);

    };


    // ======================================================
    // SUBMIT
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setSaving(true);


            const data =
                new FormData();


            // Product information

            data.append(
                "name",
                formData.name
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "price",
                Number(formData.price)
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "brand",
                formData.brand
            );

            data.append(
                "stock",
                Number(formData.stock)
            );

            data.append(
                "discount",
                Number(formData.discount) || 0
            );


            // New image

            if (image) {

                data.append(
                    "image",
                    image
                );

            }


            await updateProduct(
                id,
                data
            );


            toast.success(
                "Product updated successfully"
            );


            setTimeout(() => {

                navigate(
                    "/admin/products"
                );

            }, 700);


        } catch (error) {

            console.error(
                "Update Product Error:",
                error
            );


            toast.error(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setSaving(false);

        }

    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                <p className="font-medium text-gray-600">

                    Loading product...

                </p>

            </div>

        );

    }


    // ======================================================
    // UI
    // ======================================================

    return (

        <div className="max-w-4xl">


            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-900">

                    Edit Product

                </h1>


                <p className="mt-1 text-gray-500">

                    Update your product information

                </p>

            </div>


            {/* FORM */}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
            >


                {/* PRODUCT NAME */}

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
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
                    />

                </div>


                {/* DESCRIPTION */}

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
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
                    />

                </div>


                {/* PRICE + STOCK */}

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


                {/* CATEGORY + BRAND */}

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
                            placeholder="e.g. T-Shirts"
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


                {/* IMAGE */}

                <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                        Product Image

                    </label>


                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full cursor-pointer rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    />


                    <p className="mt-2 text-sm text-gray-500">

                        Select a new image only if you want to replace the current image.

                    </p>


                    {/* IMAGE PREVIEW */}

                    {preview && (

                        <div className="mt-4">

                            <p className="mb-2 text-sm font-semibold text-gray-700">

                                Image Preview

                            </p>


                            <img
                                src={preview}
                                alt="Product preview"
                                className="h-48 w-48 rounded-xl border border-gray-200 object-cover"
                            />

                        </div>

                    )}

                </div>


                {/* DISCOUNT */}

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


                {/* BUTTONS */}

                <div className="flex gap-4 pt-4">


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/products"
                            )
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