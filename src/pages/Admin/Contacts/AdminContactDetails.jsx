import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaEnvelope,
    FaUser,
    FaCalendarAlt,
    FaCheckCircle,
    FaReply,
    FaSpinner,
    FaPaperPlane,
} from "react-icons/fa";

import {
    getAdminContactMessage,
    updateContactStatus,
    replyToContactMessage,
} from "../../../services/contactService";

import ContactStatusBadge from "../../../components/admin/ContactStatusBadge";

const AdminContactDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);

    const [error, setError] = useState("");
    const [replyError, setReplyError] = useState("");
    const [replySuccess, setReplySuccess] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Fetch Contact Message
    |--------------------------------------------------------------------------
    */

    const fetchMessage = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminContactMessage(id);

            setMessage(
                data.message ||
                    data.contact ||
                    null
            );
        } catch (error) {
            console.error(
                "Admin Contact Details Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to load contact message."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessage();
    }, [id]);

    /*
    |--------------------------------------------------------------------------
    | Mark As Read
    |--------------------------------------------------------------------------
    */

    const handleMarkAsRead = async () => {
        if (
            !message ||
            message.status !== "new"
        ) {
            return;
        }

        try {
            setUpdating(true);

            const data =
                await updateContactStatus(
                    id,
                    "read"
                );

            setMessage(
                data.message ||
                    data.contact ||
                    {
                        ...message,
                        status: "read",
                    }
            );
        } catch (error) {
            console.error(
                "Update Contact Status Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to update message status."
            );
        } finally {
            setUpdating(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Send Reply
    |--------------------------------------------------------------------------
    */

    const handleSendReply = async (event) => {
        event.preventDefault();

        setReplyError("");
        setReplySuccess("");

        const cleanReply =
            replyMessage.trim();

        if (!cleanReply) {
            setReplyError(
                "Please enter a reply message."
            );
            return;
        }

        if (cleanReply.length < 2) {
            setReplyError(
                "Reply message must be at least 2 characters."
            );
            return;
        }

        try {
            setSendingReply(true);

            const data =
                await replyToContactMessage(
                    id,
                    cleanReply
                );

            setMessage(
                data.contact ||
                    {
                        ...message,
                        status: "replied",
                    }
            );

            setReplyMessage("");

            setReplySuccess(
                "Reply sent successfully to the customer."
            );
        } catch (error) {
            console.error(
                "Send Contact Reply Error:",
                error
            );

            setReplyError(
                error.response?.data?.message ||
                    "Failed to send reply. Please try again."
            );
        } finally {
            setSendingReply(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Format Date
    |--------------------------------------------------------------------------
    */

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="mx-auto mb-4 animate-spin text-3xl text-blue-600" />

                    <p className="font-medium text-gray-600">
                        Loading contact message...
                    </p>
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error || !message) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <FaEnvelope className="text-2xl" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                    Unable to Load Message
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    {error ||
                        "Contact message not found."}
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/admin/contacts"
                        )
                    }
                    className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                >
                    Back to Contacts
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8">
                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/admin/contacts"
                        )
                    }
                    className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-blue-600"
                >
                    <FaArrowLeft />

                    Back to Contact Messages
                </button>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <FaEnvelope />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Contact Details
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                View customer support message
                            </p>
                        </div>
                    </div>

                    <ContactStatusBadge
                        status={message.status}
                    />
                </div>
            </div>

            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                {/* ==================================================
                    LEFT SIDE
                ================================================== */}

                <div className="space-y-6">
                    {/* ==================================================
                        CUSTOMER MESSAGE
                    ================================================== */}

                    <div className="rounded-2xl bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Subject
                            </p>

                            <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                                {message.subject}
                            </h2>
                        </div>

                        <div className="px-5 py-6 sm:px-7 sm:py-8">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Customer Message
                            </p>

                            <div className="whitespace-pre-wrap break-words rounded-xl bg-gray-50 p-5 text-sm leading-7 text-gray-700 sm:p-6 sm:text-base">
                                {message.message}
                            </div>
                        </div>
                    </div>

                    {/* ==================================================
                        REPLY SECTION
                    ================================================== */}

                    <div className="rounded-2xl bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <FaReply />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Reply to Customer
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Send a reply to{" "}
                                        {message.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={
                                handleSendReply
                            }
                            className="px-5 py-6 sm:px-7 sm:py-7"
                        >
                            {/* Success */}

                            {replySuccess && (
                                <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                    <FaCheckCircle className="mt-0.5 shrink-0" />

                                    <span>
                                        {
                                            replySuccess
                                        }
                                    </span>
                                </div>
                            )}

                            {/* Error */}

                            {replyError && (
                                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {replyError}
                                </div>
                            )}

                            <label
                                htmlFor="replyMessage"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Your Reply
                            </label>

                            <textarea
                                id="replyMessage"
                                name="replyMessage"
                                value={
                                    replyMessage
                                }
                                onChange={(event) =>
                                    setReplyMessage(
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="Write your reply to the customer..."
                                rows={7}
                                maxLength={2000}
                                disabled={
                                    sendingReply
                                }
                                className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 sm:text-base"
                            />

                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-xs text-gray-400">
                                    The reply will be sent to the customer's email.
                                </p>

                                <p className="text-xs text-gray-400">
                                    {
                                        replyMessage.length
                                    }
                                    /2000
                                </p>
                            </div>

                            <div className="mt-5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={
                                        sendingReply ||
                                        !replyMessage.trim()
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {sendingReply ? (
                                        <>
                                            <FaSpinner className="animate-spin" />

                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />

                                            Send Reply
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ==================================================
                    RIGHT SIDE
                ================================================== */}

                <div className="space-y-6">
                    {/* ==================================================
                        CUSTOMER INFORMATION
                    ================================================== */}

                    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            Customer Information
                        </h3>

                        <div className="mt-5 space-y-5">
                            {/* NAME */}

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <FaUser />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-400">
                                        Name
                                    </p>

                                    <p className="mt-1 break-words font-semibold text-gray-900">
                                        {message.name}
                                    </p>
                                </div>
                            </div>

                            {/* EMAIL */}

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                    <FaEnvelope />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-400">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${message.email}`}
                                        className="mt-1 block break-all font-semibold text-gray-900 transition hover:text-blue-600"
                                    >
                                        {message.email}
                                    </a>
                                </div>
                            </div>

                            {/* DATE */}

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                    <FaCalendarAlt />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-gray-400">
                                        Submitted
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {formatDate(
                                            message.createdAt
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================
                        ACTIONS
                    ================================================== */}

                    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            Actions
                        </h3>

                        <div className="mt-5 space-y-3">
                            {message.status ===
                                "new" && (
                                <button
                                    type="button"
                                    onClick={
                                        handleMarkAsRead
                                    }
                                    disabled={
                                        updating
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {updating ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : (
                                        <FaCheckCircle />
                                    )}

                                    {updating
                                        ? "Updating..."
                                        : "Mark as Read"}
                                </button>
                            )}

                            <a
                                href={`mailto:${message.email}`}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <FaEnvelope />

                                Email Customer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminContactDetails;