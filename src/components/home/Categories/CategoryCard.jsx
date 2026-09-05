import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/category/${category.slug}`}
            className="
                group
                relative
                flex
                min-h-[310px]
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-7
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-xl
            "
        >

            {/* Background Glow */}
            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-48
                    w-48
                    rounded-full
                    bg-blue-50
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:scale-150
                    group-hover:opacity-100
                "
            ></div>


            {/* Content */}
            <div className="relative z-10 flex w-full flex-col justify-between">

                {/* Top */}
                <div>

                    <div className="flex items-start justify-between">

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {category.name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {category.productCount}+ Products
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-gray-50
                                text-gray-500
                                transition-all
                                duration-300
                                group-hover:bg-blue-600
                                group-hover:text-white
                            "
                        >
                            <FaArrowRight className="text-sm transition-transform duration-300 group-hover:-rotate-45" />
                        </div>

                    </div>

                </div>


                {/* Image */}
                <div className="mt-4 flex flex-1 items-center justify-center">

                    <img
                        src={category.image}
                        alt={category.name}
                        className="
                            h-44
                            w-52
                            object-contain
                            transition-all
                            duration-500
                            group-hover:scale-110
                        "
                    />

                </div>


                {/* Bottom */}
                <div className="mt-4 flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-600 transition-colors duration-300 group-hover:text-blue-600">
                        Shop Collection
                    </span>

                    <span className="text-sm font-medium text-gray-400">
                        →
                    </span>

                </div>

            </div>

        </Link>
    );
};

export default CategoryCard;