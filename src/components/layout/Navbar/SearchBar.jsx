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

        navigate(
            `/products?search=${encodeURIComponent(search)}`
        );
    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            handleSearch();
        }

    };

    return (
        <div className="flex w-full max-w-2xl items-center rounded-sm bg-white px-4 py-2.5 shadow-sm transition-shadow focus-within:shadow-md">

            {/* Input */}

            <input
                type="text"
                value={searchInput}
                onChange={(e) =>
                    setSearchInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Search for products, brands and more"
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />

            {/* Search Button */}

            <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-blue-600 transition hover:bg-blue-50"
            >
                <FaSearch className="text-sm" />
            </button>

        </div>
    );
};

export default SearchBar;
