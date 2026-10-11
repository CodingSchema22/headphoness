
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

import { useCart } from "../context/CartContext";

// const API_URL = "http://localhost:5000/api";
const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const FREE_SHIPPING_LIMIT = 15000;
const SHIPPING_FEE = 500;

const formatPKR = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;

const inputClass =
  "w-full h-12 px-4 rounded-xl bg-black border border-white/10 outline-none text-sm text-white placeholder:text-gray-700 focus:border-white/30 transition";

const labelClass = "block text-sm text-gray-400 mb-2";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shipping =
    cartTotal >= FREE_SHIPPING_LIMIT || cartTotal === 0
      ? 0
      : SHIPPING_FEE;

  const finalTotal = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    if (!cartItems.length) {
      setError("Your cart is empty. Please add a product first.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim()
    ) {
      setError("Please complete all required shipping details.");
      return;
    }

    if (paymentMethod !== "Cash on Delivery") {
      setError(
        "Online card payments are not available yet. Please select Cash on Delivery."
      );
      return;
    }

    // Validate and prepare cart items
    const orderItems = [];

    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      const rawId = item.id || item._id;
      const productId =
        rawId && typeof rawId === "object"
          ? rawId._id || rawId.id
          : rawId;

      const quantity = Number(item.quantity);

      if (
        !productId ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        console.error("Invalid cart item:", index, item);

        setError(
          `Product ${item.name || index + 1} has missing or invalid details. Remove it from your cart and add it again.`
        );
        return;
      }

      orderItems.push({
        productId: String(productId),
        quantity,
      });
    }

    setLoading(true);

    try {
      const payload = {
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim(),
        },
        items: orderItems,
        paymentMethod,
      };

      console.log("Submitting order:", payload);
      console.log(
  "CHECKOUT CART DATA:",
  JSON.stringify(
    cartItems.map((item) => ({
      id: item.id,
      _id: item._id,
      productId: item.productId,
      quantity: item.quantity,
      name: item.name,
    })),
    null,
    2
  )
);

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success || !data.order) {
        console.error("Backend order error:", {
          status: response.status,
          response: data,
        });

        throw new Error(
          data.message ||
            `Order failed with status ${response.status}. Please check your product details.`
        );
      }

      // Save successful order to local order history
      try {
        const stored = JSON.parse(
          localStorage.getItem("soundx-orders") || "[]"
        );

        const existingOrders = Array.isArray(stored) ? stored : [];

        localStorage.setItem(
          "soundx-orders",
          JSON.stringify([
            data.order,
            ...existingOrders.filter(
              (order) =>
                order._id !== data.order._id &&
                order.orderNumber !== data.order.orderNumber
            ),
          ])
        );
      } catch (storageError) {
        console.error("Local order history update failed:", storageError);
      }

      clearCart();
      navigate("/orders", { replace: true });
    } catch (err) {
      console.error("Order placement error:", err);

      if (err instanceof TypeError) {
        setError(
          "Unable to connect to the backend. Make sure the server is running at http://localhost:5000."
        );
      } else {
        setError(
          err.message || "Unable to place your order. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Empty cart screen
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <section className="max-w-4xl mx-auto px-6 py-24">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 md:p-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white text-black flex items-center justify-center">
              <Package size={28} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mt-6">
              Your cart is empty
            </h1>

            <p className="text-gray-500 mt-3">
              Add some headphones before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Browse Products
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="px-6 md:px-10 lg:px-16 pt-14 pb-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Secure checkout
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Complete your order
            </h1>
          </div>
        </div>
      </section>

      {/* Checkout content */}
      <section className="px-6 md:px-10 lg:px-16 pb-36">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
          <form
            id="checkout-form"
            onSubmit={handlePlaceOrder}
            className="space-y-7"
          >
            {error && (
              <div
                role="alert"
                className="px-5 py-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm"
              >
                {error}
              </div>
            )}

            {/* Contact information */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                  <User size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">
                    Contact information
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    We&apos;ll use these details for your order.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className={labelClass}>
                    Phone number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03XX XXXXXXX"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                  <MapPin size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">Shipping address</h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="address" className={labelClass}>
                    Complete address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number, street, area..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 outline-none text-sm text-white placeholder:text-gray-700 focus:border-white/30 resize-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="city" className={labelClass}>
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Lahore"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className={labelClass}>
                      Postal code
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      autoComplete="postal-code"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="54000"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                  <CreditCard size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">Payment method</h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Select your preferred payment method.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Cash on Delivery",
                    description: "Pay when your order arrives.",
                    Icon: Truck,
                  },
                  {
                    name: "Credit / Debit Card",
                    description:
                      "Online card payment is not available yet.",
                    Icon: CreditCard,
                  },
                ].map(({ name, description, Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(name);
                      setError("");
                    }}
                    aria-pressed={paymentMethod === name}
                    className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left transition ${
                      paymentMethod === name
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {description}
                        </p>
                      </div>
                    </div>

                    {paymentMethod === name && (
                      <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {paymentMethod === "Credit / Debit Card" && (
                <p className="text-xs text-amber-400 mt-4 leading-5">
                  Online card payments are not connected yet.
                  Please select Cash on Delivery to place your order.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 px-2">
              <ShieldCheck size={17} />
              Your order will be saved in our database after successful placement.
            </div>
          </form>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <h2 className="text-xl font-semibold">Order summary</h2>

              <div className="mt-6 space-y-5">
                {cartItems.map((item, index) => {
                  const itemId =
                    item.id || item._id || `cart-item-${index}`;

                  return (
                    <div
                      key={`${itemId}-${item.selectedColor || ""}`}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-20 rounded-xl bg-black border border-white/10 flex items-center justify-center p-2 shrink-0">
                        <img
                          src={
                            item.image ||
                            "https://placehold.co/600x400?text=Headphones"
                          }
                          alt={item.name || "Headphones"}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              "https://placehold.co/600x400?text=Headphones";
                          }}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {item.name || "Headphones"}
                        </p>

                        {item.selectedColor && (
                          <p className="text-xs text-gray-600 mt-1">
                            Color: {item.selectedColor}
                          </p>
                        )}

                        <div className="flex items-center justify-between gap-3 mt-3">
                          <span className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-medium text-right">
                            {formatPKR(
                              Number(item.price || 0) *
                                Number(item.quantity || 1)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 my-6" />

              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-right">
                    {formatPKR(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : formatPKR(shipping)}
                  </span>
                </div>

                {shipping === 0 && cartTotal > 0 && (
                  <p className="text-xs text-gray-600">
                    Free shipping applied.
                  </p>
                )}

                {shipping > 0 && (
                  <p className="text-xs text-gray-600">
                    Add{" "}
                    {formatPKR(
                      Math.max(0, FREE_SHIPPING_LIMIT - cartTotal)
                    )}{" "}
                    more to unlock free shipping.
                  </p>
                )}
              </div>

              <div className="border-t border-white/10 mt-6 pt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-600">
                    Total
                  </p>
                  <p className="text-2xl md:text-3xl font-bold mt-2">
                    {formatPKR(finalTotal)}
                  </p>
                </div>
                <span className="text-xs text-gray-600">PKR</span>
              </div>
            </div>

            <div className="mt-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-3">
              <Truck size={18} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Fast delivery</p>
                <p className="text-xs text-gray-600 mt-1 leading-5">
                  Your order will be recorded after successful placement.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Fixed submit button */}
      <div className="fixed bottom-0 left-0 right-0 z-[99999] border-t border-white/20 bg-black p-4 shadow-2xl">
        <button
          type="submit"
          form="checkout-form"
          disabled={
            loading || paymentMethod !== "Cash on Delivery"
          }
          className="mx-auto flex w-full max-w-7xl min-h-14 items-center justify-center gap-2 rounded-full bg-white px-5 font-bold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Placing order..."
            : `Submit Order · ${formatPKR(finalTotal)}`}
          {!loading && <ArrowRight size={18} />}
        </button>
      </div>
    </main>
  );
};

export default Checkout;