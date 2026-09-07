const SectionHeading = () => {
    return (
        <div className="flex items-end justify-between">

            {/* ================= LEFT ================= */}

            <div>

                <p className="
                    mb-2
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-blue-600

                    sm:mb-3
                    sm:text-sm
                    sm:tracking-[0.2em]
                ">
                    Featured Products
                </p>


                <h2 className="
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-gray-900

                    sm:text-4xl

                    lg:text-5xl
                ">
                    Best Sellers
                </h2>


                <p className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-gray-500

                    sm:mt-4
                    sm:text-base
                    sm:leading-7
                ">
                    Discover products loved by our customers,
                    selected for quality, style and everyday value.
                </p>

            </div>


            {/* ================= RIGHT ================= */}

            <a
                href="/products"
                className="
                    hidden
                    items-center
                    gap-2
                    font-semibold
                    text-blue-600
                    transition-all
                    duration-300
                    hover:gap-3
                    lg:flex
                "
            >
                View All

                <span>→</span>

            </a>

        </div>
    );
};

export default SectionHeading;