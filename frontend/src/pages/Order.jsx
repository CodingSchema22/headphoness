
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        // Currently logged-in account
        const savedUser = localStorage.getItem("soundx-user");

        if (!savedUser) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);
        const userEmail = user?.email?.toLowerCase().trim();

        if (!userEmail) {
          setOrders([]);
          setLoading(false);
          return;
        }

        // Read all saved orders
        const savedOrders = JSON.parse(
          localStorage.getItem("soundx-orders") || "[]"
        );

        // Only show orders belonging to this account
        const userOrders = Array.isArray(savedOrders)
          ? savedOrders.filter(
              (order) =>
                order.userEmail?.toLowerCase().trim() === userEmail
            )
          : [];

        setOrders(userOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();

    // Refresh orders when the browser tab becomes active
    window.addEventListener("focus", loadOrders);

    return () => {
      window.removeEventListener("focus", loadOrders);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <section className="px-6 md:px-10 lg:px-16 pt-14 pb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Account
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            My Orders
          </h1>

          <p className="text-gray-500 mt-4">
            Track and review your SoundX purchases.
          </p>
        </div>
      </section>

      {/* LOADING */}
      {loading ? (
        <section className="px-6 md:px-10 lg:px-16 pb-24">
          <div className="max-w-7xl mx-auto min-h-[300px] flex items-center justify-center">
            <p className="text-gray-400 animate-pulse">
              Loading your orders...
            </p>
          </div>
        </section>
      ) : orders.length === 0 ? (
        /* EMPTY ORDERS */
        <section className="px-6 md:px-10 lg:px-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[500px] rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center text-center px-6">
              <div>
                <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto">
                  <Package size={30} />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mt-7">
                  No orders yet
                </h2>

                <p className="text-gray-500 max-w-md mx-auto mt-4 leading-7">
                  You haven't placed any orders yet. Explore our
                  headphone collection and find something you love.
                </p>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 mt-8 px-7 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                >
                  Start Shopping
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ORDERS LIST */
        <section className="px-6 md:px-10 lg:px-16 pb-24">
          <div className="max-w-5xl mx-auto space-y-6">
            {orders.map((order, index) => {
              const orderNumber =
                order.orderNumber ||
                `SX-${String(orders.length - index).padStart(4, "0")}`;

              const orderDate = order.date
                ? new Date(order.date)
                : null;

              const formattedDate =
                orderDate && !Number.isNaN(orderDate.getTime())
                  ? orderDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently placed";

              const orderStatus = order.status || "Processing";
              const orderTotal = Number(order.total || 0);

              return (
                <article
                  key={order.id || orderNumber}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  {/* ORDER HEADER */}
                  <div className="p-6 md:p-7 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold">
                          Order {orderNumber}
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                          <CheckCircle2 size={13} />
                          {orderStatus}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                        <CalendarDays size={15} />
                        {formattedDate}
                      </div>
                    </div>

                    <div className="md:text-right">
                      <p className="text-xs text-gray-500">
                        Order Total
                      </p>

                      <p className="text-2xl font-bold mt-1">
                        ${orderTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="p-6 md:p-7">
                    <div className="space-y-5">
                      {(order.items || []).map((item, itemIndex) => (
                        <div
                          key={
                            `${item.id || item.name}-${item.selectedColor || ""}-${itemIndex}`
                          }
                          className="flex gap-4 items-center"
                        >
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
          
<img
  src={
    item.image ||
    item.imageUrl ||
    item.image_url ||
    item.product?.image ||
    "/images/headphone17.png"
  }
  alt={item.name || "Headphones"}
  className="w-full h-full object-contain p-2"
  onError={(event) => {
    const img = event.currentTarget;

    if (!img.dataset.fallbackTried) {
      img.dataset.fallbackTried = "true";
      img.src = "/images/headphone17.png";
    } else {
      img.onerror = null;
      img.style.visibility = "hidden";
    }
  }}
/>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">
                              {item.name || "Headphones"}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {item.selectedColor || "Default"} • Qty{" "}
                              {item.quantity || 1}
                            </p>
                          </div>

                          <p className="font-semibold text-sm flex-shrink-0">
                            $
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 1)
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* DELIVERY INFO */}
                    <div className="mt-7 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Truck size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            Delivery
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            2–5 business days
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ShoppingBag size={15} />
                        {(order.items || []).reduce(
                          (total, item) =>
                            total + Number(item.quantity || 1),
                          0
                        )}{" "}
                        item(s)
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Order;