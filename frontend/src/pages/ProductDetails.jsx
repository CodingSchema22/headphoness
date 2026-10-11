
import React, { useEffect, useState } from "react";

import { getProductImage } from "../data/imageMap";

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

import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useFavourite } from "../context/FavouriteContext";

const API_URL = "http://localhost:5000/api/products";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourite();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Fetch products from MongoDB through Express API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to fetch products.");
        }

        const allProducts = (data.products || []).map((item) => ({
          ...item,
          id: item._id || item.id,
        }));

        const currentProduct = allProducts.find(
          (item) => String(item.id) === String(id)
        );

        if (!currentProduct) {
          setProduct(null);
          setRelatedProducts([]);
          return;
        }

        setProduct(currentProduct);

        setRelatedProducts(
          allProducts.filter(
            (item) => String(item.id) !== String(currentProduct.id)
          )
        );

        setSelectedColor(currentProduct.colors?.[0] || "");
        setQuantity(1);
        setAdded(false);
      } catch (err) {
        console.error("Product details API error:", err);
        setError(
          "Product load nahi ho saka. Check karo ke backend server running hai."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-[70vh] bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 mt-5">Loading product details...</p>
        </div>
      </main>
    );
  }

  // API error state
  if (error) {
    return (
      <main className="min-h-[70vh] bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-2xl md:text-3xl font-bold">
            Unable to Load Product
          </h1>
          <p className="text-gray-400 mt-4">{error}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  // Product not found
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
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const productId = product.id || product._id;
  const price = Number(product.price ?? 0);
  const oldPrice =
    product.oldPrice != null ? Number(product.oldPrice) : null;

  const colors = Array.isArray(product.colors) ? product.colors : [];
  const features = Array.isArray(product.features) ? product.features : [];

  const favourite = isFavourite(productId);
  const inStock = product.stock === undefined || product.stock > 0;
  const canAddQuantity =
    product.stock === undefined || quantity < product.stock;

  // Add selected quantity to cart
  const handleAddToCart = () => {
    if (!inStock || !canAddQuantity) return;

    const cartProduct = {
      ...product,
      id: productId,
      ...(selectedColor ? { selectedColor } : {}),
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }

    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const increaseQuantity = () => {
    setQuantity((current) => {
      if (product.stock !== undefined && current >= product.stock) {
        return current;
      }
      return current + 1;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleFavourite = () => {
    toggleFavourite({
      ...product,
      id: productId,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP NAVIGATION */}
      <section className="px-6 md:px-10 lg:px-16 pt-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* PRODUCT IMAGE */}
          <div className="relative min-h-[350px] md:min-h-[600px] rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-white/10 flex items-center justify-center p-10 overflow-hidden">
            {oldPrice !== null && oldPrice > price && (
              <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full bg-white text-black text-xs font-bold tracking-wide">
                SALE
              </div>
            )}

            <button
              type="button"
              onClick={handleFavourite}
              aria-label={
                favourite ? "Remove from favourites" : "Add to favourites"
              }
              className={`absolute top-6 right-6 z-10 w-11 h-11 rounded-full border flex items-center justify-center transition ${
                favourite
                  ? "bg-white text-black border-white"
                  : "bg-black/50 text-white border-white/10 hover:bg-white hover:text-black"
              }`}
            >
              <Heart
                size={19}
                fill={favourite ? "currentColor" : "none"}
              />
            </button>

            <img
             src={getProductImage(product)}

              alt={product.name || "Headphones"}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "https://placehold.co/600x400?text=Headphones";
              }}
              className="w-full max-h-[520px] object-contain hover:scale-105 transition duration-700"
            />
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="pt-2">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              {product.category || "Headphones"}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">
              {product.name}
            </h1>

            {product.brand && (
              <p className="text-gray-400 mt-3">{product.brand}</p>
            )}

            {/* RATING */}
            <div className="flex items-center gap-2 mt-5">
              <Star size={17} fill="currentColor" />
              <span className="font-medium">
                {product.rating ?? "New"}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-500">
                {product.reviews ?? 0} Reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-7 flex-wrap">
              <span className="text-3xl md:text-4xl font-bold">
                Rs. {price.toLocaleString("en-PK")}
              </span>

              {oldPrice !== null && oldPrice > price && (
                <span className="text-gray-600 line-through text-lg">
                  Rs. {oldPrice.toLocaleString("en-PK")}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-400 leading-7 mt-7 max-w-xl">
              {product.description || "No description available yet."}
            </p>

            <div className="h-px bg-white/10 my-8" />

            {/* COLORS */}
            {colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">Select Color</p>
                  <span className="text-sm text-gray-500">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2.5 rounded-full border text-sm transition ${
                        selectedColor === color
                          ? "bg-white text-black border-white"
                          : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-7">
              <p className="text-sm font-semibold mb-4">Quantity</p>

              <div className="inline-flex items-center border border-white/10 rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>

                <span className="w-12 text-center font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={!canAddQuantity}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>

              {product.stock !== undefined && (
                <p
                  className={`text-xs mt-3 ${
                    inStock ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {inStock
                    ? `${product.stock} available`
                    : "Currently out of stock"}
                </p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 py-4 rounded-full flex items-center justify-center gap-2 font-semibold transition ${
                  !inStock
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {!inStock ? (
                  "Out of Stock"
                ) : added ? (
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
                className="flex-1 py-4 rounded-full border border-white/10 flex items-center justify-center font-semibold hover:bg-white hover:text-black transition"
              >
                View Cart
              </Link>
            </div>

            {/* DELIVERY AND WARRANTY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <Truck size={20} />
                <p className="font-semibold mt-3">Fast Delivery</p>
                <p className="text-sm text-gray-500 mt-1">
                  Quick and reliable shipping.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <ShieldCheck size={20} />
                <p className="font-semibold mt-3">1 Year Warranty</p>
                <p className="text-sm text-gray-500 mt-1">
                  Product protection included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES */}
      {features.length > 0 && (
        <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Product Features
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Built for better listening.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                  <Check size={18} />
                  <p className="mt-4 text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-10 lg:px-16 py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  You may also like
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-3">
                  More from SoundX
                </h2>
              </div>

              <Link
                to="/products"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;