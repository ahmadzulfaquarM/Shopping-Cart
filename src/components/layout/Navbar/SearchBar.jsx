import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        const search = searchInput.trim();

        if (!search) {
            navigate("/products");
            return;
        }

        navigate(`/products?search=${encodeURIComponent(search)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex w-full max-w-2xl items-center rounded-md bg-white px-4 py-2.5 shadow-sm transition-all duration-200 focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-200">

            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for products, brands and more"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />

            <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
            >
                <FaSearch className="text-sm" />
            </button>
        </div>
    );
};

export default SearchBar;