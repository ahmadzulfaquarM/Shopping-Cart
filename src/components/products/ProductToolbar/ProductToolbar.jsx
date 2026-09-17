const ProductToolbar = ({
    productCount,
    sortOption,
    setSortOption,
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 md:flex-row md:items-center md:justify-between md:p-6">

            {/* Product Count */}

            <div className="text-sm text-gray-600">
                Showing{" "}

                <span className="font-bold text-blue-600">
                    {productCount}
                </span>{" "}

                products
            </div>


            {/* Sort */}

            <div className="flex w-full items-center gap-3 md:w-auto">

                <label
                    htmlFor="sort"
                    className="shrink-0 text-sm font-medium text-gray-600"
                >
                    Sort by:
                </label>

                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) =>
                        setSortOption(e.target.value)
                    }
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3 md:w-[190px] md:flex-none"
                >
                    <option value="featured">
                        Featured
                    </option>

                    <option value="newest">
                        Newest
                    </option>

                    <option value="price-low">
                        Price: Low to High
                    </option>

                    <option value="price-high">
                        Price: High to Low
                    </option>

                    <option value="rating">
                        Highest Rated
                    </option>
                </select>

            </div>

        </div>
    );
};

export default ProductToolbar;