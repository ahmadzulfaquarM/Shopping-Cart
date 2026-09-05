import { useState } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa";

const Newsletter = () => {

    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!email.trim()) return;

        setSubscribed(true);
        setEmail("");

    };

    return (
        <section className="bg-white py-20">

            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-10 py-14 shadow-xl lg:px-16">

                    {/* Decorative circles */}

                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

                    <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/10" />


                    <div className="relative z-10 mx-auto max-w-4xl text-center">

                        {/* Badge */}

                        <span className="inline-flex rounded-full bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                            Stay Updated
                        </span>


                        {/* Heading */}

                        <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                            Never Miss{" "}
                            <span className="text-yellow-300">
                                an Offer
                            </span>
                        </h2>


                        {/* Description */}

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100">
                            Subscribe for exclusive offers, new arrivals,
                            special discounts and shopping updates.
                        </p>


                        {/* Form */}

                        {!subscribed ? (

                            <form
                                onSubmit={handleSubmit}
                                className="mx-auto mt-8 flex max-w-xl gap-3 rounded-2xl bg-white p-2"
                            >

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email address"
                                    required
                                    className="
                                        min-w-0
                                        flex-1
                                        bg-transparent
                                        px-4
                                        py-3
                                        text-gray-800
                                        outline-none
                                        placeholder:text-gray-400
                                    "
                                />

                                <button
                                    type="submit"
                                    className="
                                        flex
                                        shrink-0
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-gray-900
                                        px-6
                                        py-3
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-black
                                    "
                                >
                                    <FaPaperPlane />

                                    Subscribe
                                </button>

                            </form>

                        ) : (

                            <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-green-600">

                                <FaCheck />

                                You're subscribed!

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Newsletter;