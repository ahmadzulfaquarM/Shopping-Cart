import products from "../../data/products";
import {
    ProductBreadcrumb,
    ProductGallery,
    ProductInfo,
    ProductTabs,
    RelatedProducts,
} from "../../components/productDetails";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );
    if (!product) {
        return (
            <div className="flex h-screen items-center justify-center">

                <h1 className="text-3xl font-bold text-red-600">
                    Product Not Found
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

                    <RelatedProducts product={product}/>

                </div>

            </div>

        </section>
    );
};

export default ProductDetails;