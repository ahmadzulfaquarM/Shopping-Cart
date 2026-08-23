import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CheckoutAddress from "./CheckoutAddress";
import { createOrder } from "../../services/orderService";
import { getAddresses } from "../../services/addressService";

const Checkout = () => {
    const { cartItems } = useCart();
    const { user } = useAuth();


    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressLoading, setAddressLoading] = useState(true);

    // Payment method
    const [paymentMethod, setPaymentMethod] = useState("cod");

    // Order states
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setAddressLoading(true);

                const data = await getAddresses();

                const fetchedAddresses = data.addresses || [];

                setAddresses(fetchedAddresses);

                const defaultAddress =
                    fetchedAddresses.find(
                        (address) => address.isDefault
                    ) || fetchedAddresses[0];

                setSelectedAddress(defaultAddress || null);

            } catch (error) {
                console.error(
                    "Failed to fetch addresses:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load addresses"
                );
            } finally {
                setAddressLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    // Calculate subtotal
    const subtotal =
        cartItems?.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        ) || 0;

    const isCartEmpty =
        !cartItems || cartItems.length === 0;

    // Place order
    const handlePlaceOrder = async () => {
        try {
            setMessage("");
            setError("");

            // Check cart
            if (isCartEmpty) {
                setError("Your cart is empty.");
                return;
            }

            // Check address
            if (!selectedAddress) {
                setError("Please select a delivery address.");
                return;
            }

            // Check user
            if (!user) {
                setError("Please login before placing an order.");
                return;
            }

            setLoading(true);

            // Prepare cart items
            const orderItems = cartItems.map((item) => ({
                product: item._id,
                quantity: item.quantity,
            }));

            // Create order
            const data = await createOrder(
                orderItems,
                selectedAddress._id,
                paymentMethod
            );

            console.log("Order created:", data);

            setMessage(
                `Order placed successfully! Order ID: ${data.order._id}`
            );

        } catch (error) {
            console.error("Place Order Error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to place order. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

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


            {/* Success Message */}

            {message && (
                <div className="mx-auto mb-6 max-w-7xl rounded-xl bg-green-100 px-5 py-4 font-medium text-green-700">
                    {message}
                </div>
            )}


            {/* Error Message */}

            {error && (
                <div className="mx-auto mb-6 max-w-7xl rounded-xl bg-red-100 px-5 py-4 font-medium text-red-700">
                    {error}
                </div>
            )}


            {/* Checkout Layout */}

            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

                {/* LEFT SIDE */}

                <div className="space-y-8 lg:col-span-2">

                    {/* Delivery Address */}

                    {addressLoading ? (
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <p className="text-gray-500">
                                Loading addresses...
                            </p>
                        </div>
                    ) : (
                        <CheckoutAddress
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />
                    )}


                    {/* Payment Method */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-bold text-gray-900">
                            2. Payment Method
                        </h2>

                        <div className="space-y-4">

                            {/* Cash on Delivery */}

                            <button
                                type="button"
                                onClick={() =>
                                    setPaymentMethod("cod")
                                }
                                className={`w-full rounded-xl border-2 p-5 text-left transition ${paymentMethod === "cod"
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-400"
                                    }`}
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "cod"
                                                ? "border-blue-600"
                                                : "border-gray-400"
                                                }`}
                                        >
                                            {paymentMethod === "cod" && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                            )}
                                        </div>

                                        <div>

                                            <p className="font-semibold text-gray-900">
                                                Cash on Delivery
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Pay when your order arrives
                                            </p>

                                        </div>

                                    </div>

                                    {paymentMethod === "cod" && (
                                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                            Selected
                                        </span>
                                    )}

                                </div>

                            </button>


                            {/* Online Payment */}

                            <button
                                type="button"
                                onClick={() =>
                                    setPaymentMethod("online")
                                }
                                className={`w-full rounded-xl border-2 p-5 text-left transition ${paymentMethod === "online"
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-400"
                                    }`}
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "online"
                                                ? "border-blue-600"
                                                : "border-gray-400"
                                                }`}
                                        >
                                            {paymentMethod === "online" && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                            )}
                                        </div>

                                        <div>

                                            <p className="font-semibold text-gray-900">
                                                Online Payment
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Pay securely online
                                            </p>

                                        </div>

                                    </div>

                                    {paymentMethod === "online" && (
                                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                            Selected
                                        </span>
                                    )}

                                </div>

                            </button>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                        Order Summary
                    </h2>


                    {/* Empty Cart */}

                    {isCartEmpty ? (

                        <div className="py-8 text-center">

                            <p className="text-4xl">
                                🛒
                            </p>

                            <p className="mt-3 font-semibold text-gray-800">
                                Your cart is empty
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Add products before checkout.
                            </p>

                        </div>

                    ) : (

                        <>
                            {/* Cart Items */}

                            <div className="space-y-4">

                                {cartItems.map((item) => (

                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between border-b border-gray-100 pb-4"
                                    >

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

                                        <p className="font-semibold text-gray-900">
                                            ₹
                                            {item.price *
                                                item.quantity}
                                        </p>

                                    </div>

                                ))}

                            </div>


                            {/* Price Breakdown */}

                            <div className="mt-6 space-y-3">

                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹{subtotal}
                                    </span>

                                </div>


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


                            {/* Selected Address */}

                            {selectedAddress && (
                                <div className="mt-6 rounded-xl bg-gray-50 p-4">

                                    <p className="text-sm font-semibold text-gray-500">
                                        Delivering to
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {selectedAddress.fullName}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {selectedAddress.address}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {selectedAddress.city},{" "}
                                        {selectedAddress.state} -{" "}
                                        {selectedAddress.postalCode}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Phone: {selectedAddress.phone}
                                    </p>

                                </div>
                            )}


                            {/* Place Order */}

                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                            >

                                {loading
                                    ? "Placing Order..."
                                    : "Place Order"}

                            </button>


                            {/* Secure Checkout */}

                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">

                                <span>
                                    🔒
                                </span>

                                <span>
                                    Secure checkout
                                </span>

                            </div>

                        </>
                    )}

                </div>

            </div>

        </div>
    );
};

export default Checkout;