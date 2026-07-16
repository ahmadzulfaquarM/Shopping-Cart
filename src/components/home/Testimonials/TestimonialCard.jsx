import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">

            {/* Avatar */}

            <div className="flex items-center gap-5">

                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-20 w-20 rounded-full border-4 border-blue-100 object-cover transition duration-300 group-hover:border-blue-600"
                />

                <div>

                    <h3 className="text-xl font-bold text-gray-900">
                        {testimonial.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {testimonial.role}
                    </p>

                </div>

            </div>

            {/* Rating */}

            <div className="mt-6 flex gap-1">

                {[...Array(testimonial.rating)].map((_, index) => (
                    <FaStar
                        key={index}
                        className="text-lg text-yellow-400"
                    />
                ))}

            </div>

            {/* Review */}

            <p className="mt-6 leading-8 text-gray-600">
                "{testimonial.review}"
            </p>

        </div>
    );
};

export default TestimonialCard;