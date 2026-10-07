
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
} from "lucide-react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";


const Home = () => {

  // Featured product
  const featuredProduct = products[0];


  return (
    <main className="bg-black text-white overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-80px)] flex items-center">

        {/* Background Glow */}

        <div className="
          absolute
          top-10
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-white/[0.04]
          blur-3xl
          pointer-events-none
        " />

        <div className="
          absolute
          left-0
          top-1/3
          w-72
          h-72
          rounded-full
          bg-blue-500/[0.05]
          blur-3xl
          pointer-events-none
        " />


        <div className="
          max-w-7xl
          mx-auto
          w-full
          px-6
          md:px-10
          lg:px-16
          py-20
        ">

          <div className="
            grid
            lg:grid-cols-2
            gap-14
            items-center
          ">


            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div className="relative z-10">

              {/* Badge */}

              <div className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                text-gray-300
                text-sm
                mb-8
              ">

                <Sparkles size={15} />

                Premium Audio Experience

              </div>


              {/* Heading */}

              <h1 className="
                text-5xl
                sm:text-6xl
                lg:text-7xl
                font-bold
                leading-[1.05]
                tracking-tight
              ">

                Sound that

                <span className="block text-gray-400">
                  moves you.
                </span>

              </h1>


              {/* Description */}

              <p className="
                mt-7
                text-gray-400
                text-base
                md:text-lg
                leading-8
                max-w-xl
              ">

                Experience powerful bass, crystal-clear vocals
                and all-day comfort with SoundX premium
                headphones.

              </p>


              {/* Buttons */}

              <div className="
                flex
                flex-col
                sm:flex-row
                gap-4
                mt-9
              ">

           <Link
  to="/products"
  className="
    group
    inline-flex
    items-center
    justify-center
    gap-3
    px-7
    py-4
    bg-white
    !text-black
    rounded-full
    font-semibold
    hover:bg-gray-200
    transition
  "
>
  <span className="!text-black">
    Explore Collection
  </span>

  <ArrowRight
    size={18}
    className="
      !text-black
      group-hover:translate-x-1
      transition
    "
  />
</Link>


                <Link
                  to={`/product/${featuredProduct.id}`}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    px-7
                    py-4
                    border
                    border-white/15
                    rounded-full
                    text-white
                    hover:bg-white
                    hover:text-black
                    transition
                  "
                >

                  <Play size={17} />

                  View Featured

                </Link>

              </div>


              {/* Trust Features */}

              <div className="
                flex
                flex-wrap
                items-center
                gap-6
                mt-10
                text-sm
                text-gray-500
              ">

                <div className="flex items-center gap-2">

                  <ShieldCheck size={17} />

                  1 Year Warranty

                </div>


                <div className="flex items-center gap-2">

                  <Truck size={17} />

                  Fast Delivery

                </div>


                <div className="flex items-center gap-2">

                  <Headphones size={17} />

                  Premium Quality

                </div>

              </div>

            </div>


            {/* =================================================
                HERO PRODUCT
            ================================================= */}

            <div className="
              relative
              flex
              items-center
              justify-center
            ">

              {/* Glow */}

              <div className="
                absolute
                w-[330px]
                h-[330px]
                md:w-[470px]
                md:h-[470px]
                rounded-full
                bg-white/[0.05]
                blur-3xl
              " />


              {/* Circle */}

              <div className="
                absolute
                w-[300px]
                h-[300px]
                md:w-[420px]
                md:h-[420px]
                rounded-full
                border
                border-white/10
              " />


              {/* Headphone */}

              <div className="
                relative
                z-10
                w-full
                max-w-[560px]
              ">

                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="
                    w-full
                    object-contain
                    drop-shadow-[0_30px_60px_rgba(255,255,255,0.12)]
                    hover:scale-105
                    transition
                    duration-700
                  "
                />

              </div>


              {/* Floating Product Card */}

              <div className="
                absolute
                bottom-4
                left-2
                md:left-8
                z-20
                bg-white/[0.07]
                backdrop-blur-xl
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
              ">

                <p className="
                  text-xs
                  text-gray-500
                  uppercase
                  tracking-widest
                ">
                  Featured
                </p>

                <p className="font-semibold mt-1">
                  {featuredProduct.name}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  ${featuredProduct.price.toFixed(2)}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="
        border-y
        border-white/10
        bg-white/[0.02]
      ">

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

          <div className="grid grid-cols-2 md:grid-cols-4">

            <div className="
              py-10
              text-center
              border-r
              border-white/10
            ">

              <h3 className="text-3xl md:text-4xl font-bold">
                10K+
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Happy Customers
              </p>

            </div>


            <div className="
              py-10
              text-center
              md:border-r
              border-white/10
            ">

              <h3 className="text-3xl md:text-4xl font-bold">
                4.8
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Average Rating
              </p>

            </div>


            <div className="
              py-10
              text-center
              border-r
              border-white/10
            ">

              <h3 className="text-3xl md:text-4xl font-bold">
                24H
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Fast Dispatch
              </p>

            </div>


            <div className="
              py-10
              text-center
            ">

              <h3 className="text-3xl md:text-4xl font-bold">
                1 Year
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Warranty
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="
        px-6
        md:px-10
        lg:px-16
        py-24
      ">

        <div className="max-w-7xl mx-auto">


          {/* Heading */}

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-6
            mb-12
          ">

            <div>

              <p className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
                mb-4
              ">
                Our Collection
              </p>

              <h2 className="
                text-4xl
                md:text-5xl
                font-bold
              ">
                Featured headphones
              </h2>

              <p className="
                text-gray-400
                mt-4
                max-w-xl
                leading-7
              ">
                Discover our most popular headphones,
                designed to deliver exceptional sound and
                everyday comfort.
              </p>

            </div>


            <Link
              to="/products"
              className="
                group
                flex
                items-center
                gap-2
                text-sm
                text-gray-400
                hover:text-white
                transition
              "
            >

              View all products

              <ArrowRight
                size={17}
                className="
                  group-hover:translate-x-1
                  transition
                "
              />

            </Link>

          </div>


          {/* Product Cards */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-7
          ">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY SOUNDX
      ===================================================== */}

      <section className="
        px-6
        md:px-10
        lg:px-16
        pb-24
      ">

        <div className="max-w-7xl mx-auto">


          <div className="
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.02]
            p-8
            md:p-14
          ">

            <div className="
              grid
              lg:grid-cols-2
              gap-12
              items-center
            ">


              {/* LEFT */}

              <div>

                <p className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-gray-500
                  mb-4
                ">
                  Why SoundX
                </p>

                <h2 className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  leading-tight
                ">

                  Designed for your
                  <span className="text-gray-500">
                    {" "}everyday sound.
                  </span>

                </h2>

                <p className="
                  text-gray-400
                  mt-6
                  leading-7
                  max-w-lg
                ">

                  We combine premium materials, powerful
                  audio technology and thoughtful design to
                  create headphones that feel as good as
                  they sound.

                </p>

              </div>


              {/* RIGHT FEATURES */}

              <div className="
                grid
                sm:grid-cols-2
                gap-5
              ">

                <div className="
                  p-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                ">

                  <Headphones
                    size={25}
                    className="mb-5"
                  />

                  <h3 className="font-semibold">
                    Premium Sound
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    mt-3
                    leading-6
                  ">
                    Detailed audio with deep and balanced
                    bass.
                  </p>

                </div>


                <div className="
                  p-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                ">

                  <ShieldCheck
                    size={25}
                    className="mb-5"
                  />

                  <h3 className="font-semibold">
                    Built to Last
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    mt-3
                    leading-6
                  ">
                    Quality materials made for everyday use.
                  </p>

                </div>


                <div className="
                  p-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                ">

                  <Truck
                    size={25}
                    className="mb-5"
                  />

                  <h3 className="font-semibold">
                    Fast Delivery
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    mt-3
                    leading-6
                  ">
                    Quick and reliable delivery to your door.
                  </p>

                </div>


                <div className="
                  p-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-black
                ">

                  <Sparkles
                    size={25}
                    className="mb-5"
                  />

                  <h3 className="font-semibold">
                    Modern Design
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    mt-3
                    leading-6
                  ">
                    Minimal design with maximum comfort.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="
        px-6
        md:px-10
        lg:px-16
        pb-24
      ">

        <div className="max-w-7xl mx-auto">

          <div className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-gradient-to-br
            from-gray-900
            via-gray-950
            to-black
            px-8
            py-16
            md:px-16
            text-center
          ">

            <div className="
              absolute
              w-80
              h-80
              bg-white/[0.04]
              rounded-full
              blur-3xl
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
            " />


            <div className="relative z-10">

              <p className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
              ">
                Your next listening experience
              </p>


              <h2 className="
                text-4xl
                md:text-5xl
                font-bold
                mt-5
              ">
                Ready to hear the difference?
              </h2>


              <p className="
                text-gray-400
                max-w-xl
                mx-auto
                mt-5
                leading-7
              ">
                Explore our premium collection and find
                the perfect headphones for your lifestyle.
              </p>


              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  gap-3
                  mt-8
                  px-8
                  py-4
                  bg-white
                  text-black
                  rounded-full
                  font-semibold
                  hover:bg-gray-200
                  transition
                "
              >

                Shop Now

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};


export default Home;