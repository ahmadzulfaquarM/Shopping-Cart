import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {

    return (
        <div
            className="
                group
                relative
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg

                sm:rounded-2xl
                sm:p-6

                lg:p-7
            "
        >

            {/* ================= QUOTE ICON ================= */}

            <div className="
                absolute
                right-4
                top-4
                text-xl
                text-blue-100

                sm:right-6
                sm:top-6
                sm:text-2xl
            ">
                <FaQuoteLeft />
            </div>


            {/* ================= CUSTOMER ================= */}

            <div className="
                flex
                items-center
                gap-3

                sm:gap-4
            ">

                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="
                        h-12
                        w-12
                        rounded-full
                        object-cover
                        ring-2
                        ring-blue-50
                        transition
                        duration-300
                        group-hover:ring-blue-200

                        sm:h-14
                        sm:w-14
                    "
                />


                <div className="min-w-0">

                    <h3 className="
                        truncate
                        text-sm
                        font-bold
                        text-gray-900

                        sm:text-base
                    ">
                        {testimonial.name}
                    </h3>

                    <p className="
                        mt-1
                        text-xs
                        text-gray-500

                        sm:text-sm
                    ">
                        {testimonial.role}
                    </p>

                </div>

            </div>


            {/* ================= RATING ================= */}

            <div className="
                mt-4
                flex
                gap-1

                sm:mt-5
            ">

                {[...Array(testimonial.rating)].map((_, index) => (

                    <FaStar
                        key={index}
                        className="text-xs text-yellow-400 sm:text-sm"
                    />

                ))}

            </div>


            {/* ================= REVIEW ================= */}

            <p className="
                mt-4
                text-sm
                leading-6
                text-gray-600

                sm:mt-5
                sm:leading-7
            ">
                "{testimonial.review}"
            </p>

        </div>
    );
};

export default TestimonialCard;