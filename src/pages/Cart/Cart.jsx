import { Link, useNavigate } from "react-router-dom";
import {
    FaTrash,
    FaMinus,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

const Cart = () => {
    const navigate = useNavigate();

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shipping =
        subtotal === 0
            ? 0
            : subtotal >= 1000
            ? 0
            : 99;

    const discount = 0;
    const total = subtotal + shipping - discount;

    if (cartItems.length === 0) {
        return (
            <section className="min-h-screen bg-slate-50 px-4 py-16 sm:py-20">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 sm:h-32 sm:w-32">
                        <span className="text-5xl sm:text-6xl">
                            🛒
                        </span>
                    </div>

                    <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Shopping Cart
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Your Cart is Empty
                    </h1>

                    <p className="mt-4 max-w-md text-base leading-7 text-gray-500 sm:text-lg">
                        Looks like you haven't added any products
                        to your cart yet. Start shopping to fill it
                        with amazing products.
                    </p>

                    <Link
                        to="/products"
                        className="mt-8 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Your Bag
                    </p>

                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Shopping Cart
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Review your items before checkout.
                            </p>
                        </div>

                        <span className="text-sm font-medium text-gray-500">
                            {cartItems.length}{" "}
                            {cartItems.length === 1
                                ? "item"
                                : "items"}
                        </span>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Cart Items */}
                    <div className="space-y-4">

                        {cartItems.map((item) => (
                            <article
                                key={item._id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                            >
                                <div className="flex min-w-0 gap-4">

                                    {/* Product Image */}
                                    <Link
                                        to={`/products/${item._id}`}
                                        className="shrink-0"
                                    >
                                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-50 sm:h-28 sm:w-28">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                                className="h-full w-full object-contain p-2"
                                            />
                                        </div>
                                    </Link>

                                    {/* Product Info */}
                                    <div className="min-w-0 flex-1">

                                        <Link
                                            to={`/products/${item._id}`}
                                            className="line-clamp-2 text-sm font-bold text-gray-900 transition hover:text-blue-600 sm:text-base"
                                        >
                                            {item.name}
                                        </Link>

                                        <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                                            {item.category}
                                        </p>

                                        <p className="mt-2 text-base font-bold text-blue-600 sm:text-lg">
                                            ₹{item.price}
                                        </p>

                                        {/* Quantity */}
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-500">
                                                Qty:
                                            </span>

                                            <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item._id
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <=
                                                        1
                                                    }
                                                    aria-label="Decrease quantity"
                                                    className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300"
                                                >
                                                    <FaMinus className="text-[9px]" />
                                                </button>

                                                <span className="flex h-8 min-w-8 items-center justify-center border-x border-gray-200 px-2 text-sm font-semibold text-gray-800">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item._id
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity >=
                                                        item.stock
                                                    }
                                                    aria-label="Increase quantity"
                                                    className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300"
                                                >
                                                    <FaPlus className="text-[9px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromCart(
                                                item._id
                                            )
                                        }
                                        aria-label={`Remove ${item.name} from cart`}
                                        title="Remove item"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <FaTrash className="text-sm" />
                                    </button>
                                </div>

                                {/* Item Total */}
                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-sm text-gray-500">
                                        Item Total
                                    </span>

                                    <span className="font-bold text-gray-900">
                                        ₹
                                        {item.price *
                                            item.quantity}
                                    </span>
                                </div>
                            </article>
                        ))}

                    </div>

                    {/* Summary */}
                    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="mt-6 space-y-4 text-sm">

                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-gray-900">
                                    ₹{subtotal}
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>

                                <span
                                    className={
                                        shipping === 0
                                            ? "font-semibold text-green-600"
                                            : "font-semibold text-gray-900"
                                    }
                                >
                                    {shipping === 0
                                        ? "FREE"
                                        : `₹${shipping}`}
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Discount</span>

                                <span className="font-semibold text-green-600">
                                    -₹{discount}
                                </span>
                            </div>
                        </div>

                        <div className="my-5 h-px bg-gray-200" />

                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-blue-600">
                                ₹{total}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/checkout")}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Proceed to Checkout
                            <FaArrowRight className="text-sm" />
                        </button>

                        {subtotal > 0 && shipping > 0 && (
                            <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-xs leading-5 text-gray-600">
                                Add{" "}
                                <span className="font-bold text-blue-600">
                                    ₹{1000 - subtotal}
                                </span>{" "}
                                more to get{" "}
                                <span className="font-bold text-green-600">
                                    FREE shipping
                                </span>
                            </p>
                        )}

                        <Link
                            to="/products"
                            className="mt-4 block text-center text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                        >
                            Continue Shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Cart;