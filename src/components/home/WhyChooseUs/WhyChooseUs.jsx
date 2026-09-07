import features from "../../../data/features";
import FeatureCard from "./FeatureCard";

const WhyChooseUs = () => {
    return (
        <section className="bg-slate-50 py-14 sm:py-16 lg:py-24">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

                {/* ================= SECTION HEADING ================= */}

                <div className="
                    mx-auto
                    mb-9
                    max-w-3xl
                    text-center

                    sm:mb-11

                    lg:mb-14
                ">

                    <span className="
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-blue-200
                        bg-blue-50
                        px-3.5
                        py-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-blue-600

                        sm:px-5
                        sm:py-2
                        sm:text-xs
                        sm:tracking-[0.18em]
                    ">
                        Why Choose Us
                    </span>


                    <h2 className="
                        mt-4
                        text-3xl
                        font-extrabold
                        tracking-tight
                        text-gray-900

                        sm:mt-5
                        sm:text-4xl

                        lg:text-5xl
                    ">
                        Shopping Made{" "}

                        <span className="text-blue-600">
                            Better
                        </span>
                    </h2>


                    <p className="
                        mt-3
                        text-sm
                        leading-6
                        text-gray-600

                        sm:mt-5
                        sm:text-base
                        sm:leading-7

                        lg:text-lg
                    ">
                        Everything you need for a simple, secure and
                        enjoyable shopping experience.
                    </p>

                </div>


                {/* ================= FEATURE CARDS ================= */}

                <div className="
                    grid
                    grid-cols-2
                    gap-3

                    sm:gap-5

                    lg:grid-cols-4
                ">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default WhyChooseUs;