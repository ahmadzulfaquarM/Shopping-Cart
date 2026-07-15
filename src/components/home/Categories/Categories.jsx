import categories from "../../../data/categories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                {/* Heading */}
                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full border border-blue-600 bg-blue-50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Shop by Category
                    </span>

                    <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Explore Our Categories
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        Discover premium collections curated for every lifestyle.
                        Explore fashion, electronics, beauty, furniture,
                        sports and more.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default Categories;