const SectionHeading = () => {
    return (
        <div className="mb-16 text-center">

            <span className="inline-block rounded-full border border-blue-600 bg-blue-50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Featured Products
            </span>

            <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
                Best Selling Products
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                Discover our handpicked premium products loved by
                thousands of customers. Quality, style and value
                all in one place.
            </p>

        </div>
    );
};

export default SectionHeading;