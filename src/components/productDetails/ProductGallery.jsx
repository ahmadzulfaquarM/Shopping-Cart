import { useState } from "react";

const ProductGallery = ({ product }) => {
    const images = product?.image ? [product.image] : [];

    const [selectedImage, setSelectedImage] = useState(
        images[0] || ""
    );

    return (
        <div className="grid gap-6 md:grid-cols-[90px_1fr]">

            {/* Thumbnails */}

            <div className="flex flex-row gap-4 md:flex-col">

                {images.map((image, index) => (

                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                            selectedImage === image
                                ? "border-blue-600 shadow-lg"
                                : "border-gray-200 hover:border-blue-400"
                        }`}
                    >

                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="h-20 w-20 bg-white object-contain p-2"
                        />

                    </button>

                ))}

            </div>

            {/* Main Image */}

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">

                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="mx-auto h-[500px] object-contain transition duration-500 hover:scale-110"
                    />
                ) : (
                    <div className="flex h-[500px] items-center justify-center text-gray-400">
                        No image available
                    </div>
                )}

            </div>

        </div>
    );
};

export default ProductGallery;