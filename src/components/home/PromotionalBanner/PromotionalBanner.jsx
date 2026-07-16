import { FaArrowRight } from "react-icons/fa";
import promoBanner from "../../../assets/images/banner/promo-banner.png";

const PromotionalBanner = () => {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-2xl">

                    <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">

                        {/* Left Content */}

                        <div className="p-10 md:p-14 lg:p-16">

                            <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                                Summer Sale 2026
                            </span>

                            <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl xl:text-6xl">
                                Up To
                                <span className="block text-yellow-300">
                                    50% OFF
                                </span>
                            </h2>

                            <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                                Upgrade your lifestyle with premium fashion,
                                electronics, shoes, furniture and more.
                                Shop today and enjoy exclusive discounts on
                                our best-selling collections.
                            </p>

                            <button className="mt-10 flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:bg-blue-50">

                                Shop Now

                                <FaArrowRight />

                            </button>

                        </div>

                        {/* Right Image */}

                        <div className="flex justify-center lg:justify-end lg:pr-14">

                            <img
                                src={promoBanner}
                                alt="Summer Sale"
                                className="w-full max-w-md transition-transform duration-500 hover:scale-105 md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default PromotionalBanner;