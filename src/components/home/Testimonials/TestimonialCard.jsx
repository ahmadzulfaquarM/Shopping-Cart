import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
    const rating = Math.min(
        5,
        Math.max(0, Math.round(Number(testimonial.rating) || 0))
    );

    return (
        <article
            className="
                group
                relative
                flex
                h-full
                flex-col
                rounded-xl
                border border-gray-200
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
            {/* Quote Icon */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-4
                    top-4
                    text-xl
                    text-blue-100
                    transition-colors
                    duration-300
                    group-hover:text-blue-200
                    sm:right-6
                    sm:top-6
                    sm:text-2xl
                "
            >
                <FaQuoteLeft />
            </div>

            {/* Customer */}
            <div className="flex items-center gap-3 sm:gap-4">
                <img
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                    loading="lazy"
                    className="
                        h-12
                        w-12
                        shrink-0
                        rounded-full
                        object-cover
                        ring-2
                        ring-blue-50
                        transition-all
                        duration-300
                        group-hover:ring-blue-200
                        sm:h-14
                        sm:w-14
                    "
                />

                <div className="min-w-0">
                    <h3
                        className="
                            truncate
                            text-sm
                            font-bold
                            text-gray-900
                            sm:text-base
                        "
                    >
                        {testimonial.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {testimonial.role}
                    </p>
                </div>
            </div>

            {/* Rating */}
            <div
                className="mt-4 flex items-center gap-1 sm:mt-5"
                aria-label={`${rating} out of 5 stars`}
            >
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        aria-hidden="true"
                        className={`
                            text-xs
                            sm:text-sm
                            ${
                                index < rating
                                    ? "text-yellow-400"
                                    : "text-gray-200"
                            }
                        `}
                    />
                ))}
            </div>

            {/* Review */}
            <p
                className="
                    mt-4
                    flex-1
                    text-sm
                    leading-6
                    text-gray-600
                    sm:mt-5
                    sm:leading-7
                "
            >
                “{testimonial.review}”
            </p>
        </article>
    );
};

export default TestimonialCard;