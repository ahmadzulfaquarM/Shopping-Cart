import { useNavigate } from "react-router-dom";
import {
    FaTshirt,
    FaMobileAlt,
    FaLaptop,
    FaSpa,
    FaHome,
    FaBlender,
    FaShoePrints,
    FaCouch,
    FaFutbol,
    FaBook,
    FaGamepad,
    FaBaby,
} from "react-icons/fa";

// Swap this for a fetch to your backend once categories are dynamic.
const CATEGORIES = [
    { name: "Fashion", icon: <FaTshirt />, count: "12.5k+ items" },
    { name: "Mobiles", icon: <FaMobileAlt />, count: "3.2k+ items" },
    { name: "Electronics", icon: <FaLaptop />, count: "8.1k+ items" },
    { name: "Beauty", icon: <FaSpa />, count: "4.4k+ items" },
    { name: "Home", icon: <FaHome />, count: "6.7k+ items" },
    { name: "Appliances", icon: <FaBlender />, count: "2.9k+ items" },
    { name: "Shoes", icon: <FaShoePrints />, count: "5.3k+ items" },
    { name: "Furniture", icon: <FaCouch />, count: "3.6k+ items" },
    { name: "Sports", icon: <FaFutbol />, count: "2.1k+ items" },
    { name: "Books", icon: <FaBook />, count: "9.8k+ items" },
    { name: "Gaming", icon: <FaGamepad />, count: "1.7k+ items" },
    { name: "Baby Care", icon: <FaBaby />, count: "2.4k+ items" },
];

const Categories = () => {

    const navigate = useNavigate();

    const goToCategory = (name) => {
        navigate(`/products?category=${encodeURIComponent(name)}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HEADER BANNER ================= */}

            <div className="bg-blue-600 px-4 py-10 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Shop by Category
                    </h1>
                    <p className="mt-2 text-sm text-white/80 sm:text-base">
                        Browse our full range and find exactly what you're looking for
                    </p>
                </div>
            </div>


            {/* ================= CATEGORY GRID ================= */}

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                    {CATEGORIES.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => goToCategory(category.name)}
                            className="group flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                {category.icon}
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {category.name}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-400">
                                    {category.count}
                                </p>
                            </div>
                        </button>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Categories;