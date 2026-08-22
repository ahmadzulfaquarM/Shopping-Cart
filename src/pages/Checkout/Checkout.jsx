import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CheckoutAddress from "./CheckoutAddress";

const Checkout = () => {
    const { cartItems } = useCart();
    const { user } = useAuth();

    // Temporary demo addresses
    // We will replace these with the real API in 3.5
    const demoAddresses = [
        {
            _id: "1",
            fullName: "Zulfaquar Ahmad",
            phone: "9876543210",
            address: "NIT Patna Campus",
            city: "Patna",
            state: "Bihar",
            pincode: "800001",
            isDefault: true,
        },
        {
            _id: "2",
            fullName: "Zulfaquar Ahmad",
            phone: "9876543210",
            address: "Example Street",
            city: "Patna",
            state: "Bihar",
            pincode: "800002",
            isDefault: false,
        },
    ];

    // Selected address
    const [selectedAddress, setSelectedAddress] = useState(
        demoAddresses.find((address) => address.isDefault) ||
        demoAddresses[0]
    );

    // Calculate subtotal
    const subtotal =
        cartItems?.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        ) || 0;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">

            {/* Page Header */}

            <div className="mx-auto mb-10 max-w-7xl">

                <h1 className="text-3xl font-bold text-gray-900">
                    Checkout
                </h1>

                <p className="mt-2 text-gray-500">
                    Complete your order
                </p>

            </div>


            {/* Checkout Layout */}

            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

                {/* LEFT SIDE */}

                <div className="space-y-8 lg:col-span-2">

                    {/* Delivery Address */}

                    <CheckoutAddress
                        addresses={demoAddresses}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                    />


                    {/* Payment Method */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-bold text-gray-900">
                            2. Payment Method
                        </h2>

                        <div className="space-y-4">

                            {/* Cash on Delivery */}

                            <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-blue-500">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    defaultChecked
                                    className="h-5 w-5 accent-blue-600"
                                />

                                <div>

                                    <p className="font-semibold text-gray-900">
                                        Cash on Delivery
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pay when your order arrives
                                    </p>

                                </div>

                            </label>


                            {/* Online Payment */}

                            <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-blue-500">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    className="h-5 w-5 accent-blue-600"
                                />

                                <div>

                                    <p className="font-semibold text-gray-900">
                                        Online Payment
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pay securely online
                                    </p>

                                </div>

                            </label>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE — ORDER SUMMARY */}

                <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                        Order Summary
                    </h2>


                    {/* Cart Items */}

                    <div className="space-y-4">

                        {cartItems?.map((item) => (

                            <div
                                key={item._id}
                                className="flex items-center justify-between border-b border-gray-100 pb-4"
                            >

                                {/* Product */}

                                <div className="flex items-center gap-3">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-lg bg-gray-50 object-contain p-2"
                                    />

                                    <div>

                                        <p className="font-semibold text-gray-800">
                                            {item.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>

                                    </div>

                                </div>


                                {/* Item Price */}

                                <p className="font-semibold text-gray-900">
                                    ₹{item.price * item.quantity}
                                </p>

                            </div>

                        ))}

                    </div>


                    {/* Price Breakdown */}

                    <div className="mt-6 space-y-3">

                        {/* Subtotal */}

                        <div className="flex justify-between text-gray-600">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹{subtotal}
                            </span>

                        </div>


                        {/* Delivery */}

                        <div className="flex justify-between text-gray-600">

                            <span>
                                Delivery
                            </span>

                            <span className="font-semibold text-green-600">
                                FREE
                            </span>

                        </div>

                    </div>


                    {/* Divider */}

                    <div className="my-5 h-px bg-gray-200" />


                    {/* Total */}

                    <div className="flex justify-between">

                        <span className="text-lg font-bold text-gray-900">
                            Total
                        </span>

                        <span className="text-2xl font-bold text-blue-600">
                            ₹{subtotal}
                        </span>

                    </div>


                    {/* Selected Address Preview */}

                    {selectedAddress && (
                        <div className="mt-6 rounded-xl bg-gray-50 p-4">

                            <p className="text-sm font-semibold text-gray-500">
                                Delivering to
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {selectedAddress.fullName}
                            </p>

                            <p className="mt-1 text-sm text-gray-600">
                                {selectedAddress.city},{" "}
                                {selectedAddress.state} -{" "}
                                {selectedAddress.pincode}
                            </p>

                        </div>
                    )}


                    {/* Place Order */}

                    <button
                        type="button"
                        className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Checkout;