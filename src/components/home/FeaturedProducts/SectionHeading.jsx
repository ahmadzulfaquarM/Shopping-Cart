import { Link } from "react-router-dom";

const SectionHeading = () => {
    return (
        <div className="flex items-end justify-between gap-6">
            {/* LEFT */}
            <div className="min-w-0">
                <p
                    className="
                        mb-2
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-blue-600

                        sm:mb-3
                        sm:text-sm
                        sm:tracking-[0.2em]
                    "
                >
                    Featured Products
                </p>

                <h2
                    className="
                        text-3xl
                        font-extrabold
                        tracking-tight
                        text-gray-900

                        sm:text-4xl

                        lg:text-5xl
                    "
                >
                    Best Sellers
                </h2>

                <p
                    className="
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-6
                        text-gray-500

                        sm:mt-4
                        sm:text-base
                        sm:leading-7
                    "
                >
                    Discover products loved by our customers,
                    selected for quality, style and everyday value.
                </p>
            </div>

            {/* DESKTOP VIEW ALL */}
            <Link
                to="/products"
                className="
                    group
                    hidden
                    shrink-0
                    items-center
                    gap-2
                    font-semibold
                    text-blue-600
                    transition-colors
                    duration-200
                    hover:text-blue-700
                    lg:flex
                "
            >
                <span>View All</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            </Link>
        </div>
    );
};

export default SectionHeading;