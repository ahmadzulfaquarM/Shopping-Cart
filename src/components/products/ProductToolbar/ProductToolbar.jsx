import { FaSearch } from "react-icons/fa";

const ProductToolbar = ({
    searchTerm,
    setSearchTerm,
    productCount,
    sortOption,
    setSortOption,
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            {/* Search */}

            <div className="relative w-full md:max-w-md">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-blue-600"
                />

            </div>

            {/* Right Side */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                {/* Product Count */}

                Showing
                <span className="mx-1 font-bold text-blue-600">
                    {productCount}
                </span>
                products

                {/* Sort */}

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="rounded-2xl border border-gray-200 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-blue-600"
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