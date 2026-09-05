import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import promoBanner from "../../../assets/images/banner/promo-banner.png";

const PromotionalBanner = () => {
    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-[1440px] px-8 lg:px-12">

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-xl">

                    {/* Decorative Circles */}

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10"></div>

                    <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-white/5"></div>


                    <div className="relative grid min-h-[430px] grid-cols-[1fr_0.9fr] items-center">

                        {/* ================= LEFT ================= */}

                        <div className="px-12 py-16 lg:px-16 xl:px-20">

                            {/* Small Label */}

                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                                Limited Time Offer
                            </span>


                            {/* Heading */}

                            <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-6xl">

                                Upgrade Your
                                <span className="block text-yellow-300">
                                    Lifestyle & Save
                                </span>

                            </h2>


                            {/* Discount */}

                            <div className="mt-5 flex items-baseline gap-3">

                                <span className="text-4xl font-black text-white">
                                    UP TO
                                </span>

                                <span className="text-5xl font-black text-yellow-300">
                                    50% OFF
                                </span>

                            </div>


                            {/* Description */}

                            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">
                                Discover amazing deals across fashion,
                                electronics, footwear, furniture and more.
                                Don't miss out on our exclusive offers.
                            </p>


                            {/* CTA */}

                            <Link
                                to="/products"
                                className="
                                    mt-8
                                    inline-flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    bg-white
                                    px-7
                                    py-3.5
                                    font-bold
                                    text-blue-700
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-gray-50
                                    hover:shadow-xl
                                "
                            >
                                Shop Deals

                                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />

                            </Link>

                        </div>


                        {/* ================= RIGHT ================= */}

                        <div className="relative flex h-full items-end justify-center">

                            <img
                                src={promoBanner}
                                alt="Exclusive shopping deals"
                                className="
                                    relative
                                    z-10
                                    w-full
                                    max-w-[560px]
                                    object-contain
                                    transition-transform
                                    duration-500
                                    hover:scale-105
                                "
                            />

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default PromotionalBanner;