import React from "react";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 120,
      tag: "HOT",
      image: "/images/headphone11.png",
    },
    {
      id: 2,
      name: "Gaming Headset",
      price: 150,
      tag: "NEW",
      image: "/images/headphone13.png",
    },
    {
      id: 3,
      name: "Studio Headphones",
      price: 200,
      tag: "PRO",
      image: "/images/headphone22.png",
    },
    {
      id: 4,
      name: "Bluetooth Earbuds",
      price: 90,
      tag: "SALE",
      image: "/images/headphone11.png",
    },
    {
      id: 4,
      name: "Bluetooth Earbuds",
      price: 90,
      tag: "SALE",
      image: "/images/headphone11.png",
    }
    ,{
      id: 4,
      name: "Bluetooth Earbuds",
      price: 90,
      tag: "SALE",
      image: "/images/headphone11.png",
    }
    ,{
      id: 4,
      name: "Bluetooth Earbuds",
      price: 90,
      tag: "SALE",
      image: "/images/headphone11.png",
    }
  ];

  return (
    <>
    <section id="Produts">
    <div className="bg-gradient-to-b from-black via-gray-950 to-black text-white min-h-screen">

      {/* TITLE */}
      <div className="px-6 md:px-16 pt-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Premium Collection
        </h1>
        <p className="text-gray-400 mt-2">
          Discover high-quality sound experience products
        </p>
      </div>

      {/* GRID */}
      <div className="px-6 md:px-16 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl transition duration-300"
          >

            {/* TAG */}
            <div className="absolute top-3 left- z-10 bg-white text-black text-xs px-3 py-1 rounded-full font-semibold">
              {item.tag}
            </div>

            {/* IMAGE */}
            <div className="h-[240px] flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                className="h-[80%] object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-2"
                alt={item.name}
              />
            </div>

            {/* INFO */}
            <div className="p-1">
              <h2 className="text-lg font-semibold tracking-tight">
                {item.name}
              </h2>

              <p className="text-gray-400 mt-1 text-sm">
                Premium sound experience
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-bold">${item.price}</span>

                <div className="flex items-center text-yellow-400 text-sm">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} className="opacity-40" />
                </div>
              </div>
            </div>

            {/* HOVER OVERLAY */}
            <div
             className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition duration-300"
             >

              {/* ADD TO CART */}
              <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              {/* ICON ACTIONS */}
              <div className="flex gap-6">

                <button className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 transition hover:scale-110">
                  <Heart size={20} />
                </button>

                <button className="p-2 rounded-full bg-white/10 hover:bg-yellow-500/20 hover:text-yellow-400 transition hover:scale-110">
                  <Star size={20} />
                </button>

                <button className="p-2 rounded-full bg-white/10 hover:bg-blue-500/20 hover:text-blue-400 transition hover:scale-110">
                  <Eye size={20} />
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
    </section>
    </>
  );
};

export default Products;