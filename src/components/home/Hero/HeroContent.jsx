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
        <div className="max-w-2xl">

            {/* Small Badge */}
            <div className="mb-7 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-5 py-2.5">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    New Collection 2026
                </span>
            </div>


            {/* Heading */}
            <h1 className="text-6xl font-black leading-[1.05] tracking-tight text-gray-900 xl:text-7xl">

                Upgrade Your

                <span className="block text-blue-600">
                    Style.
                </span>

            </h1>


            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-500">
                Discover premium products designed for modern living.
                From fashion and electronics to everyday essentials,
                find everything you need in one place.
            </p>


            {/* Buttons */}
            <div className="mt-9 flex items-center gap-4">

                <Link
                    to="/products"
                    className="group flex h-14 items-center gap-3 rounded-xl bg-blue-600 px-8 text-base font-bold text-white shadow-lg shadow-blue-100 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                >
                    <FaShoppingBag className="text-lg" />

                    Shop Now

                    <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </Link>


                <Link
                    to="/categories"
                    className="flex h-14 items-center gap-3 rounded-xl border border-gray-200 bg-white px-8 text-base font-bold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600"
                >
                    Explore Collection

                    <FaArrowRight className="text-sm" />
                </Link>

            </div>


            {/* Trust Features */}
            <div className="mt-12 flex items-center">

                {/* Free Shipping */}
                <div className="flex items-center gap-3 pr-7">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <FaShippingFast />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-800">
                            Free Shipping
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                            On all orders
                        </p>
                    </div>

                </div>


                <div className="h-10 w-px bg-gray-200"></div>


                {/* Secure Payment */}
                <div className="flex items-center gap-3 px-7">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <FaShieldAlt />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-800">
                            Secure Payment
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                            100% protected
                        </p>
                    </div>

                </div>


                <div className="h-10 w-px bg-gray-200"></div>


                {/* Support */}
                <div className="flex items-center gap-3 pl-7">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <FaHeadset />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-800">
                            24/7 Support
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                            Always here
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default HeroContent;