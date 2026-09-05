import testimonials from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {

    return (
        <section className="bg-slate-50 py-20">

            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                {/* Header */}

                <div className="mb-12 text-center">

                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                        Testimonials
                    </span>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900">
                        What Our{" "}
                        <span className="text-blue-600">
                            Customers Say
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
                        Real experiences from customers who shop with us.
                    </p>

                </div>


                {/* Testimonials */}

                <div className="grid grid-cols-3 gap-6">

                    {testimonials
                        .slice(0, 3)
                        .map((testimonial) => (

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