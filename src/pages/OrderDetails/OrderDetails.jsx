import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaUser,
    FaCheckCircle,
    FaChevronDown,
    FaChevronUp,
    FaCommentDots,
    FaStar,
    FaDownload,
    FaTimesCircle,
    FaTimes,
    FaPaperPlane,
    FaHeadset,
} from "react-icons/fa";

import {
    getOrderById,
    cancelOrder,
} from "../../services/orderService";

import {
    getOrderChatMessages,
    sendOrderChatMessage,
} from "../../services/chatService";

import { createReview } from "../../services/reviewService";


// ==================================================
// ORDER STATUS PIPELINE
// ==================================================

const STAGES = [
    {
        key: "processing",
        label: "Order Placed",
    },
    {
        key: "confirmed",
        label: "Order Confirmed",
    },
    {
        key: "shipped",
        label: "Shipped",
    },
    {
        key: "delivered",
        label: "Delivered",
    },
];


// ==================================================
// QUICK CHAT REPLIES
// ==================================================

const QUICK_REPLIES = [
    "Where is my order?",
    "I want a refund",
    "Item is damaged",
    "Change delivery address",
];


// ==================================================
// STATUS HELPER
// ==================================================

const getStatusLabel = (status) => {
    const labels = {
        processing: "Processing",
        confirmed: "Confirmed",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
    };

    return labels[status] || status;
};


// ==================================================
// STATUS BADGE
// ==================================================

const StatusBadge = ({ status }) => {
    const styles = {
        processing: "bg-amber-50 text-amber-700 ring-amber-200",
        confirmed: "bg-blue-50 text-blue-700 ring-blue-200",
        shipped: "bg-purple-50 text-purple-700 ring-purple-200",
        delivered: "bg-green-50 text-green-700 ring-green-200",
        cancelled: "bg-red-50 text-red-700 ring-red-200",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                styles[status] ||
                "bg-gray-50 text-gray-700 ring-gray-200"
            }`}
        >
            {getStatusLabel(status)}
        </span>
    );
};


// ==================================================
// ITEM TIMELINE
// ==================================================

const ItemTimeline = ({ order }) => {
    const [showAll, setShowAll] = useState(false);

    if (order.orderStatus === "cancelled") {
        return (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <div className="flex items-center gap-3 text-red-600">
                    <FaTimesCircle className="shrink-0 text-lg" />

                    <div>
                        <p className="text-sm font-bold">
                            Order Cancelled
                        </p>

                        <p className="mt-0.5 text-xs text-red-500">
                            This order is no longer being processed.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const currentIndex = STAGES.findIndex(
        (stage) => stage.key === order.orderStatus
    );

    const activeIndex =
        currentIndex === -1 ? 0 : currentIndex;

    const visibleStages = showAll
        ? STAGES
        : STAGES.slice(
              Math.max(0, activeIndex - 1),
              activeIndex + 1
          );

    const dateFor = (key) => {
        const dates = {
            processing: order.createdAt,
            confirmed: order.confirmedAt,
            shipped: order.shippedAt,
            delivered: order.deliveredAt,
        };

        if (!dates[key]) {
            return null;
        }

        return new Date(dates[key]).toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
            }
        );
    };

    return (
        <div>
            <div className="space-y-0">
                {visibleStages.map((stage, index) => {
                    const stageIndex = STAGES.findIndex(
                        (item) => item.key === stage.key
                    );

                    const done = stageIndex <= activeIndex;

                    const isLast =
                        index === visibleStages.length - 1;

                    const date = dateFor(stage.key);

                    return (
                        <div
                            key={stage.key}
                            className="flex gap-3"
                        >
                            {/* Timeline indicator */}
                            <div className="flex flex-col items-center">
                                <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                                        done
                                            ? "bg-green-500 text-white shadow-sm"
                                            : "border-2 border-gray-300 bg-white text-gray-300"
                                    }`}
                                >
                                    {done && (
                                        <FaCheckCircle />
                                    )}
                                </span>

                                {!isLast && (
                                    <span
                                        className={`w-0.5 flex-1 ${
                                            done
                                                ? "bg-green-400"
                                                : "bg-gray-200"
                                        }`}
                                        style={{
                                            minHeight: "28px",
                                        }}
                                    />
                                )}
                            </div>

                            {/* Timeline text */}
                            <div className="pb-5">
                                <p
                                    className={`text-sm font-semibold ${
                                        done
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {stage.label}
                                </p>

                                {date && (
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        {date}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {STAGES.length > 2 && (
                <button
                    type="button"
                    onClick={() =>
                        setShowAll((value) => !value)
                    }
                    className="inline-flex items-center gap-1 rounded-md text-sm font-semibold text-blue-600 transition hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    {showAll
                        ? "Show less"
                        : "See all updates"}

                    {showAll ? (
                        <FaChevronUp className="text-xs" />
                    ) : (
                        <FaChevronDown className="text-xs" />
                    )}
                </button>
            )}
        </div>
    );
};


// ==================================================
// REVIEW BLOCK
// ==================================================

const RatingBlock = ({ productId, orderId }) => {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
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
            setSubmitting(true);

            await createReview({
                productId,
                orderId,
                rating,
                comment: comment.trim(),
            });

            setSuccess(true);
            setRating(0);
            setHovered(0);
            setComment("");
        } catch (error) {
            console.error(
                "Submit Review Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to submit review. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
            <div className="mb-4">
                <p className="text-sm font-bold text-gray-900">
                    Rate this product
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    Share your experience with this product.
                </p>
            </div>

            {/* Stars */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onMouseEnter={() =>
                                setHovered(value)
                            }
                            onMouseLeave={() =>
                                setHovered(0)
                            }
                            onClick={() =>
                                setRating(value)
                            }
                            aria-label={`Rate ${value} stars`}
                            className="rounded-md p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                        >
                            <FaStar
                                className={`text-xl transition-colors ${
                                    (hovered || rating) >= value
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>

                {rating > 0 && (
                    <span className="text-sm font-semibold text-gray-600">
                        {rating}/5
                    </span>
                )}
            </div>

            {/* Review textarea */}
            <textarea
                value={comment}
                onChange={(event) =>
                    setComment(event.target.value)
                }
                placeholder="Write your review..."
                rows={4}
                maxLength={1000}
                disabled={submitting || success}
                className="mt-4 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:bg-gray-100"
            />

            <div className="mt-1 text-right text-xs text-gray-400">
                {comment.length}/1000
            </div>

            {/* Error */}
            {error && (
                <div className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2.5 text-sm font-medium text-green-700">
                    <FaCheckCircle className="mt-0.5 shrink-0" />

                    <span>
                        Your review has been submitted successfully!
                    </span>
                </div>
            )}

            {/* Submit */}
            {!success && (
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting
                        ? "Submitting..."
                        : "Submit Review"}
                </button>
            )}
        </div>
    );
};


// ==================================================
// SUPPORT CHAT
// ==================================================

const ChatWithUs = ({
    order,
    item,
    onClose,
}) => {
    const [messages, setMessages] = useState([
        {
            id: "welcome",
            sender: "support",
            text: `Hi! How can we help you with your order for "${item.name}"?`,
        },
    ]);

    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const [loadingHistory, setLoadingHistory] =
        useState(true);

    const scrollRef = useRef(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoadingHistory(true);

                const data =
                    await getOrderChatMessages(order._id);

                if (
                    data.messages &&
                    data.messages.length > 0
                ) {
                    setMessages(
                        data.messages.map((message) => ({
                            id: message._id,
                            sender: message.sender,
                            text: message.text,
                        }))
                    );
                }
            } catch (error) {
                console.error(
                    "Load Chat History Error:",
                    error
                );
            } finally {
                setLoadingHistory(false);
            }
        };

        loadHistory();
    }, [order._id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = async (text) => {
        const trimmed = text.trim();

        if (!trimmed || sending) {
            return;
        }

        const optimisticMessage = {
            id: `local-${Date.now()}`,
            sender: "user",
            text: trimmed,
        };

        setMessages((previous) => [
            ...previous,
            optimisticMessage,
        ]);

        setInput("");
        setSending(true);

        try {
            const data =
                await sendOrderChatMessage(
                    order._id,
                    trimmed
                );

            setMessages((previous) => [
                ...previous,
                {
                    id: data.supportMessage._id,
                    sender: "support",
                    text: data.supportMessage.text,
                },
            ]);
        } catch (error) {
            console.error(
                "Send Chat Message Error:",
                error
            );

            setMessages((previous) => [
                ...previous,
                {
                    id: `err-${Date.now()}`,
                    sender: "support",
                    text: "Sorry, something went wrong sending that. Please try again.",
                },
            ]);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-end sm:justify-end sm:p-6 print:hidden">
            {/* Mobile overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[1px] sm:hidden"
                onClick={onClose}
            />

            {/* Chat window */}
            <div className="relative z-10 flex h-[82vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-[580px] sm:rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                            <FaHeadset />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-bold">
                                Support Chat
                            </p>

                            <p className="truncate text-xs text-white/75">
                                Order #{order._id.slice(-8)}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close chat"
                        title="Close chat"
                        className="rounded-full p-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-4 py-4">
                    {loadingHistory && (
                        <div className="flex justify-center">
                            <p className="rounded-full bg-white px-3 py-1.5 text-xs text-gray-400 shadow-sm">
                                Loading conversation...
                            </p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[82%] break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                    message.sender === "user"
                                        ? "rounded-br-sm bg-blue-600 text-white"
                                        : "rounded-bl-sm border border-gray-100 bg-white text-gray-800 shadow-sm"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}

                    {sending && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm">
                                Typing...
                            </div>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </div>

                {/* Quick replies */}
                <div className="border-t border-gray-100 bg-white px-4 py-3">
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {QUICK_REPLIES.map((reply) => (
                            <button
                                key={reply}
                                type="button"
                                onClick={() =>
                                    handleSend(reply)
                                }
                                disabled={sending}
                                className="shrink-0 whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSend(input);
                    }}
                    className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(event) =>
                            setInput(event.target.value)
                        }
                        placeholder="Type your message..."
                        aria-label="Chat message"
                        className="min-w-0 flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />

                    <button
                        type="submit"
                        disabled={
                            !input.trim() || sending
                        }
                        aria-label="Send message"
                        title="Send message"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FaPaperPlane className="text-xs" />
                    </button>
                </form>
            </div>
        </div>
    );
};


// ==================================================
// ORDER DETAILS PAGE
// ==================================================

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(false);
    const [cancelMessage, setCancelMessage] = useState("");
    const [chatItem, setChatItem] = useState(null);

    // ==================================================
    // FETCH ORDER
    // ==================================================

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getOrderById(id);

                setOrder(data.order);
            } catch (error) {
                console.error(
                    "Get Order Details Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        "Failed to load order details"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                    <p className="mt-4 text-sm font-medium text-gray-600">
                        Loading order details...
                    </p>
                </div>
            </div>
        );
    }

    // ==================================================
    // ERROR
    // ==================================================

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <FaTimesCircle className="text-2xl text-red-500" />
                    </div>

                    <h1 className="mt-5 text-xl font-bold text-gray-900">
                        Unable to load order
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/orders")
                        }
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    if (!order) {
        return null;
    }

    // ==================================================
    // CANCEL ORDER
    // ==================================================

    const handleCancelOrder = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setCancelling(true);
            setError("");
            setCancelMessage("");

            const data = await cancelOrder(order._id);

            setOrder(data.order);

            setCancelMessage(
                "Order cancelled successfully."
            );
        } catch (error) {
            console.error(
                "Cancel Order Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to cancel order"
            );
        } finally {
            setCancelling(false);
        }
    };

    // ==================================================
    // PRINT / INVOICE
    // ==================================================

    const handleDownloadInvoice = () => {
        window.print();
    };

    // ==================================================
    // CANCEL RULE
    // ==================================================

    const canCancel =
        order.orderStatus === "processing" ||
        order.orderStatus === "confirmed";

    // ==================================================
    // UI
    // ==================================================

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-8 print:bg-white print:px-0 print:py-0">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb */}
                <div className="mb-5 hidden items-center gap-2 text-sm text-gray-500 sm:flex print:hidden">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="transition hover:text-blue-600"
                    >
                        My Account
                    </button>

                    <span className="text-gray-300">
                        /
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/orders")
                        }
                        className="transition hover:text-blue-600"
                    >
                        My Orders
                    </button>

                    <span className="text-gray-300">
                        /
                    </span>

                    <span className="max-w-[220px] truncate text-gray-400">
                        #{order._id}
                    </span>
                </div>

                {/* Mobile back */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/orders")
                    }
                    className="mb-5 flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-800 lg:hidden print:hidden"
                >
                    <FaArrowLeft className="text-xs" />
                    Back to Orders
                </button>

                {/* Page header */}
                <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Order details
                        </p>

                        <h1 className="mt-1 break-all text-lg font-bold text-gray-900 sm:text-xl">
                            #{order._id}
                        </h1>
                    </div>

                    <div className="shrink-0">
                        <StatusBadge
                            status={order.orderStatus}
                        />
                    </div>
                </div>

                {/* Cancel success */}
                {cancelMessage && (
                    <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 print:hidden">
                        <FaCheckCircle />
                        {cancelMessage}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 print:hidden">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* ==================================================
                        LEFT COLUMN
                    ================================================== */}

                    <div className="space-y-6 lg:col-span-2">
                        {order.items.map((item) => {
                            const productId =
                                item.product?._id ||
                                item.product;

                            return (
                                <div
                                    key={item._id}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                                >
                                    <div className="p-5 sm:p-6">
                                        {/* Item header */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Product
                                                </p>

                                                <h2 className="break-words text-base font-bold text-gray-900 sm:text-lg">
                                                    {item.name}
                                                </h2>

                                                <p className="mt-1 text-base font-bold text-blue-600">
                                                    ₹{item.price}
                                                </p>
                                            </div>

                                            {/* Product image */}
                                            <Link
                                                to={`/products/${productId}`}
                                                className="group shrink-0"
                                                title={`View ${item.name}`}
                                            >
                                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-24 sm:w-24">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        loading="lazy"
                                                        className="h-full w-full object-contain p-2 transition duration-200 group-hover:scale-105"
                                                    />
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="my-6 h-px bg-gray-100" />

                                        {/* Tracking */}
                                        <div>
                                            <div className="mb-4 flex items-center justify-between">
                                                <h3 className="text-sm font-bold text-gray-900">
                                                    Order tracking
                                                </h3>

                                                <StatusBadge
                                                    status={
                                                        order.orderStatus
                                                    }
                                                />
                                            </div>

                                            <ItemTimeline
                                                order={order}
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-gray-400">
                                            Order placed on{" "}
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                        {/* Chat */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setChatItem(
                                                    item
                                                )
                                            }
                                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-50 print:hidden"
                                        >
                                            <FaCommentDots />
                                            Chat with us
                                        </button>

                                        {/* Review */}
                                        {order.orderStatus ===
                                            "delivered" && (
                                            <div className="mt-5">
                                                <RatingBlock
                                                    productId={
                                                        productId
                                                    }
                                                    orderId={
                                                        order._id
                                                    }
                                                />
                                            </div>
                                        )}

                                        <p className="mt-5 text-xs text-gray-400">
                                            Order #{order._id}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Mobile cancel */}
                        {canCancel && (
                            <button
                                type="button"
                                onClick={
                                    handleCancelOrder
                                }
                                disabled={cancelling}
                                className="w-full rounded-xl border border-red-500 px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden print:hidden"
                            >
                                {cancelling
                                    ? "Cancelling..."
                                    : "Cancel Order"}
                            </button>
                        )}
                    </div>

                    {/* ==================================================
                        RIGHT COLUMN
                    ================================================== */}

                    <div className="space-y-6">
                        {/* Delivery details */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-5 text-base font-bold text-gray-900">
                                Delivery details
                            </h2>

                            <div className="flex items-start gap-3 border-b border-gray-100 pb-5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <FaMapMarkerAlt />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900">
                                        Home
                                    </p>

                                    <p className="mt-1 break-words text-sm leading-5 text-gray-500">
                                        {
                                            order
                                                .shippingAddress
                                                .address
                                        }
                                        ,{" "}
                                        {
                                            order
                                                .shippingAddress
                                                .city
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                    <FaUser />
                                </div>

                                <p className="min-w-0 text-sm text-gray-700">
                                    <span className="font-bold text-gray-900">
                                        {
                                            order
                                                .shippingAddress
                                                .fullName
                                        }
                                    </span>

                                    <span className="mx-1 text-gray-300">
                                        •
                                    </span>

                                    {
                                        order
                                            .shippingAddress
                                            .phone
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Price details */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-5 text-base font-bold text-gray-900">
                                Price details
                            </h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between gap-4 text-gray-600">
                                    <span>
                                        Item total
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        ₹{order.subtotal}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4 text-gray-600">
                                    <span>
                                        Delivery
                                    </span>

                                    <span
                                        className={
                                            order.deliveryFee ===
                                            0
                                                ? "font-semibold text-green-600"
                                                : "font-medium text-gray-800"
                                        }
                                    >
                                        {order.deliveryFee ===
                                        0
                                            ? "FREE"
                                            : `₹${order.deliveryFee}`}
                                    </span>
                                </div>
                            </div>

                            <div className="my-5 h-px bg-gray-200" />

                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-bold text-gray-900">
                                    Total amount
                                </span>

                                <span className="text-xl font-extrabold text-gray-900">
                                    ₹{order.totalPrice}
                                </span>
                            </div>

                            <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                <span className="text-sm text-gray-500">
                                    Paid by
                                </span>

                                <span className="text-sm font-bold uppercase text-gray-800">
                                    {
                                        order.paymentMethod
                                    }
                                </span>
                            </div>

                            {/* Invoice */}
                            <button
                                type="button"
                                onClick={
                                    handleDownloadInvoice
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-50 print:hidden"
                            >
                                <FaDownload />
                                Download Invoice
                            </button>
                        </div>

                        {/* Desktop cancel */}
                        {canCancel && (
                            <button
                                type="button"
                                onClick={
                                    handleCancelOrder
                                }
                                disabled={cancelling}
                                className="hidden w-full rounded-xl border border-red-500 px-6 py-3 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60 lg:block print:hidden"
                            >
                                {cancelling
                                    ? "Cancelling..."
                                    : "Cancel Order"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ==================================================
                CHAT
            ================================================== */}

            {chatItem && (
                <ChatWithUs
                    order={order}
                    item={chatItem}
                    onClose={() =>
                        setChatItem(null)
                    }
                />
            )}
        </div>
    );
};

export default OrderDetails;