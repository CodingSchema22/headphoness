
import React from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../data/imageMap";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";

// Format amounts in Pakistani Rupees
const formatPKR = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  // Free shipping on orders of Rs. 15,000 or more
  const FREE_SHIPPING_LIMIT = 15000;
  const SHIPPING_FEE = 500;

  const shipping =
    cartTotal >= FREE_SHIPPING_LIMIT || cartTotal === 0
      ? 0
      : SHIPPING_FEE;

  const finalTotal = cartTotal + shipping;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <section className="px-6 md:px-10 lg:px-16 pt-14 pb-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition mb-7"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Your Selection
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mt-3">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-4">
                Review your selected products before checkout.
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition w-fit"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </section>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <section className="px-6 md:px-10 lg:px-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[500px] rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center text-center px-6">
              <div>
                <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto">
                  <ShoppingBag size={30} />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mt-7">
                  Your cart is empty
                </h2>

                <p className="text-gray-500 max-w-md mx-auto mt-4 leading-7">
                  Looks like you haven't added anything to your
                  cart yet. Explore our collection and find your
                  perfect headphones.
                </p>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 mt-8 px-7 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                  Explore Products
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* CART CONTENT */
        <section className="px-6 md:px-10 lg:px-16 pb-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemId = item.id || item._id;
                const itemQuantity = Number(item.quantity || 1);
                const itemPrice = Number(item.price || 0);

                return (
                  <div
                    key={`${itemId}-${item.selectedColor || ""}`}
                    className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* IMAGE */}
                
{/* IMAGE */}
<Link
  to={`/product/${item.id || item._id}`}
  className="w-full sm:w-36 h-36 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center flex-shrink-0 overflow-hidden"
>
  <img
    src={getProductImage(item)}
    alt={item.name || "Headphones"}
    onError={(event) => {
      event.currentTarget.onerror = null;
      event.currentTarget.src = "/images/headphone17.png";
    }}
    className="w-full h-full object-contain p-4 hover:scale-105 transition duration-500"
  />
</Link>


                      {/* DETAILS */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-5">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-gray-600">
                              {item.category || "Headphones"}
                            </p>

                            <Link
                              to={`/product/${itemId}`}
                              className="block text-xl font-semibold mt-2 hover:text-gray-300 transition"
                            >
                              {item.name}
                            </Link>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                itemId,
                                item.selectedColor
                              )
                            }
                            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500/10 hover:text-red-400 transition flex-shrink-0"
                            aria-label="Remove product"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        {/* COLOR */}
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-sm text-gray-600">
                            Color:
                          </span>

                          <span className="text-sm text-gray-300">
                            {item.selectedColor ||
                              item.colors?.[0] ||
                              "Default"}
                          </span>
                        </div>

                        {/* PRICE AND QUANTITY */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-6">
                          {/* QUANTITY */}
                          <div className="inline-flex items-center w-fit border border-white/10 rounded-full overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  itemId,
                                  item.selectedColor
                                )
                              }
                              disabled={itemQuantity <= 1}
                              aria-label="Decrease quantity"
                              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition disabled:opacity-40"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="w-10 text-center text-sm">
                              {itemQuantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  itemId,
                                  item.selectedColor
                                )
                              }
                              disabled={
                                item.stock != null &&
                                itemQuantity >= Number(item.stock)
                              }
                              aria-label="Increase quantity"
                              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition disabled:opacity-40"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          {/* ITEM TOTAL */}
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-gray-600 mb-1">
                              Item Total
                            </p>

                            <p className="text-xl font-bold">
                              {formatPKR(itemPrice * itemQuantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <aside className="lg:sticky lg:top-28 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Order Summary
              </p>

              <h2 className="text-2xl font-bold mt-3">
                Checkout
              </h2>

              {/* SUBTOTAL */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-right">
                    {formatPKR(cartTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-500">Shipping</span>

                  <span className="font-medium text-right">
                    {shipping === 0 ? (
                      <span className="text-gray-300">Free</span>
                    ) : (
                      formatPKR(shipping)
                    )}
                  </span>
                </div>
              </div>

              {/* SHIPPING MESSAGE */}
              <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-black">
                <div className="flex gap-3">
                  <Truck
                    size={18}
                    className="text-gray-400 flex-shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-gray-500 leading-5">
                    {shipping === 0
                      ? "You've unlocked free shipping."
                      : `Add ${formatPKR(
                          FREE_SHIPPING_LIMIT - cartTotal
                        )} more to unlock free shipping.`}
                  </p>
                </div>
              </div>

              {/* TOTAL */}
              <div className="h-px bg-white/10 my-7" />

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Total</p>

                  <p className="text-xs text-gray-600 mt-1">
                    Taxes included
                  </p>
                </div>

                <span className="text-2xl md:text-3xl font-bold text-right">
                  {formatPKR(finalTotal)}
                </span>
              </div>

              {/* CHECKOUT */}
              <Link
                to="/checkout"
                className="mt-7 w-full flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              {/* SECURITY */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-5">
                <ShieldCheck size={15} />
                Secure checkout
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
