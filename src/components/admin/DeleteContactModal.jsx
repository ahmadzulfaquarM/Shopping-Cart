import React from "react";
import {
    FaExclamationTriangle,
    FaSpinner,
    FaTrash,
    FaTimes,
} from "react-icons/fa";

const DeleteContactModal = ({
    isOpen,
    onClose,
    onConfirm,
    deleting = false,
    contactName = "this contact message",
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
                    <h2 className="text-lg font-bold text-gray-900">
                        Delete Contact Message
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Content */}

                <div className="px-5 py-6 sm:px-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <FaExclamationTriangle className="text-xl" />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-gray-900">
                            Are you sure?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            You are about to permanently delete{" "}
                            <span className="font-semibold text-gray-700">
                                {contactName}
                            </span>
                            . This action cannot be undone.
                        </p>
                    </div>
                </div>

                {/* Actions */}

                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        className="w-full rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={deleting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {deleting ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <FaTrash />
                                Delete Message
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteContactModal;