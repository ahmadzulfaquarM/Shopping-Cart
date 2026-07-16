import features from "../../../data/features";
import FeatureCard from "./FeatureCard";

const WhyChooseUs = () => {
    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full border border-blue-600 bg-blue-50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Why Choose Us
                    </span>

                   <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
    Shopping Made{" "}
    <span className="text-blue-600">
        Better
    </span>
</h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        We provide a premium shopping experience with fast delivery,
                        secure payments, dedicated support, and hassle-free returns.
                    </p>

                </div>

                {/* Feature Cards */}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">

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