import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 text-center">

          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-red-100">
            <FaHeart className="text-6xl text-red-500" />
          </div>

          <h1 className="mt-10 text-4xl font-bold text-gray-900">
            Your Wishlist is Empty
          </h1>

          <p className="mt-4 max-w-md text-lg text-gray-500">
            You haven't added any products to your wishlist yet.
            Start exploring and save your favorite products.
          </p>

          <Link
            to="/products"
            className="mt-10 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Explore Products
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-14">

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Saved Products
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              My Wishlist
            </h1>
          </div>

          <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-600">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "Item"
              : "Items"}
          </span>

        </div>

        {/* Products */}

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {wishlistItems.map((product) => (

            <div
              key={product._id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">

                {product.discount > 0 && (
                  <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    {product.discount}% OFF
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                   

                    removeFromWishlist(product._id);
                  }}
                  className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:scale-110 hover:bg-red-500 hover:text-white"
                >
                  <FaTrash />
                </button>

                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto h-56 object-contain transition duration-500 group-hover:scale-110"
                  />
                </Link>

              </div>

              {/* Content */}

              <div className="p-6">

                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {product.category}
                </p>

                <Link to={`/products/${product._id}`}>
                  <h2 className="mt-2 text-xl font-bold text-gray-900 hover:text-blue-600">
                    {product.name}
                  </h2>
                </Link>

                {/* Rating */}

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-yellow-400">
                    ★
                  </span>

                  <span className="text-sm text-gray-500">
                    {product.rating} (
                    {product.numReviews})
                  </span>
                </div>

                {/* Price */}

                <div className="mt-5 flex items-center gap-3">

                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>

                  {product.discount > 0 && (
                    <span className="text-gray-400 line-through">
                      ₹
                      {Math.round(
                        product.price /
                        (1 -
                          product.discount /
                          100)
                      )}
                    </span>
                  )}

                </div>

                {/* Add to Cart */}

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <FaShoppingCart />
                  {product.stock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Wishlist;