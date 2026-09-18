import React, { useState, useRef, useEffect } from "react";
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

import {
    createReview,
} from "../../services/reviewService";


// --------------------------------------------------
// NORMAL ORDER-STATUS PIPELINE
// --------------------------------------------------

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


// --------------------------------------------------
// ITEM TIMELINE
// --------------------------------------------------

const ItemTimeline = ({ order }) => {
    const [showAll, setShowAll] = useState(false);

    if (order.orderStatus === "cancelled") {
        return (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-600">

                <FaTimesCircle className="text-lg" />

                <span className="font-semibold">
                    Order Cancelled
                </span>

            </div>
        );
    }

    const currentIndex = STAGES.findIndex(
        (stage) => stage.key === order.orderStatus
    );

    const activeIndex =
        currentIndex === -1
            ? 0
            : currentIndex;

    const visibleStages = showAll
        ? STAGES
        : STAGES.slice(
            Math.max(0, activeIndex - 1),
            activeIndex + 1
        );

    const dateFor = (key) => {
        const map = {
            processing: order.createdAt,
            confirmed: order.confirmedAt,
            shipped: order.shippedAt,
            delivered: order.deliveredAt,
        };

        return map[key]
            ? new Date(map[key]).toLocaleDateString(
                undefined,
                {
                    month: "short",
                    day: "numeric",
                }
            )
            : null;
    };

    return (
        <div>

            <div className="space-y-0">

                {visibleStages.map((stage, i) => {

                    const stageIndex =
                        STAGES.findIndex(
                            (s) =>
                                s.key === stage.key
                        );

                    const done =
                        stageIndex <= activeIndex;

                    const isLast =
                        i ===
                        visibleStages.length - 1;

                    const date =
                        dateFor(stage.key);

                    return (
                        <div
                            key={stage.key}
                            className="flex gap-3"
                        >

                            <div className="flex flex-col items-center">

                                <span
                                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                                        done
                                            ? "bg-green-500 text-white"
                                            : "border-2 border-gray-300 bg-white"
                                    }`}
                                >
                                    {done && (
                                        <FaCheckCircle className="text-[10px]" />
                                    )}
                                </span>

                                {!isLast && (
                                    <span
                                        className={`w-0.5 flex-1 ${
                                            done
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                        }`}
                                        style={{
                                            minHeight: "24px",
                                        }}
                                    />
                                )}

                            </div>

                            <div className="pb-5">

                                <p
                                    className={`text-sm font-medium ${
                                        done
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                    }`}
                                >

                                    {stage.label}

                                    {date && (
                                        <span className="ml-2 font-normal text-gray-400">
                                            , {date}
                                        </span>
                                    )}

                                </p>

                            </div>

                        </div>
                    );
                })}

            </div>


            {STAGES.length > 2 && (

                <button
                    onClick={() =>
                        setShowAll((value) => !value)
                    }
                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >

                    {showAll
                        ? "Show less"
                        : "See All Updates"}

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


// --------------------------------------------------
// REVIEW BLOCK
// --------------------------------------------------

const RatingBlock = ({
    productId,
    orderId,
}) => {

    const [rating, setRating] =
        useState(0);

    const [hovered, setHovered] =
        useState(0);

    const [comment, setComment] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);


    const handleSubmit = async () => {

        setError("");
        setSuccess(false);


        if (!productId) {

            setError(
                "Product information is missing."
            );

            return;
        }


        if (!orderId) {

            setError(
                "Order information is missing."
            );

            return;
        }


        if (rating === 0) {

            setError(
                "Please select a rating."
            );

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

            const message =
                error.response?.data?.message ||
                "Failed to submit review. Please try again.";

            setError(message);

        } finally {

            setSubmitting(false);

        }
    };


    return (
        <div className="rounded-xl bg-gray-50 p-4">

            <p className="mb-3 text-sm font-semibold text-gray-800">
                Rate the product
            </p>


            {/* Stars */}

            <div className="flex items-center gap-2">

                <div className="flex gap-2">

                    {[1, 2, 3, 4, 5].map(
                        (value) => (

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
                                className="transition-transform hover:scale-110"
                            >

                                <FaStar
                                    className={`text-xl transition ${
                                        (hovered ||
                                            rating) >=
                                        value
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />

                            </button>

                        )
                    )}

                </div>


                {rating > 0 && (

                    <span className="ml-2 text-sm font-medium text-gray-600">
                        {rating}/5
                    </span>

                )}

            </div>


            {/* Review Text */}

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


            {/* Character Count */}

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

                <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600">

                    <FaCheckCircle />

                    <span>
                        Your review has been submitted successfully!
                    </span>

                </div>

            )}


            {/* Submit Button */}

            {!success && (

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting
                        ? "Submitting..."
                        : "Submit Review"}
                </button>

            )}

        </div>
    );
};


// --------------------------------------------------
// QUICK REPLIES
// --------------------------------------------------

const QUICK_REPLIES = [
    "Where is my order?",
    "I want a refund",
    "Item is damaged",
    "Change delivery address",
];


// --------------------------------------------------
// CHAT
// --------------------------------------------------

const ChatWithUs = ({
    order,
    item,
    onClose,
}) => {

    const [messages, setMessages] =
        useState([
            {
                id: "welcome",
                sender: "support",
                text: `Hi! How can we help you with your order for "${item.name}"?`,
            },
        ]);

    const [input, setInput] =
        useState("");

    const [sending, setSending] =
        useState(false);

    const [loadingHistory, setLoadingHistory] =
        useState(true);

    const scrollRef = useRef(null);


    useEffect(() => {

        const loadHistory = async () => {

            try {

                setLoadingHistory(true);

                const data =
                    await getOrderChatMessages(
                        order._id
                    );

                if (
                    data.messages &&
                    data.messages.length > 0
                ) {

                    setMessages(
                        data.messages.map(
                            (message) => ({
                                id: message._id,
                                sender:
                                    message.sender,
                                text:
                                    message.text,
                            })
                        )
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


        setMessages((prev) => [
            ...prev,
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


            setMessages((prev) => [
                ...prev,
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


            setMessages((prev) => [
                ...prev,
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
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-end sm:justify-end sm:p-6">

            <div
                className="absolute inset-0 bg-black/30 sm:hidden"
                onClick={onClose}
            />


            <div className="relative z-10 flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:h-[560px] sm:rounded-2xl">

                {/* Header */}

                <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                            <FaHeadset />
                        </div>

                        <div>

                            <p className="text-sm font-semibold">
                                Support Chat
                            </p>

                            <p className="text-xs text-white/80">
                                Order #
                                {order._id.slice(-8)}
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 hover:bg-white/10"
                        aria-label="Close chat"
                    >
                        <FaTimes />
                    </button>

                </div>


                {/* Messages */}

                <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-4 py-4">

                    {loadingHistory && (

                        <p className="text-center text-xs text-gray-400">
                            Loading conversation...
                        </p>

                    )}


                    {messages.map(
                        (message) => (

                            <div
                                key={message.id}
                                className={`flex ${
                                    message.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                                        message.sender ===
                                        "user"
                                            ? "rounded-br-sm bg-blue-600 text-white"
                                            : "rounded-bl-sm bg-white text-gray-800 shadow-sm"
                                    }`}
                                >
                                    {message.text}
                                </div>

                            </div>

                        )
                    )}


                    {sending && (

                        <div className="flex justify-start">

                            <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm">
                                Typing...
                            </div>

                        </div>

                    )}


                    <div ref={scrollRef} />

                </div>


                {/* Quick Replies */}

                <div className="flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-4 py-3">

                    {QUICK_REPLIES.map(
                        (reply) => (

                            <button
                                key={reply}
                                onClick={() =>
                                    handleSend(reply)
                                }
                                className="shrink-0 whitespace-nowrap rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-600 hover:text-blue-600"
                            >
                                {reply}
                            </button>

                        )
                    )}

                </div>


                {/* Input */}

                <form
                    onSubmit={(e) => {

                        e.preventDefault();

                        handleSend(input);

                    }}
                    className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3"
                >

                    <input
                        type="text"
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        placeholder="Type your message..."
                        className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    />


                    <button
                        type="submit"
                        disabled={
                            !input.trim() ||
                            sending
                        }
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Send message"
                    >
                        <FaPaperPlane className="text-xs" />
                    </button>

                </form>

            </div>

        </div>
    );
};


// --------------------------------------------------
// ORDER DETAILS
// --------------------------------------------------

const OrderDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [cancelling, setCancelling] =
        useState(false);

    const [cancelMessage, setCancelMessage] =
        useState("");

    const [chatItem, setChatItem] =
        useState(null);


    // --------------------------------------------------
    // FETCH ORDER
    // --------------------------------------------------

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getOrderById(id);

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


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">

                <p className="text-lg font-medium text-gray-600">
                    Loading order...
                </p>

            </div>
        );
    }


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10">

                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="font-medium text-red-600">
                        {error}
                    </p>


                    <button
                        onClick={() =>
                            navigate("/orders")
                        }
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
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


    // --------------------------------------------------
    // CANCEL ORDER
    // --------------------------------------------------

    const handleCancelOrder = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this order?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setCancelling(true);
            setError("");
            setCancelMessage("");

            const data =
                await cancelOrder(
                    order._id
                );

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


    // --------------------------------------------------
    // INVOICE
    // --------------------------------------------------

    const handleDownloadInvoice = () => {
        window.print();
    };


    const canCancel =
        order.orderStatus ===
        "processing" ||
        order.orderStatus ===
        "confirmed";


    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="mx-auto max-w-6xl">

                {/* Breadcrumb */}

                <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                        className="hover:text-blue-600"
                    >
                        My Account
                    </button>

                    <span>›</span>

                    <button
                        onClick={() =>
                            navigate("/orders")
                        }
                        className="hover:text-blue-600"
                    >
                        My Orders
                    </button>

                    <span>›</span>

                    <span className="text-gray-400">
                        #{order._id}
                    </span>

                </div>


                {/* Mobile Back */}

                <button
                    onClick={() =>
                        navigate("/orders")
                    }
                    className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 lg:hidden"
                >
                    <FaArrowLeft />
                    Back to Orders
                </button>


                {/* Cancel Success */}

                {cancelMessage && (

                    <div className="mb-6 rounded-xl bg-green-100 px-4 py-3 font-medium text-green-700">
                        {cancelMessage}
                    </div>

                )}


                <div className="grid gap-6 lg:grid-cols-3">

                    {/* ==================================================
                        LEFT
                    ================================================== */}

                    <div className="space-y-6 lg:col-span-2">

                        {order.items.map(
                            (item) => (

                                <div
                                    key={item._id}
                                    className="rounded-2xl bg-white p-6 shadow-sm"
                                >

                                    {/* Item Header */}

                                    <div className="mb-6 flex items-start justify-between gap-4">

                                        <div>

                                            <h1 className="text-lg font-semibold text-gray-900">
                                                {item.name}
                                            </h1>

                                            <p className="mt-1 text-sm font-bold text-gray-900">
                                                ₹{item.price}
                                            </p>

                                        </div>


                                        {/* Clickable Product Image */}

                                        <Link
                                            to={`/products/${
                                                item.product?._id ||
                                                item.product
                                            }`}
                                            className="shrink-0"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-16 w-16 rounded-lg bg-gray-50 object-contain p-1 transition-transform duration-200 hover:scale-105"
                                            />
                                        </Link>

                                    </div>


                                    {/* Tracking */}

                                    <ItemTimeline
                                        order={order}
                                    />


                                    <p className="mb-5 text-xs text-gray-400">

                                        Order placed on{" "}

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}

                                    </p>


                                    {/* Chat */}

                                    <button
                                        onClick={() =>
                                            setChatItem(
                                                item
                                            )
                                        }
                                        className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <FaCommentDots />

                                        Chat with us
                                    </button>


                                    {/* ==================================================
                                        REVIEW
                                    ================================================== */}

                                    {order.orderStatus ===
                                        "delivered" && (

                                            <RatingBlock
                                                productId={
                                                    item.product?._id ||
                                                    item.product
                                                }
                                                orderId={
                                                    order._id
                                                }
                                            />

                                        )}


                                    <p className="mt-5 text-xs text-gray-400">
                                        Order #{order._id}
                                    </p>

                                </div>

                            )
                        )}


                        {/* Mobile Cancel */}

                        {canCancel && (

                            <button
                                onClick={
                                    handleCancelOrder
                                }
                                disabled={
                                    cancelling
                                }
                                className="w-full rounded-xl border border-red-600 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
                            >
                                {cancelling
                                    ? "Cancelling..."
                                    : "Cancel Order"}
                            </button>

                        )}

                    </div>


                    {/* ==================================================
                        RIGHT
                    ================================================== */}

                    <div className="space-y-6">

                        {/* Delivery Details */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="mb-4 font-bold text-gray-900">
                                Delivery details
                            </h2>


                            <div className="flex items-start gap-3 border-b border-gray-100 pb-4">

                                <FaMapMarkerAlt className="mt-0.5 text-gray-400" />


                                <div className="min-w-0">

                                    <p className="text-sm font-semibold text-gray-900">
                                        Home
                                    </p>


                                    <p className="truncate text-sm text-gray-500">

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


                            <div className="flex items-center gap-3 pt-4">

                                <FaUser className="text-gray-400" />


                                <p className="text-sm text-gray-700">

                                    <span className="font-semibold">

                                        {
                                            order
                                                .shippingAddress
                                                .fullName
                                        }

                                    </span>{" "}

                                    {
                                        order
                                            .shippingAddress
                                            .phone
                                    }

                                </p>

                            </div>

                        </div>


                        {/* Price Details */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="mb-4 font-bold text-gray-900">
                                Price details
                            </h2>


                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Item total
                                    </span>

                                    <span>
                                        ₹{order.subtotal}
                                    </span>

                                </div>


                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Delivery
                                    </span>

                                    <span
                                        className={
                                            order.deliveryFee ===
                                                0
                                                ? "font-semibold text-green-600"
                                                : ""
                                        }
                                    >
                                        {order.deliveryFee ===
                                            0
                                            ? "FREE"
                                            : `₹${order.deliveryFee}`}
                                    </span>

                                </div>

                            </div>


                            <div className="my-4 h-px bg-gray-200" />


                            <div className="flex justify-between font-bold text-gray-900">

                                <span>
                                    Total amount
                                </span>

                                <span>
                                    ₹{order.totalPrice}
                                </span>

                            </div>


                            <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">

                                <span className="text-sm text-gray-500">
                                    Paid by
                                </span>

                                <span className="text-sm font-semibold uppercase text-gray-800">
                                    {
                                        order.paymentMethod
                                    }
                                </span>

                            </div>


                            {/* Invoice */}

                            <button
                                onClick={
                                    handleDownloadInvoice
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <FaDownload />

                                Download Invoice
                            </button>

                        </div>


                        {/* Desktop Cancel */}

                        {canCancel && (

                            <button
                                onClick={
                                    handleCancelOrder
                                }
                                disabled={
                                    cancelling
                                }
                                className="hidden w-full rounded-xl border border-red-600 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:block"
                            >
                                {cancelling
                                    ? "Cancelling..."
                                    : "Cancel Order"}
                            </button>

                        )}

                    </div>

                </div>

            </div>


            {/* Chat */}

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