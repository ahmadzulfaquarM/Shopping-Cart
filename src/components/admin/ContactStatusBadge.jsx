import React from "react";

const ContactStatusBadge = ({ status }) => {
    const statusConfig = {
        new: {
            label: "New",
            className:
                "bg-blue-100 text-blue-700",
        },

        read: {
            label: "Read",
            className:
                "bg-yellow-100 text-yellow-700",
        },

        replied: {
            label: "Replied",
            className:
                "bg-green-100 text-green-700",
        },
    };

    const config =
        statusConfig[status] ||
        {
            label: status || "Unknown",
            className:
                "bg-gray-100 text-gray-700",
        };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${config.className}
            `}
        >
            {config.label}
        </span>
    );
};

export default ContactStatusBadge;