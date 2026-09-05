import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {

    return (
        <div
            className="
                group
                relative
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-7
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
            "
        >

            {/* Quote Icon */}

            <div className="absolute right-6 top-6 text-2xl text-blue-100">
                <FaQuoteLeft />
            </div>


            {/* Customer */}

            <div className="flex items-center gap-4">

                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="
                        h-14
                        w-14
                        rounded-full
                        object-cover
                        ring-2
                        ring-blue-50
                        transition
                        duration-300
                        group-hover:ring-blue-200
                    "
                />

                <div>

                    <h3 className="font-bold text-gray-900">
                        {testimonial.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {testimonial.role}
                    </p>

                </div>

            </div>


            {/* Rating */}

            <div className="mt-5 flex gap-1">

                {[...Array(testimonial.rating)].map((_, index) => (

                    <FaStar
                        key={index}
                        className="text-sm text-yellow-400"
                    />

                ))}

            </div>


            {/* Review */}

            <p className="mt-5 text-sm leading-7 text-gray-600">
                "{testimonial.review}"
            </p>

        </div>
    );
};

export default TestimonialCard;