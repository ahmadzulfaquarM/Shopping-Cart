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
        <section className="bg-white py-14 sm:py-16 lg:py-20">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

                <div className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-blue-500
                    px-5
                    py-10
                    shadow-xl

                    sm:rounded-3xl
                    sm:px-8
                    sm:py-12

                    lg:px-16
                    lg:py-14
                ">

                    {/* ================= DECORATIVE CIRCLES ================= */}

                    <div className="
                        absolute
                        -right-16
                        -top-16
                        h-40
                        w-40
                        rounded-full
                        bg-white/10

                        sm:-right-20
                        sm:-top-20
                        sm:h-64
                        sm:w-64
                    " />

                    <div className="
                        absolute
                        -bottom-20
                        -left-16
                        h-48
                        w-48
                        rounded-full
                        bg-white/10

                        sm:-bottom-32
                        sm:-left-20
                        sm:h-72
                        sm:w-72
                    " />


                    <div className="
                        relative
                        z-10
                        mx-auto
                        max-w-4xl
                        text-center
                    ">

                        {/* ================= BADGE ================= */}

                        <span className="
                            inline-flex
                            rounded-full
                            bg-white/15
                            px-3.5
                            py-1.5
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-white

                            sm:px-5
                            sm:py-2
                            sm:text-xs
                            sm:tracking-[0.18em]
                        ">
                            Stay Updated
                        </span>


                        {/* ================= HEADING ================= */}

                        <h2 className="
                            mt-4
                            text-3xl
                            font-extrabold
                            leading-tight
                            tracking-tight
                            text-white

                            sm:mt-5
                            sm:text-4xl

                            lg:text-5xl
                        ">
                            Never Miss{" "}

                            <span className="text-yellow-300">
                                an Offer
                            </span>
                        </h2>


                        {/* ================= DESCRIPTION ================= */}

                        <p className="
                            mx-auto
                            mt-3
                            max-w-2xl
                            text-sm
                            leading-6
                            text-blue-100

                            sm:mt-4
                            sm:text-base
                            sm:leading-7
                        ">
                            Subscribe for exclusive offers, new arrivals,
                            special discounts and shopping updates.
                        </p>


                        {/* ================= FORM ================= */}

                        {!subscribed ? (

                            <form
                                onSubmit={handleSubmit}
                                className="
                                    mx-auto
                                    mt-6
                                    flex
                                    max-w-xl
                                    flex-col
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    p-2

                                    sm:mt-8
                                    sm:flex-row
                                    sm:gap-3
                                    sm:rounded-2xl
                                "
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
                                        w-full
                                        flex-1
                                        rounded-lg
                                        bg-transparent
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-gray-800
                                        outline-none
                                        placeholder:text-gray-400

                                        sm:px-4
                                        sm:py-3
                                    "
                                />


                                <button
                                    type="submit"
                                    className="
                                        flex
                                        w-full
                                        shrink-0
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        bg-gray-900
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-black

                                        sm:w-auto
                                        sm:rounded-xl
                                        sm:px-6
                                        sm:py-3
                                        sm:text-base
                                    "
                                >
                                    <FaPaperPlane />

                                    Subscribe
                                </button>

                            </form>

                        ) : (

                            <div className="
                                mx-auto
                                mt-6
                                flex
                                max-w-xl
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-white
                                px-5
                                py-3.5
                                text-sm
                                font-semibold
                                text-green-600

                                sm:mt-8
                                sm:gap-3
                                sm:rounded-2xl
                                sm:px-6
                                sm:py-4
                                sm:text-base
                            ">

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