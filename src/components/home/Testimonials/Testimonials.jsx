import testimonials from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <span className="inline-block rounded-full border border-blue-600 bg-blue-50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Testimonials
                    </span>

                    <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        What Our{" "}
                        <span className="text-blue-600">
                            Customers Say
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        Thousands of happy customers trust us for premium quality,
                        fast delivery, and an exceptional shopping experience.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default Testimonials;