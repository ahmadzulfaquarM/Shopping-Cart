const categories = [
    "Fashion",
    "Electronics",
    "Beauty",
    "Furniture",
    "Shoes",
];

const prices = [
    {
        label: "Under ₹500",
        value: "under500",
    },
    {
        label: "₹500 - ₹2000",
        value: "500-2000",
    },
    {
        label: "₹2000 - ₹5000",
        value: "2000-5000",
    },
    {
        label: "Above ₹5000",
        value: "5000+",
    },
];

const ProductFilters = ({
    selectedCategories,
    setSelectedCategories,
    selectedPrice,
    setSelectedPrice,
    inStockOnly,
    setInStockOnly,
}) => {

    const handleCategoryChange = (category) => {

        if (selectedCategories.includes(category)) {

            setSelectedCategories(
                selectedCategories.filter(
                    (item) => item !== category
                )
            );

        } else {

            setSelectedCategories([
                ...selectedCategories,
                category,
            ]);

        }

    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedPrice("");
        setInStockOnly(false);
    };

    return (

        <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-3xl font-bold text-gray-900">
                Filters
            </h2>

            {/* Categories */}

            <div className="mt-10">

                <h3 className="text-lg font-semibold text-gray-900">
                    Categories
                </h3>

                <div className="mt-5 space-y-4">

                    {categories.map((category) => (

                        <label
                            key={category}
                            className="flex cursor-pointer items-center gap-3"
                        >

                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() =>
                                    handleCategoryChange(category)
                                }
                                className="h-4 w-4 accent-blue-600"
                            />

                            <span className="text-gray-700">
                                {category}
                            </span>

                        </label>

                    ))}

                </div>

            </div>

            {/* Price */}

            <div className="mt-10">

                <h3 className="text-lg font-semibold text-gray-900">
                    Price
                </h3>

                <div className="mt-5 space-y-4">

                    {prices.map((price) => (

                        <label
                            key={price.value}
                            className="flex cursor-pointer items-center gap-3"
                        >

                            <input
                                type="radio"
                                name="price"
                                value={price.value}
                                checked={selectedPrice === price.value}
                                onChange={(e) =>
                                    setSelectedPrice(e.target.value)
                                }
                                className="accent-blue-600"
                            />

                            <span className="text-gray-700">
                                {price.label}
                            </span>

                        </label>

                    ))}

                </div>

            </div>

            {/* Availability */}

            <div className="mt-10">

                <h3 className="text-lg font-semibold text-gray-900">
                    Availability
                </h3>

                <label className="mt-5 flex cursor-pointer items-center gap-3">

                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() =>
                            setInStockOnly(!inStockOnly)
                        }
                        className="h-4 w-4 accent-blue-600"
                    />

                    <span className="text-gray-700">
                        In Stock Only
                    </span>

                </label>

            </div>

            {/* Clear Filters */}

            <button
                onClick={clearFilters}
                className="mt-12 w-full rounded-2xl border-2 border-blue-600 py-3 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
                Clear Filters
            </button>

        </aside>

    );

};

export default ProductFilters;