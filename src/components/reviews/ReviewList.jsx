import { useEffect, useState } from "react";

import {
    FaCommentAlt,
    FaSpinner,
} from "react-icons/fa";

import {
    getProductReviews,
} from "../../services/reviewService";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ productId }) => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchReviews = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getProductReviews(
                        productId
                    );

                setReviews(
                    data.reviews || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch reviews:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load reviews"
                );

            } finally {

                setLoading(false);

            }
        };

        if (productId) {
            fetchReviews();
        }

    }, [productId]);


    /* ================= LOADING ================= */

    if (loading) {

        return (
            <div className="
                flex
                items-center
                justify-center
                py-10
            ">

                <FaSpinner className="
                    animate-spin
                    text-xl
                    text-blue-600
                " />

            </div>
        );
    }


    /* ================= ERROR ================= */

    if (error) {

        return (
            <div className="
                rounded-xl
                bg-red-50
                px-4
                py-6
                text-center
            ">

                <p className="
                    text-sm
                    text-red-500
                ">
                    {error}
                </p>

            </div>
        );
    }


    /* ================= EMPTY ================= */

    if (reviews.length === 0) {

        return (
            <div className="
                rounded-xl
                border
                border-dashed
                border-gray-300
                bg-gray-50
                px-4
                py-10
                text-center
            ">

                <FaCommentAlt className="
                    mx-auto
                    text-3xl
                    text-gray-300
                " />

                <h3 className="
                    mt-3
                    text-base
                    font-bold
                    text-gray-700
                ">
                    No reviews yet
                </h3>

                <p className="
                    mt-1
                    text-sm
                    text-gray-500
                ">
                    Be the first customer to review this product.
                </p>

            </div>
        );
    }


    /* ================= REVIEWS ================= */

    return (
        <div>

            {reviews.map((review) => (

                <ReviewCard
                    key={review._id}
                    review={review}
                />

            ))}

        </div>
    );
};

export default ReviewList;