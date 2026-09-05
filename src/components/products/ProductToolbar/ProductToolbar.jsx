const ProductToolbar = ({
    productCount,
    sortOption,
    setSortOption,
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            {/* Product Count */}

            <div className="text-sm text-gray-600">

                Showing{" "}

                <span className="font-bold text-blue-600">
                    {productCount}
                </span>{" "}

                products

            </div>


            {/* Sort */}

            <div className="flex items-center gap-3">

                <label
                    htmlFor="sort"
                    className="text-sm font-medium text-gray-600"
                >
                    Sort by:
                </label>

                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) =>
                        setSortOption(e.target.value)
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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