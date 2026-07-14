import {
  FaArrowRight,
  FaShoppingBag,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const HeroContent = () => {
  return (
    <div className="max-w-xl">

      {/* Badge */}
      <span className="inline-block rounded-full border border-blue-600 bg-blue-50 border-blue-500 text-blue-600 px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
        New Collection 2026
      </span>

      {/* Heading */}
      <div className="mt-10">

        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
          Upgrade Your
        </h1>

        <h1 className="text-5xl font-extrabold leading-tight text-blue-600 lg:text-7xl">
          Style
        </h1>

      </div>

      {/* Description */}

      <p className="mt-8 max-w-lg text-lg leading-9 text-gray-600">
       Discover premium products crafted for 
       comfort, quality,and everyday living.
       Shop the latest trends with confidence.
      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-5">

        <button className="flex h-16 items-center gap-3 rounded-2xl bg-blue-600 px-10 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1">
          <FaShoppingBag className="text-xl" />
          Shop Now
        </button>

        <button className="flex h-16 items-center gap-4 rounded-2xl border-2 border-blue-600 bg-white px-10 text-lg font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:-translate-y-1">
          Explore Collection
          <FaArrowRight className="text-xl" />
        </button>

      </div>

      {/* Features */}

      <div className="mt-14 flex flex-wrap items-center gap-8 lg:gap-10">

        {/* Shipping */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FaShippingFast className="text-xl" />
          </div>

          <div>
            <h3 className="font-bold text-gray-600">
              Free Shipping
            </h3>

            <p className="text-gray-500">
              On all orders
            </p>

          </div>

        </div>

        <div className="hidden h-12 w-px bg-gray-200 lg:block"></div>

        {/* Secure */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FaShieldAlt className="text-xl" />
          </div>

          <div>
            <h3 className="font-bold text-gray-600">
              Secure Payment
            </h3>

            <p className="text-gray-500">
              100% Secure
            </p>

          </div>

        </div>

        <div className="hidden h-12 w-px bg-gray-200 lg:block"></div>

        {/* Support */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FaHeadset className="text-xl" />
          </div>

          <div>

            <h3 className="font-bold text-gray-600">
              24/7 Support
            </h3>

            <p className="text-gray-500">
              Dedicated Support
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroContent;