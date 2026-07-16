import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-8 py-16 shadow-2xl md:px-16">

                    <div className="mx-auto max-w-4xl text-center">

                        {/* Badge */}

                        <span className="inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                            Stay Updated
                        </span>

                        {/* Heading */}

                        <h2 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">
                            Never Miss{" "}
                            <span className="text-yellow-300">
                                an Offer
                            </span>
                        </h2>

                        {/* Description */}

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                            Subscribe to receive exclusive discounts,
                            new arrivals, limited-time offers, and premium shopping updates directly in your inbox.
                        </p>

                        {/* Form */}

                        <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">

                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 rounded-2xl border-0 bg-white px-6 py-4 text-gray-800 outline-none ring-0 placeholder:text-gray-400"
                            />

                            <button
                                type="submit"
                                className="flex items-center justify-center gap-3 rounded-2xl bg-gray-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-black"
                            >
                                <FaPaperPlane />

                                Subscribe
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Newsletter;