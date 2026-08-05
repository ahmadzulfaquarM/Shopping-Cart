import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const Cart = () => {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 ? 0 : subtotal >= 1000 ? 0 : 99;

  const discount = 0;

  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 text-center">

          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-100">

            <span className="text-6xl">🛒</span>

          </div>

          <h1 className="mt-10 text-4xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-4 max-w-md text-lg text-gray-500">
            Looks like you haven't added any products to your cart yet.
            Start shopping to fill it with amazing products.
          </p>

          <Link
            to="/products"
            className="mt-10 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Continue Shopping
          </Link>

        </div>
      </section>
    );
  }

  return (

    <section className="bg-slate-50 py-14 min-h-screen">

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

        <h1 className="text-4xl font-bold text-gray-900">
          Shopping Cart
        </h1>


        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Cart Items */}

          <div className="space-y-6">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="flex items-center gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 object-contain"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {item.category}
                  </p>

                  <p className="mt-3 text-lg font-semibold text-blue-600">
                    ₹{item.price}
                  </p>

                </div>

                <div>

                  <p className="mb-3 text-center font-semibold">
                    Qty
                  </p>

                  <div className="flex items-center overflow-hidden rounded-xl border">

                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-4 py-2 font-bold transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-95"
                    >
                      −
                    </button>

                    <span className="px-5">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      disabled={item.quantity >= item.stock}
                      className={`px-4 py-2 font-bold transition-all duration-300
                      ${item.quantity >= item.stock
                          ? "cursor-not-allowed bg-gray-200 text-gray-400"
                          : "hover:bg-blue-600 hover:text-white active:scale-95"
                        }`}
                    >
                      +
                    </button>

                  </div>

                </div>

                <div>

                  <p className="font-semibold">
                    Total
                  </p>

                  <p className="mt-2 text-lg font-bold">
                    ₹{item.price * item.quantity}
                  </p>

                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="flex items-center gap-2 rounded-xl border border-red-500 px-4 py-2 font-medium text-red-600 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white active:scale-95"
                >
                  <FaTrash />
                  Remove
                </button>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ₹{subtotal}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Shipping
                </span>

                <span
                  className={`font-semibold ${shipping === 0
                    ? "text-green-600"
                    : "text-gray-900"
                    }`}
                >
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Discount
                </span>

                <span className="font-semibold text-green-600">
                  -₹{discount}
                </span>

              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-blue-600">
                  ₹{total}
                </span>

              </div>

            </div>

            <button className="mt-10 w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:scale-95">

              Proceed to Checkout

            </button>

            {subtotal > 0 && shipping > 0 && (
              <p className="mt-4 text-center text-sm text-gray-500">
                Add <span className="font-semibold text-blue-600">
                  ₹{1000 - subtotal}
                </span>{" "}
                more to get <span className="font-semibold text-green-600">FREE Shipping</span>.
              </p>
            )}

          </div>

        </div>

      </div>

    </section>

  );

};

export default Cart;