import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    toggleFavourite,
    isFavourite,
  } = useFavourite();

  const product = products.find(
    (item) => item.id === id
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <main className="min-h-[70vh] bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
            404
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-4">
            Sorry, this product does not exist.
          </p>

          <Link
            to="/products"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              px-6
              py-3
              rounded-full
              bg-white
              !text-black
              font-semibold
              hover:bg-gray-200
              transition
            "
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

        </div>
      </main>
    );
  }

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        selectedColor,
      });
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // =====================================================
  // QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  // =====================================================
  // FAVOURITE
  // =====================================================

  const favourite = isFavourite(product.id);

  const handleFavourite = () => {
    toggleFavourite(product);
  };

  // =====================================================
  // RELATED PRODUCTS
  // =====================================================

  const relatedProducts = products.filter(
    (item) => item.id !== product.id
  );

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =================================================
          TOP
      ================================================= */}

      <section className="px-6 md:px-10 lg:px-16 pt-10">

        <div className="max-w-7xl mx-auto">

          <Link
            to="/products"
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
            Back to Products
          </Link>

        </div>

      </section>


      {/* =================================================
          PRODUCT DETAILS
      ================================================= */}

      <section className="px-6 md:px-10 lg:px-16 py-12 md:py-16">

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            lg:gap-20
            items-start
          "
        >

          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            className="
              relative
              min-h-[450px]
              md:min-h-[600px]
              rounded-3xl
              bg-gradient-to-br
              from-gray-900
              via-gray-950
              to-black
              border
              border-white/10
              flex
              items-center
              justify-center
              p-10
              overflow-hidden
            "
          >

            {/* Sale */}

            <div
              className="
                absolute
                top-6
                left-6
                z-10
                px-4
                py-2
                rounded-full
                bg-white
                text-black
                text-xs
                font-bold
                tracking-wide
              "
            >
              SALE
            </div>


            {/* Favourite */}

            <button
              type="button"
              onClick={handleFavourite}
              aria-label="Favourite product"
              className={`
                absolute
                top-6
                right-6
                z-10
                w-11
                h-11
                rounded-full
                border
                flex
                items-center
                justify-center
                transition

                ${
                  favourite
                    ? "bg-white text-black border-white"
                    : "bg-black/50 text-white border-white/10 hover:bg-white hover:text-black"
                }
              `}
            >
              <Heart
                size={19}
                fill={
                  favourite
                    ? "currentColor"
                    : "none"
                }
              />
            </button>


            {/* Image */}

            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-full
                max-h-[520px]
                object-contain
                hover:scale-105
                transition
                duration-700
              "
            />

          </div>


          {/* =================================================
              INFORMATION
          ================================================= */}

          <div className="pt-2">

            {/* Category */}

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
              "
            >
              {product.category}
            </p>


            {/* Name */}

            <h1
              className="
                text-4xl
                md:text-5xl
                font-bold
                tracking-tight
                mt-4
              "
            >
              {product.name}
            </h1>


            {/* Rating */}

            <div className="
              flex
              items-center
              gap-2
              mt-5
            ">

              <Star
                size={17}
                fill="currentColor"
              />

              <span className="font-medium">
                {product.rating}
              </span>

              <span className="text-gray-600">
                •
              </span>

              <span className="text-gray-500">
                {product.reviews} Reviews
              </span>

            </div>


            {/* Price */}

            <div className="
              flex
              items-center
              gap-4
              mt-7
            ">

              <span className="text-4xl font-bold">
                ${product.price.toFixed(2)}
              </span>

              <span className="
                text-gray-600
                line-through
                text-lg
              ">
                ${product.oldPrice.toFixed(2)}
              </span>

            </div>


            {/* Description */}

            <p className="
              text-gray-400
              leading-7
              mt-7
              max-w-xl
            ">
              {product.description}
            </p>


            {/* Divider */}

            <div className="
              h-px
              bg-white/10
              my-8
            " />


            {/* =================================================
                COLORS
            ================================================= */}

            <div>

              <div className="
                flex
                items-center
                justify-between
                mb-4
              ">

                <p className="text-sm font-semibold">
                  Select Color
                </p>

                <span className="text-sm text-gray-500">
                  {selectedColor}
                </span>

              </div>


              <div className="flex flex-wrap gap-3">

                {product.colors.map((color) => (

                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`
                      px-5
                      py-2.5
                      rounded-full
                      border
                      text-sm
                      transition

                      ${
                        selectedColor === color
                          ? "bg-white text-black border-white"
                          : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }
                    `}
                  >
                    {color}
                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                QUANTITY
            ================================================= */}

            <div className="mt-7">

              <p className="
                text-sm
                font-semibold
                mb-4
              ">
                Quantity
              </p>

              <div className="
                inline-flex
                items-center
                border
                border-white/10
                rounded-full
                overflow-hidden
              ">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="
                    w-11
                    h-11
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-white
                    hover:text-black
                    transition
                  "
                >
                  <Minus size={16} />
                </button>

                <span className="
                  w-12
                  text-center
                  font-semibold
                ">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="
                    w-11
                    h-11
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-white
                    hover:text-black
                    transition
                  "
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="
              flex
              flex-col
              sm:flex-row
              gap-3
              mt-8
            ">

              <button
                type="button"
                onClick={handleAddToCart}
                className={`
                  flex-1
                  py-4
                  rounded-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-semibold
                  transition

                  ${
                    added
                      ? "bg-white text-black"
                      : "bg-white text-black hover:bg-gray-200"
                  }
                `}
              >

                {added ? (
                  <>
                    <Check size={18} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </>
                )}

              </button>


              <Link
                to="/cart"
                className="
                  flex-1
                  py-4
                  rounded-full
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  font-semibold
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                View Cart
              </Link>

            </div>


            {/* =================================================
                INFO
            ================================================= */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              mt-8
            ">

              <div className="
                p-5
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
              ">

                <Truck size={20} />

                <p className="font-semibold mt-3">
                  Fast Delivery
                </p>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Quick and reliable shipping.
                </p>

              </div>


              <div className="
                p-5
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
              ">

                <ShieldCheck size={20} />

                <p className="font-semibold mt-3">
                  1 Year Warranty
                </p>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">
                  Product protection included.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="
        border-t
        border-white/10
        px-6
        md:px-10
        lg:px-16
        py-16
      ">

        <div className="max-w-7xl mx-auto">

          <p className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-gray-500
          ">
            Product Features
          </p>

          <h2 className="
            text-3xl
            md:text-4xl
            font-bold
            mt-3
          ">
            Built for better listening.
          </h2>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            mt-10
          ">

            {product.features.map((feature) => (

              <div
                key={feature}
                className="
                  p-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >

                <Check size={18} />

                <p className="
                  mt-4
                  text-sm
                  font-medium
                ">
                  {feature}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      {relatedProducts.length > 0 && (
        <section className="
          px-6
          md:px-10
          lg:px-16
          py-16
          border-t
          border-white/10
        ">

          <div className="max-w-7xl mx-auto">

            <div className="
              flex
              flex-col
              md:flex-row
              md:items-end
              md:justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-gray-500
                ">
                  You may also like
                </p>

                <h2 className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mt-3
                ">
                  More from SoundX
                </h2>

              </div>

              <Link
                to="/products"
                className="
                  text-sm
                  text-gray-400
                  hover:text-white
                  transition
                "
              >
                View All →
              </Link>

            </div>


            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-7
              mt-10
            ">

              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}

            </div>

          </div>

        </section>
      )}

    </main>
  );
};

export default ProductDetails;