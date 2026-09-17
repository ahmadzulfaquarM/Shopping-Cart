import { FaStar } from "react-icons/fa";

const StarRating = ({
    rating = 0,
    size = "text-sm",
}) => {

    const numericRating = Number(rating) || 0;

    return (
        <div className="flex items-center gap-0.5">

            {[1, 2, 3, 4, 5].map((star) => (

                <FaStar
                    key={star}
                    className={`
                        ${size}
                        ${
                            star <= Math.round(numericRating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }
                    `}
                />

            ))}

        </div>
    );
};

export default StarRating;