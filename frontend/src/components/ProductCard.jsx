
import React from "react";
import { getProductImage } from "../data/imageMap";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems = [] } = useCart();
  const { toggleFavourite, isFavourite } = useFavourite();

  const productId = product.id || product._id;

  const isInCart = cartItems.some(
    (item) => (item.id || item._id) === productId
  );

  const favourite = isFavourite(productId);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: productId,
    });
  };

  const handleFavourite = () => {
    toggleFavourite({
      ...product,
      id: productId,
    });
  };

  const price = Number(product.price ?? 0);
  const oldPrice =
    product.oldPrice != null ? Number(product.oldPrice) : null;

  return (
    <div className="group bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
      {/* Product Image */}
      <div className="relative h-[350px] bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        {oldPrice !== null && oldPrice > price && (
          <div className="absolute top-5 left-5 z-20 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full">
            SALE
          </div>
        )}

        {/* Favourite Button */}
        <button
          type="button"
          onClick={handleFavourite}
          aria-label={
            favourite ? "Remove from favourites" : "Add to favourites"
          }
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <Heart
            size={18}
            fill={favourite ? "currentColor" : "none"}
          />
        </button>

        {/* Single Product Image */}
        <Link
          to={`/product/${productId}`}
          className="w-full h-full flex items-center justify-center p-10"
        >
          <img
  src={getProductImage(product)}
  alt={product.name || "Headphones"}
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/images/headphone15.png";
  }}
  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
/>
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
          {product.category || "Headphones"}
        </p>

        <Link to={`/product/${productId}`}>
          <h3 className="text-xl font-semibold hover:text-gray-300 transition">
            {product.name || "Unnamed Headphone"}
          </h3>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-400 mt-1">
            {product.brand}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <Star size={15} fill="currentColor" />
          <span className="text-sm">{product.rating ?? "New"}</span>
          <span className="text-gray-600">•</span>
          <span className="text-sm text-gray-500">
            {product.reviews ?? 0} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          <span className="text-2xl font-bold">
            Rs. {price.toLocaleString("en-PK")}
          </span>

          {oldPrice !== null && oldPrice > price && (
            <span className="text-gray-600 line-through text-sm">
              Rs. {oldPrice.toLocaleString("en-PK")}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <p
            className={`text-xs mt-3 ${
              product.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>
        )}

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock !== undefined && product.stock <= 0}
          className={`w-full mt-6 py-3.5 px-5 rounded-full flex items-center justify-center gap-2 font-medium transition-all duration-300 border border-white/10 ${
            product.stock !== undefined && product.stock <= 0
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : isInCart
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-white/10 text-white hover:bg-white hover:text-black"
          }`}
        >
          <ShoppingCart size={18} className="shrink-0" />
          <span>
            {product.stock !== undefined && product.stock <= 0
              ? "Out of Stock"
              : isInCart
              ? "Add Another"
              : "Add to Cart"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;