import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    return (
        <div className="hidden lg:flex w-60 items-center rounded-full border border-gray-200 bg-white px-4 py-2 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-md">
            <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm outline-none"
            />

            <button
                aria-label="Search"
                className="cursor-pointer text-gray-500 transition-colors duration-300 hover:text-blue-600"
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchBar;