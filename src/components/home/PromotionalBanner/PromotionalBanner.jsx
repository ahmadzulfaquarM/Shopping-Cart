import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import promoBanner from "../../../assets/images/banner/promo-banner.png";

const PromotionalBanner = () => {
    return (
        <section className="bg-slate-50 py-14 sm:py-16 lg:py-24">

            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">

                <div className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-blue-500
                    shadow-xl
                    sm:rounded-3xl
                ">

                    {/* Decorative Circles */}

                    <div className="
                        absolute
                        -right-20
                        -top-20
                        h-48
                        w-48
                        rounded-full
                        bg-white/10

                        sm:-right-24
                        sm:-top-24
                        sm:h-72
                        sm:w-72
                    "></div>

                    <div className="
                        absolute
                        -bottom-24
                        left-1/3
                        h-56
                        w-56
                        rounded-full
                        bg-white/5

                        sm:-bottom-32
                        sm:h-80
                        sm:w-80
                    "></div>


                    <div className="
                        relative
                        grid
                        min-h-0
                        grid-cols-1
                        items-center

                        lg:min-h-[430px]
                        lg:grid-cols-[1fr_0.9fr]
                    ">

                        {/* ================= LEFT ================= */}

                        <div className="
                            relative
                            z-20
                            px-5
                            py-10

                            sm:px-8
                            sm:py-12

                            md:px-10
                            md:py-14

                            lg:px-16
                            lg:py-16

                            xl:px-20
                        ">

                            {/* Small Label */}

                            <span className="
                                inline-flex
                                items-center
                                rounded-full
                                border
                                border-white/20
                                bg-white/10
                                px-3.5
                                py-1.5
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.15em]
                                text-white
                                backdrop-blur-sm

                                sm:px-5
                                sm:py-2
                                sm:text-xs
                                sm:tracking-[0.2em]
                            ">
                                Limited Time Offer
                            </span>


                            {/* Heading */}

                            <h2 className="
                                mt-5
                                max-w-xl
                                text-3xl
                                font-extrabold
                                leading-[1.08]
                                tracking-tight
                                text-white

                                sm:mt-6
                                sm:text-4xl

                                md:text-5xl

                                xl:text-6xl
                            ">
                                Upgrade Your

                                <span className="block text-yellow-300">
                                    Lifestyle & Save
                                </span>
                            </h2>


                            {/* Discount */}

                            <div className="
                                mt-4
                                flex
                                flex-wrap
                                items-baseline
                                gap-2

                                sm:mt-5
                                sm:gap-3
                            ">

                                <span className="
                                    text-2xl
                                    font-black
                                    text-white

                                    sm:text-3xl

                                    md:text-4xl
                                ">
                                    UP TO
                                </span>

                                <span className="
                                    text-3xl
                                    font-black
                                    text-yellow-300

                                    sm:text-4xl

                                    md:text-5xl
                                ">
                                    50% OFF
                                </span>

                            </div>


                            {/* Description */}

                            <p className="
                                mt-4
                                max-w-lg
                                text-sm
                                leading-6
                                text-blue-100

                                sm:mt-5
                                sm:text-base
                                sm:leading-7
                            ">
                                Discover amazing deals across fashion,
                                electronics, footwear, furniture and more.
                                Don't miss out on our exclusive offers.
                            </p>


                            {/* CTA */}

                            <Link
                                to="/products"
                                className="
                                    group
                                    mt-6
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    px-5
                                    py-3
                                    text-sm
                                    font-bold
                                    text-blue-700
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-gray-50
                                    hover:shadow-xl

                                    sm:mt-8
                                    sm:gap-3
                                    sm:px-7
                                    sm:py-3.5
                                    sm:text-base
                                "
                            >
                                Shop Deals

                                <FaArrowRight className="
                                    text-xs
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1

                                    sm:text-sm
                                " />

                            </Link>

                        </div>


                        {/* ================= RIGHT ================= */}

                        <div className="
                            relative
                            flex
                            min-h-[240px]
                            items-end
                            justify-center
                            px-4

                            sm:min-h-[300px]
                            sm:px-6

                            md:min-h-[340px]

                            lg:h-full
                            lg:min-h-0
                            lg:px-0
                        ">

                            <img
                                src={promoBanner}
                                alt="Exclusive shopping deals"
                                className="
                                    relative
                                    z-10
                                    w-full
                                    max-w-[330px]
                                    object-contain
                                    transition-transform
                                    duration-500
                                    hover:scale-105

                                    sm:max-w-[400px]

                                    md:max-w-[470px]

                                    lg:max-w-[560px]
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