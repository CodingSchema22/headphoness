
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";


// =====================================================
// PRODUCTS PAGE
// =====================================================

const Products = () => {

  const { cartCount } = useCart();


  return (
    <main className="min-h-screen bg-black text-white">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section className="px-6 md:px-10 lg:px-16 pt-16 pb-12">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            {/* LEFT */}

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                SoundX Collection
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Explore Our Products
              </h1>

              <p className="text-gray-400 mt-5 max-w-2xl leading-7">
                Discover premium headphones engineered for
                powerful sound, lasting comfort and an immersive
                listening experience.
              </p>

            </div>


            {/* CART */}

            <Link
              to="/cart"
              className="
                group
                flex
                items-center
                justify-center
                gap-3
                w-fit
                px-6
                py-3.5
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                hover:bg-white
                hover:text-black
                transition
              "
            >

              <ShoppingCart size={18} />

              <span>
                Cart
              </span>

              {cartCount > 0 && (
                <span className="font-bold">
                  ({cartCount})
                </span>
              )}

              <ArrowRight
                size={17}
                className="
                  group-hover:translate-x-1
                  transition
                "
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =================================================
          PRODUCTS GRID
      ================================================= */}

      <section className="px-6 md:px-10 lg:px-16 pb-24">

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-7
          "
        >

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

    </main>
  );
};


export default Products;
