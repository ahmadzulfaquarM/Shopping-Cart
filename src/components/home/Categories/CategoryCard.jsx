import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/products?category=${encodeURIComponent(category.name)}`}
            aria-label={`Shop ${category.name}`}
            className="
                group
                relative
                flex
                min-h-[250px]
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2

                sm:min-h-[280px]
                sm:rounded-2xl
                sm:p-5

                lg:min-h-[310px]
                lg:p-7
            "
        >
            {/* BACKGROUND GLOW */}
            <div
                className="
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-blue-50
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:scale-150
                    group-hover:opacity-100

                    sm:-right-16
                    sm:-top-16
                    sm:h-48
                    sm:w-48
                "
            />

            {/* CONTENT */}
            <div className="relative z-10 flex w-full flex-col justify-between">
                {/* TOP */}
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3
                            className="
                                truncate
                                text-lg
                                font-bold
                                text-gray-900
                                transition-colors
                                duration-300
                                group-hover:text-blue-600

                                sm:text-xl

                                lg:text-2xl
                            "
                        >
                            {category.name}
                        </h3>

                        <p className="mt-1 text-[11px] text-gray-500 sm:mt-2 sm:text-sm">
                            {category.productCount}+ Products
                        </p>
                    </div>

                    {/* ARROW */}
                    <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-50
                            text-gray-500
                            transition-all
                            duration-300
                            group-hover:bg-blue-600
                            group-hover:text-white

                            sm:h-9
                            sm:w-9

                            lg:h-10
                            lg:w-10
                        "
                    >
                        <FaArrowRight
                            className="
                                text-[10px]
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                                group-hover:-rotate-45

                                sm:text-xs

                                lg:text-sm
                            "
                        />
                    </div>
                </div>

                {/* IMAGE */}
                <div
                    className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        py-3

                        sm:py-4

                        lg:mt-4
                    "
                >
                    <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        className="
                            h-24
                            w-28
                            object-contain
                            transition-transform
                            duration-500
                            group-hover:scale-110

                            sm:h-32
                            sm:w-36

                            lg:h-44
                            lg:w-52
                        "
                    />
                </div>

                {/* BOTTOM */}
                <div
                    className="
                        mt-2
                        flex
                        items-center
                        justify-between

                        sm:mt-3

                        lg:mt-4
                    "
                >
                    <span
                        className="
                            text-[11px]
                            font-semibold
                            text-gray-600
                            transition-colors
                            duration-300
                            group-hover:text-blue-600

                            sm:text-sm
                        "
                    >
                        Shop Collection
                    </span>

                    <span
                        className="
                            text-xs
                            font-medium
                            text-gray-400
                            transition-transform
                            duration-300
                            group-hover:translate-x-1

                            sm:text-sm
                        "
                    >
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;