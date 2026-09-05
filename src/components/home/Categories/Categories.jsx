import categories from "../../../data/categories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-[1440px] px-8 lg:px-12">

                {/* Section Header */}
                <div className="mb-14 flex items-end justify-between">

                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                            Shop by Category
                        </p>

                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
                            Find What You Love
                        </h2>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
                            Explore our wide range of products carefully selected
                            for your everyday needs and lifestyle.
                        </p>
                    </div>

                    {/* View All */}
                    <a
                        href="/categories"
                        className="hidden items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3 lg:flex"
                    >
                        View All Categories
                        <span>→</span>
                    </a>

                </div>


                {/* Category Grid */}
                <div className="grid grid-cols-3 gap-6">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}

                </div>


                {/* Mobile / Extra View All */}
                <div className="mt-10 text-center lg:hidden">

                    <a
                        href="/categories"
                        className="font-semibold text-blue-600"
                    >
                        View All Categories →
                    </a>

                </div>

            </div>

        </section>
    );
};

export default Categories;