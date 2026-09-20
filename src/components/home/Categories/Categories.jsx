import { Link } from "react-router-dom";
import categories from "../../../data/categories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
    return (
        <section className="bg-slate-50 py-14 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
                {/* SECTION HEADER */}
                <div className="mb-9 flex items-end justify-between sm:mb-11 lg:mb-14">
                    <div className="max-w-3xl">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 sm:mb-3 sm:text-sm">
                            Shop by Category
                        </p>

                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Find What You Love
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-4 sm:text-base sm:leading-7">
                            Explore our wide range of products carefully
                            selected for your everyday needs and lifestyle.
                        </p>
                    </div>

                    {/* DESKTOP VIEW ALL */}
                    <Link
                        to="/categories"
                        className="group hidden items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700 lg:flex"
                    >
                        <span>View All Categories</span>

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>

                {/* CATEGORY GRID */}
                <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>

                {/* MOBILE VIEW ALL */}
                <div className="mt-8 text-center sm:mt-10 lg:hidden">
                    <Link
                        to="/categories"
                        className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 sm:text-base"
                    >
                        <span>View All Categories</span>

                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Categories;