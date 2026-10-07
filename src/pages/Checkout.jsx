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

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // =====================================================
  // SHIPPING
  // =====================================================

  const shipping =
    cartTotal >= 150 ? 0 : 10;

  const finalTotal =
    cartTotal + shipping;


  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };


  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    setError("");


    // Empty cart protection

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }


    // Required fields

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      setError(
        "Please complete all required shipping details."
      );
      return;
    }


    setLoading(true);


    setTimeout(() => {

      const existingOrders = JSON.parse(
        localStorage.getItem("soundx-orders") || "[]"
      );


      const newOrder = {
        id: `SX-${Date.now()}`,

        date: new Date().toISOString(),

        status: "Processing",

        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },

        paymentMethod,

        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor || null,
        })),

        subtotal: Number(cartTotal.toFixed(2)),

        shipping,

        total: Number(finalTotal.toFixed(2)),
      };


      localStorage.setItem(
        "soundx-orders",
        JSON.stringify([
          newOrder,
          ...existingOrders,
        ])
      );


      clearCart();

      setLoading(false);

      navigate("/orders");

    }, 800);
  };


  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">

        <section className="max-w-4xl mx-auto px-6 py-24">

          <div
            className="
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.03]
              p-10
              md:p-16
              text-center
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-full
                bg-white
                text-black
                flex
                items-center
                justify-center
              "
            >
              <Package size={28} />
            </div>

            <h1 className="
              text-3xl
              md:text-4xl
              font-bold
              mt-6
            ">
              Your cart is empty
            </h1>

            <p className="
              text-gray-500
              mt-3
            ">
              Add some headphones before proceeding
              to checkout.
            </p>

            <Link
              to="/products"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                px-6
                py-3.5
                rounded-full
                bg-white
                text-black
                font-medium
                hover:bg-gray-200
                transition
              "
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

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="
        px-6
        md:px-10
        lg:px-16
        pt-14
        pb-10
      ">

        <div className="max-w-7xl mx-auto">

          <Link
            to="/cart"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-gray-500
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <div className="mt-7">

            <p className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-gray-500
            ">
              Secure checkout
            </p>

            <h1 className="
              text-4xl
              md:text-5xl
              font-bold
              mt-3
            ">
              Complete your order
            </h1>

          </div>

        </div>

      </section>


      {/* =================================================
          CHECKOUT
      ================================================= */}

      <section className="
        px-6
        md:px-10
        lg:px-16
        pb-24
      ">

        <div className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[1fr_400px]
          gap-8
        ">


          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <form
            onSubmit={handlePlaceOrder}
            className="space-y-7"
          >

            {/* ERROR */}

            {error && (
              <div
                className="
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  text-red-400
                  text-sm
                "
              >
                {error}
              </div>
            )}


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div
              className="
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-6
                md:p-8
              "
            >

              <div className="
                flex
                items-center
                gap-3
                mb-7
              ">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                ">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Contact information
                  </h2>

                  <p className="
                    text-xs
                    text-gray-600
                    mt-1
                  ">
                    We'll use these details for your order.
                  </p>
                </div>

              </div>


              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
              ">

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="
                      block
                      text-sm
                      text-gray-400
                      mb-2
                    "
                  >
                    Full name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      bg-black
                      border
                      border-white/10
                      outline-none
                      text-sm
                      text-white
                      placeholder:text-gray-700
                      focus:border-white/30
                      transition
                    "
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="
                      block
                      text-sm
                      text-gray-400
                      mb-2
                    "
                  >
                    Email address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="
                      w-full
                      h-12
                      px-4
                      rounded-xl
                      bg-black
                      border
                      border-white/10
                      outline-none
                      text-sm
                      text-white
                      placeholder:text-gray-700
                      focus:border-white/30
                      transition
                    "
                  />

                </div>


                {/* PHONE */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="phone"
                    className="
                      block
                      text-sm
                      text-gray-400
                      mb-2
                    "
                  >
                    Phone number *
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-600
                      "
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03XX XXXXXXX"
                      className="
                        w-full
                        h-12
                        pl-11
                        pr-4
                        rounded-xl
                        bg-black
                        border
                        border-white/10
                        outline-none
                        text-sm
                        text-white
                        placeholder:text-gray-700
                        focus:border-white/30
                        transition
                      "
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                SHIPPING ADDRESS
            ================================================= */}

            <div
              className="
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-6
                md:p-8
              "
            >

              <div className="
                flex
                items-center
                gap-3
                mb-7
              ">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                ">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Shipping address
                  </h2>

                  <p className="
                    text-xs
                    text-gray-600
                    mt-1
                  ">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>


              <div className="space-y-5">

                {/* ADDRESS */}

                <div>

                  <label
                    htmlFor="address"
                    className="
                      block
                      text-sm
                      text-gray-400
                      mb-2
                    "
                  >
                    Complete address *
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number, street, area..."
                    rows="3"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      bg-black
                      border
                      border-white/10
                      outline-none
                      text-sm
                      text-white
                      placeholder:text-gray-700
                      focus:border-white/30
                      resize-none
                      transition
                    "
                  />

                </div>


                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                ">

                  {/* CITY */}

                  <div>

                    <label
                      htmlFor="city"
                      className="
                        block
                        text-sm
                        text-gray-400
                        mb-2
                      "
                    >
                      City *
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Lahore"
                      className="
                        w-full
                        h-12
                        px-4
                        rounded-xl
                        bg-black
                        border
                        border-white/10
                        outline-none
                        text-sm
                        text-white
                        placeholder:text-gray-700
                        focus:border-white/30
                        transition
                      "
                    />

                  </div>


                  {/* POSTAL CODE */}

                  <div>

                    <label
                      htmlFor="postalCode"
                      className="
                        block
                        text-sm
                        text-gray-400
                        mb-2
                      "
                    >
                      Postal code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="54000"
                      className="
                        w-full
                        h-12
                        px-4
                        rounded-xl
                        bg-black
                        border
                        border-white/10
                        outline-none
                        text-sm
                        text-white
                        placeholder:text-gray-700
                        focus:border-white/30
                        transition
                      "
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                PAYMENT
            ================================================= */}

            <div
              className="
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-6
                md:p-8
              "
            >

              <div className="
                flex
                items-center
                gap-3
                mb-7
              ">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                ">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Payment method
                  </h2>

                  <p className="
                    text-xs
                    text-gray-600
                    mt-1
                  ">
                    Select how you'd like to pay.
                  </p>
                </div>

              </div>


              <div className="space-y-3">

                {/* COD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod(
                      "Cash on Delivery"
                    )
                  }
                  className={`
                    w-full
                    p-4
                    rounded-2xl
                    border
                    flex
                    items-center
                    justify-between
                    text-left
                    transition
                    ${
                      paymentMethod ===
                      "Cash on Delivery"
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                >

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/5
                      flex
                      items-center
                      justify-center
                    ">
                      <Truck size={18} />
                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        Cash on Delivery
                      </p>

                      <p className="
                        text-xs
                        text-gray-600
                        mt-1
                      ">
                        Pay when your order arrives.
                      </p>

                    </div>

                  </div>


                  {paymentMethod ===
                    "Cash on Delivery" && (
                    <div className="
                      w-6
                      h-6
                      rounded-full
                      bg-white
                      text-black
                      flex
                      items-center
                      justify-center
                    ">
                      <Check size={14} />
                    </div>
                  )}

                </button>


                {/* CARD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod(
                      "Credit / Debit Card"
                    )
                  }
                  className={`
                    w-full
                    p-4
                    rounded-2xl
                    border
                    flex
                    items-center
                    justify-between
                    text-left
                    transition
                    ${
                      paymentMethod ===
                      "Credit / Debit Card"
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                >

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/5
                      flex
                      items-center
                      justify-center
                    ">
                      <CreditCard size={18} />
                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        Credit / Debit Card
                      </p>

                      <p className="
                        text-xs
                        text-gray-600
                        mt-1
                      ">
                        Secure card payment.
                      </p>

                    </div>

                  </div>


                  {paymentMethod ===
                    "Credit / Debit Card" && (
                    <div className="
                      w-6
                      h-6
                      rounded-full
                      bg-white
                      text-black
                      flex
                      items-center
                      justify-center
                    ">
                      <Check size={14} />
                    </div>
                  )}

                </button>

              </div>

            </div>


            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="
              flex
              items-center
              gap-3
              text-xs
              text-gray-600
              px-2
            ">

              <ShieldCheck size={17} />

              Your information is protected and
              securely handled.

            </div>


            {/* MOBILE PLACE ORDER */}

            <button
              type="submit"
              disabled={loading}
              className="
                lg:hidden
                w-full
                h-14
                rounded-full
                bg-white
                text-black
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-gray-200
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
              "
            >

              {loading
                ? "Placing order..."
                : `Place Order • $${finalTotal.toFixed(2)}`}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>


          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-28 h-fit">

            <div
              className="
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-6
                md:p-7
              "
            >

              <h2 className="
                text-xl
                font-semibold
              ">
                Order summary
              </h2>


              {/* PRODUCTS */}

              <div className="
                mt-6
                space-y-5
              ">

                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}`}
                    className="
                      flex
                      gap-4
                    "
                  >

                    <div className="
                      w-20
                      h-20
                      rounded-xl
                      bg-black
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      p-2
                      shrink-0
                    ">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-contain
                        "
                      />

                    </div>


                    <div className="min-w-0 flex-1">

                      <p className="
                        text-sm
                        font-medium
                        truncate
                      ">
                        {item.name}
                      </p>

                      {item.selectedColor && (
                        <p className="
                          text-xs
                          text-gray-600
                          mt-1
                        ">
                          {item.selectedColor}
                        </p>
                      )}

                      <div className="
                        flex
                        items-center
                        justify-between
                        mt-3
                      ">

                        <span className="
                          text-xs
                          text-gray-500
                        ">
                          Qty: {item.quantity}
                        </span>

                        <span className="
                          text-sm
                          font-medium
                        ">
                          $
                          {(
                            Number(item.price) *
                            item.quantity
                          ).toFixed(2)}
                        </span>

                      </div>

                    </div>

                  </div>
                ))}

              </div>


              {/* DIVIDER */}

              <div className="
                border-t
                border-white/10
                my-6
              " />


              {/* TOTALS */}

              <div className="space-y-4">

                <div className="
                  flex
                  justify-between
                  text-sm
                ">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>


                <div className="
                  flex
                  justify-between
                  text-sm
                ">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span>
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>


                {shipping === 0 && (
                  <p className="
                    text-xs
                    text-gray-600
                  ">
                    Free shipping applied on orders
                    over $150.
                  </p>
                )}

              </div>


              <div className="
                border-t
                border-white/10
                mt-6
                pt-6
                flex
                items-end
                justify-between
              ">

                <div>

                  <p className="
                    text-xs
                    uppercase
                    tracking-widest
                    text-gray-600
                  ">
                    Total
                  </p>

                  <p className="
                    text-3xl
                    font-bold
                    mt-1
                  ">
                    ${finalTotal.toFixed(2)}
                  </p>

                </div>

                <span className="
                  text-xs
                  text-gray-600
                ">
                  USD
                </span>

              </div>


              {/* DESKTOP BUTTON */}

              <button
                type="submit"
                form=""
                onClick={handlePlaceOrder}
                disabled={loading}
                className="
                  hidden
                  lg:flex
                  w-full
                  h-13
                  mt-7
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  items-center
                  justify-center
                  gap-2
                  hover:bg-gray-200
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition
                "
              >

                {loading
                  ? "Placing order..."
                  : "Place Order"}

                {!loading && (
                  <ArrowRight size={17} />
                )}

              </button>

            </div>


            {/* FREE SHIPPING */}

            <div className="
              mt-4
              p-5
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              flex
              items-start
              gap-3
            ">

              <Truck
                size={18}
                className="text-gray-400 mt-0.5"
              />

              <div>

                <p className="
                  text-sm
                  font-medium
                ">
                  Fast delivery
                </p>

                <p className="
                  text-xs
                  text-gray-600
                  mt-1
                  leading-5
                ">
                  Your order will be prepared
                  immediately after confirmation.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
};

export default Checkout;