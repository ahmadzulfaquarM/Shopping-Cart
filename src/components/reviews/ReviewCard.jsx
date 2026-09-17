import { FaUserCircle } from "react-icons/fa";

import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {

    const userName =
        review.user?.name || "Customer";

    const reviewDate = review.createdAt
        ? new Date(
            review.createdAt
        ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "";

    return (
        <div className="
            border-b
            border-gray-200
            py-6
            last:border-b-0
        ">

            {/* ================= USER ================= */}

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                ">

                    <FaUserCircle
                        className="
                            shrink-0
                            text-3xl
                            text-gray-300
                        "
                    />

                    <div className="min-w-0">

                        <h4 className="
                            truncate
                            text-sm
                            font-bold
                            text-gray-900
                        ">
                            {userName}
                        </h4>

                        <div className="
                            mt-1
                            flex
                            items-center
                            gap-2
                        ">

                            <StarRating
                                rating={review.rating}
                                size="text-xs"
                            />

                            <span className="
                                text-xs
                                text-gray-400
                            ">
                                {reviewDate}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= COMMENT ================= */}

            <p className="
                mt-4
                text-sm
                leading-6
                text-gray-600
            ">
                {review.comment}
            </p>

        </div>
    );
};

export default ReviewCard;