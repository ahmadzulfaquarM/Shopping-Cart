const SectionHeading = () => {
    return (
        <div className="flex items-end justify-between">

            {/* Left */}

            <div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                    Featured Products
                </p>

                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
                    Best Sellers
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
                    Discover products loved by our customers,
                    selected for quality, style and everyday value.
                </p>

            </div>


            {/* Right */}

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