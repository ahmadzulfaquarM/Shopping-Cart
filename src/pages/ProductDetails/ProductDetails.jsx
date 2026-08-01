import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../../services/productService";

import {
    ProductBreadcrumb,
    ProductGallery,
    ProductInfo,
    ProductTabs,
    RelatedProducts,
} from "../../components/productDetails";

const ProductDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);

                setProduct(data.product);
            } catch (error) {
                console.error("Failed to fetch product:", error);

                setError(
                    error.response?.data?.message ||
                    "Product not found"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-600">
                    Loading product...
                </h1>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex h-screen items-center justify-center">
                <h1 className="text-3xl font-bold text-red-600">
                    {error || "Product Not Found"}
                </h1>
            </div>
        );
    }

    return (
        <section className="bg-slate-50 py-14">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                <ProductBreadcrumb />

                <div className="mt-10 grid gap-14 lg:grid-cols-[45%_55%]">

                    <ProductGallery product={product} />

                    <ProductInfo product={product} />

                </div>

                <div className="mt-20">
                    <ProductTabs />
                </div>

                <div className="mt-20">
                    <RelatedProducts product={product} />
                </div>

            </div>

        </section>
    );
};

export default ProductDetails;