import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const { toggleFavourite, isFavourite } = useFavourite();

  // =====================================================
  // CHECK IF PRODUCT IS ALREADY IN CART
  // =====================================================

  const isInCart = cartItems.some(
    (item) => item.id === product.id
  );

  // =====================================================
  // CHECK FAVOURITE
  // =====================================================

  const favourite = isFavourite(product.id);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    addToCart(product);
  };

  // =====================================================
  // FAVOURITE
  // =====================================================

  const handleFavourite = () => {
    toggleFavourite(product);
  };

  return (
    <div
      className="
        group
        bg-white/[0.04]
        border border-white/10
        rounded-3xl
        overflow-hidden
        hover:border-white/20
        transition-all
        duration-500
      "
    >
      {/* =================================================
          PRODUCT IMAGE
      ================================================= */}

      <div
        className="
          relative
          h-[350px]
          bg-gradient-to-br
          from-gray-900
          via-gray-950
          to-black
        "
      >
        {/* SALE BADGE */}

        <div
          className="
            absolute
            top-5
            left-5
            z-20
            bg-white
            !text-black
            text-xs
            font-semibold
            px-3
            py-1.5
            rounded-full
          "
        >
          SALE
        </div>

        {/* =================================================
            FAVOURITE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleFavourite}
          aria-label="Add to favourites"
          className="
            absolute
            top-5
            right-5
            z-20
            w-10
            h-10
            rounded-full
            !bg-black/50
            border
            border-white/10
            flex
            items-center
            justify-center
            !text-white
            hover:!bg-white
            hover:!text-black
            transition-all
            duration-300
          "
        >
          <Heart
            size={18}
            fill={favourite ? "currentColor" : "none"}
          />
        </button>

        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

        <Link
          to={`/product/${product.id}`}
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
            p-10
          "
        >
          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-full
              object-contain
              group-hover:scale-110
              transition-transform
              duration-700
            "
          />
        </Link>
      </div>

      {/* =================================================
          PRODUCT INFORMATION
      ================================================= */}

      <div className="p-6">
        {/* CATEGORY */}

        <p
          className="
            text-xs
            uppercase
            tracking-widest
            text-gray-500
            mb-2
          "
        >
          {product.category}
        </p>

        {/* PRODUCT NAME */}

        <Link to={`/product/${product.id}`}>
          <h3
            className="
              text-xl
              font-semibold
              hover:text-gray-300
              transition
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* =================================================
            RATING
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            mt-3
          "
        >
          <Star
            size={15}
            fill="currentColor"
          />

          <span className="text-sm">
            {product.rating}
          </span>

          <span className="text-gray-600">
            •
          </span>

          <span className="text-sm text-gray-500">
            {product.reviews} reviews
          </span>
        </div>

        {/* =================================================
            PRICE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
            mt-5
          "
        >
          <span
            className="
              text-2xl
              font-bold
            "
          >
            ${product.price.toFixed(2)}
          </span>

          <span
            className="
              text-gray-600
              line-through
              text-sm
            "
          >
            ${product.oldPrice.toFixed(2)}
          </span>
        </div>

        {/* =================================================
            ADD TO CART
        ================================================= */}

        <button
          type="button"
          onClick={handleAddToCart}
          className={`
            w-full
            mt-6
            py-3.5
            px-5
            rounded-full
            flex
            items-center
            justify-center
            gap-2
            font-medium
            transition-all
            duration-300
            border
            border-white/10

            ${
              isInCart
                ? "!bg-white !text-black hover:!bg-gray-200 hover:!text-black"
                : "!bg-white/10 !text-white hover:!bg-white hover:!text-black"
            }
          `}
        >
          <ShoppingCart
            size={18}
            className="
              text-current
              shrink-0
            "
          />

          <span>
            {isInCart ? "Add Another" : "Add to Cart"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;