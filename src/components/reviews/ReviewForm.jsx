import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "../../services/reviewService";

const ReviewForm = ({
    productId,
    orderId,
    onReviewSubmitted,
}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess(false);

        if (!productId) {
            setError("Product information is missing.");
            return;
        }

        if (!orderId) {
            setError("Order information is missing.");
            return;
        }

        if (rating === 0) {
            setError("Please select a rating.");
            return;
        }

        if (comment.trim().length < 3) {
            setError(
                "Please write at least 3 characters in your review."
            );
            return;
        }

        try {
            setLoading(true);

            await createReview({
                productId,
                orderId,
                rating,
                comment: comment.trim(),
            });

            setSuccess(true);
            setRating(0);
            setHoverRating(0);
            setComment("");

            if (typeof onReviewSubmitted === "function") {
                onReviewSubmitted();
            }
        } catch (error) {
            console.error("Create Review Error:", error);

            setError(
                error.response?.data?.message ||
                    "Failed to submit review. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-gray-50 p-4"
        >
            <p className="mb-3 text-sm font-semibold text-gray-800">
                Rate the product
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() =>
                                setHoverRating(star)
                            }
                            onMouseLeave={() =>
                                setHoverRating(0)
                            }
                            onClick={() =>
                                setRating(star)
                            }
                            aria-label={`Rate ${star} stars`}
                            className="transition-transform hover:scale-110"
                        >
                            <FaStar
                                className={`text-xl transition ${
                                    (hoverRating || rating) >= star
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>

                {rating > 0 && (
                    <span className="text-sm font-medium text-gray-600">
                        {rating}/5
                    </span>
                )}
            </div>

            {/* Comment */}
            <textarea
                value={comment}
                onChange={(e) =>
                    setComment(e.target.value)
                }
                placeholder="Write your review..."
                rows={4}
                maxLength={1000}
                className="mt-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-1 text-right text-xs text-gray-400">
                {comment.length}/1000
            </div>

            {/* Error */}
            {error && (
                <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600">
                    Review submitted successfully!
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading
                    ? "Submitting..."
                    : "Submit Review"}
            </button>
        </form>
    );
};

export default ReviewForm;