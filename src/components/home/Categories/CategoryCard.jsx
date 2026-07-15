import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/category/${category.slug}`}
            className="
                group
                block
                relative
                overflow-hidden
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-blue-600
                hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]
            "
        >

            {/* Blue Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <div className="relative z-10">

                {/* Image */}
                <div className="flex justify-center">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="
                            h-56
                            w-56
                            object-contain
                            transition-all
                            duration-500
                            group-hover:scale-105
                            group-hover:-translate-y-2
                        "
                    />
                </div>

                {/* Content */}

                <div className="mt-6 text-center">

                    <h3 className="text-2xl font-bold text-gray-900">
                        {category.name}
                    </h3>

                    {/* Product Count */}

                    <div className="mt-4">
                        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                            {category.productCount}+ Products
                        </span>
                    </div>

                    {/* Shop */}

                    <div
                        className="
                            mt-7
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-blue-600
                            transition-all
                            duration-300
                            group-hover:gap-4
                        "
                    >
                        Shop Collection
                        <FaArrowRight />
                    </div>

                </div>

            </div>

        </Link>
    );
};

export default CategoryCard;