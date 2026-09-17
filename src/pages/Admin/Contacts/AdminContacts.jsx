import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaSearch,
    FaSyncAlt,
    FaEye,
    FaTrash,
    FaChevronLeft,
    FaChevronRight,
    FaEnvelope,
    FaSpinner,
} from "react-icons/fa";

import {
    getAdminContactMessages,
    deleteContactMessage,
} from "../../../services/contactService";

import ContactStatusBadge from "../../../components/admin/ContactStatusBadge";
import DeleteContactModal from "../../../components/admin/DeleteContactModal";

const AdminContacts = () => {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalMessages: 0,
        limit: 10,
    });

    const [error, setError] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Delete State
    |--------------------------------------------------------------------------
    */

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [selectedMessage, setSelectedMessage] =
        useState(null);

    const [deleting, setDeleting] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Fetch Messages
    |--------------------------------------------------------------------------
    */

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getAdminContactMessages({
                    page,
                    limit: 10,
                    status,
                    search,
                });

            setMessages(data.messages || []);

            setPagination(
                data.pagination || {
                    currentPage: page,
                    totalPages: 1,
                    totalMessages: 0,
                    limit: 10,
                }
            );
        } catch (error) {
            console.error(
                "Admin Contacts Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to load contact messages."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [page, status, search]);

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = (event) => {
        event.preventDefault();

        setPage(1);
        setSearch(searchInput.trim());
    };

    /*
    |--------------------------------------------------------------------------
    | Status Filter
    |--------------------------------------------------------------------------
    */

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setPage(1);
    };

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = () => {
        fetchMessages();
    };

    /*
    |--------------------------------------------------------------------------
    | View Message
    |--------------------------------------------------------------------------
    */

    const handleViewMessage = (id) => {
        navigate(`/admin/contacts/${id}`);
    };

    /*
    |--------------------------------------------------------------------------
    | Open Delete Modal
    |--------------------------------------------------------------------------
    */

    const handleOpenDeleteModal = (message) => {
        setSelectedMessage(message);
        setDeleteModalOpen(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Close Delete Modal
    |--------------------------------------------------------------------------
    */

    const handleCloseDeleteModal = () => {
        if (deleting) {
            return;
        }

        setDeleteModalOpen(false);
        setSelectedMessage(null);
    };

    /*
    |--------------------------------------------------------------------------
    | Delete Message
    |--------------------------------------------------------------------------
    */

    const handleDeleteMessage = async () => {
        if (!selectedMessage) {
            return;
        }

        try {
            setDeleting(true);

            await deleteContactMessage(
                selectedMessage._id
            );

            setDeleteModalOpen(false);
            setSelectedMessage(null);

            /*
            | If the last item on the current page
            | was deleted, move to previous page.
            */

            if (
                messages.length === 1 &&
                page > 1
            ) {
                setPage((previousPage) =>
                    previousPage - 1
                );
            } else {
                await fetchMessages();
            }
        } catch (error) {
            console.error(
                "Delete Contact Message Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to delete contact message."
            );
        } finally {
            setDeleting(false);
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
                        Loading contact messages...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <FaEnvelope />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Contact Messages
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage customer support messages
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FaSyncAlt />
                        Refresh
                    </button>
                </div>
            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Search */}

                    <form
                        onSubmit={handleSearch}
                        className="flex min-w-0 flex-1"
                    >
                        <div className="relative min-w-0 flex-1">
                            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                            <input
                                type="text"
                                value={searchInput}
                                onChange={(event) =>
                                    setSearchInput(
                                        event.target.value
                                    )
                                }
                                placeholder="Search name, email or subject..."
                                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="ml-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

                    {/* Status */}

                    <select
                        value={status}
                        onChange={
                            handleStatusChange
                        }
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="new">
                            New
                        </option>

                        <option value="read">
                            Read
                        </option>

                        <option value="replied">
                            Replied
                        </option>
                    </select>
                </div>
            </div>

            {/* ==================================================
                RESULT COUNT
            ================================================== */}

            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {pagination.totalMessages}{" "}
                    message
                    {pagination.totalMessages !==
                    1
                        ? "s"
                        : ""}
                </p>
            </div>

            {/* ==================================================
                EMPTY STATE
            ================================================== */}

            {messages.length === 0 ? (
                <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <FaEnvelope className="text-2xl" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-gray-900">
                        No Contact Messages
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        No verified contact messages match your search.
                    </p>
                </div>
            ) : (
                <>
                    {/* ==================================================
                        DESKTOP TABLE
                    ================================================== */}

                    <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Customer
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Subject
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Date
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {messages.map(
                                        (message) => (
                                            <tr
                                                key={
                                                    message._id
                                                }
                                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/70"
                                            >
                                                <td className="px-5 py-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {
                                                                message.name
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {
                                                                message.email
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="max-w-[280px] px-5 py-4">
                                                    <p className="truncate font-medium text-gray-800">
                                                        {
                                                            message.subject
                                                        }
                                                    </p>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                                    {formatDate(
                                                        message.createdAt
                                                    )}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <ContactStatusBadge
                                                        status={
                                                            message.status
                                                        }
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleViewMessage(
                                                                    message._id
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                            title="View"
                                                        >
                                                            <FaEye />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleOpenDeleteModal(
                                                                    message
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                                                            title="Delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ==================================================
                        MOBILE CARDS
                    ================================================== */}

                    <div className="space-y-4 lg:hidden">
                        {messages.map(
                            (message) => (
                                <div
                                    key={
                                        message._id
                                    }
                                    className="rounded-2xl bg-white p-5 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-bold text-gray-900">
                                                {
                                                    message.name
                                                }
                                            </p>

                                            <p className="mt-1 break-all text-sm text-gray-500">
                                                {
                                                    message.email
                                                }
                                            </p>
                                        </div>

                                        <ContactStatusBadge
                                            status={
                                                message.status
                                            }
                                        />
                                    </div>

                                    <div className="mt-4 border-t border-gray-100 pt-4">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Subject
                                        </p>

                                        <p className="mt-1 break-words font-semibold text-gray-800">
                                            {
                                                message.subject
                                            }
                                        </p>

                                        <p className="mt-3 text-xs text-gray-400">
                                            {formatDate(
                                                message.createdAt
                                            )}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleViewMessage(
                                                    message._id
                                                )
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                                        >
                                            <FaEye />
                                            View
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleOpenDeleteModal(
                                                    message
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* ==================================================
                        PAGINATION
                    ================================================== */}

                    {pagination.totalPages >
                        1 && (
                        <div className="mt-6 flex items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm sm:px-5">
                            <button
                                type="button"
                                disabled={
                                    page <= 1
                                }
                                onClick={() =>
                                    setPage(
                                        (previousPage) =>
                                            previousPage -
                                            1
                                    )
                                }
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FaChevronLeft />
                                <span className="hidden sm:inline">
                                    Previous
                                </span>
                            </button>

                            <p className="text-sm font-medium text-gray-600">
                                Page {page} of{" "}
                                {
                                    pagination.totalPages
                                }
                            </p>

                            <button
                                type="button"
                                disabled={
                                    page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    setPage(
                                        (previousPage) =>
                                            previousPage +
                                            1
                                    )
                                }
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <span className="hidden sm:inline">
                                    Next
                                </span>
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* ==================================================
                DELETE MODAL
            ================================================== */}

            <DeleteContactModal
                isOpen={deleteModalOpen}
                onClose={
                    handleCloseDeleteModal
                }
                onConfirm={
                    handleDeleteMessage
                }
                deleting={deleting}
                contactName={
                    selectedMessage?.name ||
                    "this contact message"
                }
            />
        </div>
    );
};

export default AdminContacts;