import features from "../../../data/features";
import FeatureCard from "./FeatureCard";

const WhyChooseUs = () => {
    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-3xl text-center">

                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                        Why Choose Us
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
                        Shopping Made{" "}
                        <span className="text-blue-600">
                            Better
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-600 lg:text-lg">
                        Everything you need for a simple, secure and
                        enjoyable shopping experience.
                    </p>

                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-4 gap-5">

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