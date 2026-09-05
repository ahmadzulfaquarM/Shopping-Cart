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
        label: "₹500 - ₹2,000",
        value: "500-2000",
    },
    {
        label: "₹2,000 - ₹5,000",
        value: "2000-5000",
    },
    {
        label: "Above ₹5,000",
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


    // =====================================================
    // CATEGORY
    // =====================================================

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


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const clearFilters = () => {

        setSelectedCategories([]);

        setSelectedPrice("");

        setInStockOnly(false);

    };


    // =====================================================
    // CHECK ACTIVE FILTERS
    // =====================================================

    const activeFilterCount =
        selectedCategories.length +
        (selectedPrice ? 1 : 0) +
        (inStockOnly ? 1 : 0);


    return (

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white shadow-sm">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                <div>

                    <h2 className="text-xl font-bold text-gray-900">
                        Filters
                    </h2>

                    {activeFilterCount > 0 && (

                        <p className="mt-1 text-xs text-gray-500">

                            {activeFilterCount}{" "}
                            {activeFilterCount === 1
                                ? "filter"
                                : "filters"}{" "}
                            applied

                        </p>

                    )}

                </div>


                {activeFilterCount > 0 && (

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        Clear All
                    </button>

                )}

            </div>


            {/* =================================================
                FILTER CONTENT
            ================================================= */}

            <div className="px-6 py-6">


                {/* =================================================
                    CATEGORIES
                ================================================= */}

                <div>

                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        Categories
                    </h3>


                    <div className="mt-4 space-y-3">

                        {categories.map((category) => {

                            const isSelected =
                                selectedCategories.includes(
                                    category
                                );

                            return (

                                <label
                                    key={category}
                                    className="group flex cursor-pointer items-center justify-between"
                                >

                                    <div className="flex items-center gap-3">

                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() =>
                                                handleCategoryChange(
                                                    category
                                                )
                                            }
                                            className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
                                        />

                                        <span
                                            className={`text-sm transition ${
                                                isSelected
                                                    ? "font-semibold text-blue-600"
                                                    : "text-gray-600 group-hover:text-gray-900"
                                            }`}
                                        >
                                            {category}
                                        </span>

                                    </div>

                                </label>

                            );

                        })}

                    </div>

                </div>


                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div className="my-7 border-t border-gray-100"></div>


                {/* =================================================
                    PRICE
                ================================================= */}

                <div>

                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        Price
                    </h3>


                    <div className="mt-4 space-y-3">

                        {prices.map((price) => {

                            const isSelected =
                                selectedPrice ===
                                price.value;

                            return (

                                <label
                                    key={price.value}
                                    className="group flex cursor-pointer items-center gap-3"
                                >

                                    <input
                                        type="radio"
                                        name="price"
                                        value={price.value}
                                        checked={isSelected}
                                        onChange={(e) =>
                                            setSelectedPrice(
                                                e.target.value
                                            )
                                        }
                                        className="h-4 w-4 cursor-pointer accent-blue-600"
                                    />

                                    <span
                                        className={`text-sm transition ${
                                            isSelected
                                                ? "font-semibold text-blue-600"
                                                : "text-gray-600 group-hover:text-gray-900"
                                        }`}
                                    >
                                        {price.label}
                                    </span>

                                </label>

                            );

                        })}

                    </div>

                </div>


                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div className="my-7 border-t border-gray-100"></div>


                {/* =================================================
                    AVAILABILITY
                ================================================= */}

                <div>

                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        Availability
                    </h3>


                    <label className="mt-4 flex cursor-pointer items-center gap-3">

                        <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={() =>
                                setInStockOnly(
                                    !inStockOnly
                                )
                            }
                            className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
                        />

                        <span
                            className={`text-sm ${
                                inStockOnly
                                    ? "font-semibold text-blue-600"
                                    : "text-gray-600"
                            }`}
                        >
                            In Stock Only
                        </span>

                    </label>

                </div>


                {/* =================================================
                    CLEAR BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={clearFilters}
                    disabled={activeFilterCount === 0}
                    className="mt-8 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-gray-50 disabled:hover:text-gray-700"
                >
                    Clear Filters
                </button>

            </div>

        </aside>

    );

};

export default ProductFilters;