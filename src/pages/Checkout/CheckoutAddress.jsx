import React from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const CheckoutAddress = ({
    addresses,
    selectedAddress,
    setSelectedAddress,
}) => {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-bold text-gray-900">
                    1. Delivery Address
                </h2>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                    <FaPlus />
                    Add New
                </button>

            </div>


            {/* Addresses */}

            {addresses.length === 0 ? (

                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">

                    <FaMapMarkerAlt className="mx-auto mb-3 text-3xl text-gray-400" />

                    <p className="font-semibold text-gray-700">
                        No saved addresses
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Please add an address to continue.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {addresses.map((address) => {

                        const selected =
                            selectedAddress?._id === address._id;

                        return (
                            <button
                                type="button"
                                key={address._id}
                                onClick={() =>
                                    setSelectedAddress(address)
                                }
                                className={`w-full rounded-xl border-2 p-5 text-left transition ${
                                    selected
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-400"
                                }`}
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex gap-4">

                                        <FaMapMarkerAlt
                                            className={`mt-1 ${
                                                selected
                                                    ? "text-blue-600"
                                                    : "text-gray-400"
                                            }`}
                                        />

                                        <div>

                                            <div className="flex items-center gap-3">

                                                <p className="font-bold text-gray-900">
                                                    {address.fullName}
                                                </p>

                                                {address.isDefault && (
                                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                                        Default
                                                    </span>
                                                )}

                                            </div>

                                            <p className="mt-2 text-sm text-gray-600">
                                                {address.address}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                {address.city},{" "}
                                                {address.state} -{" "}
                                                {address.postalCode}
                                            </p>

                                            <p className="mt-2 text-sm font-medium text-gray-700">
                                                Phone: {address.phone}
                                            </p>

                                        </div>

                                    </div>


                                    {selected && (
                                        <FaCheckCircle className="text-xl text-blue-600" />
                                    )}

                                </div>

                            </button>
                        );
                    })}

                </div>

            )}

        </div>
    );
};

export default CheckoutAddress;