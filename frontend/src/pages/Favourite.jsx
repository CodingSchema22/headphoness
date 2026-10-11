import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Trash2,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { useFavourite } from "../context/FavouriteContext";

const Favourite = () => {
  const {
    favourites,
    clearFavourites,
  } = useFavourite();


  return (
    <main className="min-h-screen bg-black text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="px-6 md:px-10 lg:px-16 pt-14 pb-10">

        <div className="max-w-7xl mx-auto">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-6
          ">

            <div>

              <p className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
              ">
                Your Collection
              </p>

              <h1 className="
                text-4xl
                md:text-5xl
                font-bold
                mt-3
              ">
                Favourite
              </h1>

              <p className="
                text-gray-500
                mt-4
              ">
                Products you've saved for later.
              </p>

            </div>


            {/* CLEAR */}

            {favourites.length > 0 && (
              <button
                type="button"
                onClick={clearFavourites}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                  hover:text-red-400
                  transition
                  w-fit
                "
              >
                <Trash2 size={16} />
                Clear Favourites
              </button>
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {favourites.length === 0 ? (

        <section className="
          px-6
          md:px-10
          lg:px-16
          pb-24
        ">

          <div className="max-w-7xl mx-auto">

            <div
              className="
                min-h-[500px]
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.02]
                flex
                items-center
                justify-center
                text-center
                px-6
              "
            >

              <div>

                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    bg-white/[0.05]
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    mx-auto
                  "
                >
                  <Heart size={30} />
                </div>


                <h2 className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  mt-7
                ">
                  No favourites yet
                </h2>


                <p className="
                  text-gray-500
                  max-w-md
                  mx-auto
                  mt-4
                  leading-7
                ">
                  Save your favourite headphones here so
                  you can easily find them later.
                </p>


                <Link
                  to="/products"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    mt-8
                    px-7
                    py-4
                    rounded-full
                    bg-white
                    text-black
                    font-semibold
                    hover:bg-gray-200
                    transition
                  "
                >
                  Explore Products
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </section>

      ) : (

        /* ===================================================
           FAVOURITE PRODUCTS
        =================================================== */

        <section className="
          px-6
          md:px-10
          lg:px-16
          pb-24
        ">

          <div className="max-w-7xl mx-auto">

            <div className="
              flex
              items-center
              justify-between
              mb-8
            ">

              <p className="text-sm text-gray-500">
                {favourites.length}{" "}
                {favourites.length === 1
                  ? "product"
                  : "products"}{" "}
                saved
              </p>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-7
              "
            >

              {favourites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          </div>

        </section>

      )}

    </main>
  );
};

export default Favourite;