import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaShoppingBag,
    FaShippingFast,
    FaShieldAlt,
    FaHeadset,
} from "react-icons/fa";

const HeroContent = () => {
    return (
        <div className="w-full max-w-2xl">

            {/* ================= BADGE ================= */}

            <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 sm:mb-7 sm:px-5 sm:py-2.5">

                <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 sm:text-xs sm:tracking-[0.2em]">
                    New Collection 2026
                </span>

            </div>


            {/* ================= HEADING ================= */}

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">

                Upgrade Your

                <span className="block text-blue-600">
                    Style.
                </span>

            </h1>


            {/* ================= DESCRIPTION ================= */}

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 sm:mt-7 sm:text-lg sm:leading-8">

                Discover premium products designed for modern living.
                From fashion and electronics to everyday essentials,
                find everything you need in one place.

            </p>


            {/* ================= BUTTONS ================= */}

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">

                <Link
                    to="/products"
                    className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-100 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl sm:h-14 sm:w-auto sm:px-8 sm:text-base"
                >

                    <FaShoppingBag className="text-base sm:text-lg" />

                    Shop Now

                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 sm:text-sm" />

                </Link>


                <Link
                    to="/categories"
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 text-sm font-bold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
                >

                    Explore Collection

                    <FaArrowRight className="text-xs sm:text-sm" />

                </Link>

            </div>


            {/* ================= TRUST FEATURES ================= */}

            <div className="mt-9 grid grid-cols-3 gap-2 border-t border-gray-100 pt-7 sm:mt-12 sm:flex sm:items-center sm:gap-0 sm:border-t-0 sm:pt-0">

                {/* ================= FREE SHIPPING ================= */}

                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:pr-7 sm:text-left">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600 sm:h-11 sm:w-11">

                        <FaShippingFast />

                    </div>

                    <div className="mt-2 sm:mt-0">

                        <p className="text-[10px] font-bold leading-tight text-gray-800 sm:text-sm">
                            Free Shipping
                        </p>

                        <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                            On all orders
                        </p>

                    </div>

                </div>


                {/* ================= DIVIDER ================= */}

                <div className="hidden h-10 w-px bg-gray-200 sm:block"></div>


                {/* ================= SECURE PAYMENT ================= */}

                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:px-7 sm:text-left">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600 sm:h-11 sm:w-11">

                        <FaShieldAlt />

                    </div>

                    <div className="mt-2 sm:mt-0">

                        <p className="text-[10px] font-bold leading-tight text-gray-800 sm:text-sm">
                            Secure Payment
                        </p>

                        <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                            100% protected
                        </p>

                    </div>

                </div>


                {/* ================= DIVIDER ================= */}

                <div className="hidden h-10 w-px bg-gray-200 sm:block"></div>


                {/* ================= SUPPORT ================= */}

                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:pl-7 sm:text-left">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600 sm:h-11 sm:w-11">

                        <FaHeadset />

                    </div>

                    <div className="mt-2 sm:mt-0">

                        <p className="text-[10px] font-bold leading-tight text-gray-800 sm:text-sm">
                            24/7 Support
                        </p>

                        <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                            Always here
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default HeroContent;