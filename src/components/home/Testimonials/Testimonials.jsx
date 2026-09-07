import testimonials from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {

    return (
        <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

                {/* ================= HEADER ================= */}

                <div className="
                    mb-9
                    text-center

                    sm:mb-11

                    lg:mb-12
                ">

                    <span className="
                        inline-flex
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
                        Testimonials
                    </span>


                    <h2 className="
                        mt-4
                        text-3xl
                        font-extrabold
                        leading-tight
                        tracking-tight
                        text-gray-900

                        sm:text-4xl
                    ">
                        What Our{" "}

                        <span className="text-blue-600">
                            Customers Say
                        </span>
                    </h2>


                    <p className="
                        mx-auto
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-6
                        text-gray-500

                        sm:mt-4
                        sm:text-base
                        sm:leading-7
                    ">
                        Real experiences from customers who shop with us.
                    </p>

                </div>


                {/* ================= TESTIMONIALS ================= */}

                <div className="
                    grid
                    grid-cols-1
                    gap-4

                    sm:gap-5

                    lg:grid-cols-3
                    lg:gap-6
                ">

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