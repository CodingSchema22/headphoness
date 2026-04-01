import React, { useState } from "react";

const Navbar = () => {
  const product = {
    title: "Premium Headphones",
    description:
      "Experience crystal clear sound with our latest collection. Designed for comfort and built for performance.",
    price: 199,
    rating: 4.5,
    images: [
      "/images/headphone11.png",
      "/images/headphone13.png",
      "/images/headphone22.png"
    ]
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <>
    <section id="Navbar">
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      
      {/* PRODUCT SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 gap-12">

        {/* IMAGE SECTION */}
        <div className="w-full md:w-[40%] flex justify-center">

          <div className="relative w-full max-w-[400px] aspect-[3/4]">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl blur-2xl"></div>

            {/* Main Image */}
            <img
              src={selectedImage}
              className="relative w-full h-full object-contain rounded-2xl shadow-2xl transition duration-500 hover:scale-105"
              alt=""
            />
          </div>

        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-[45%] flex flex-col gap-6 text-center md:text-left">

          <h1 className="text-4xl md:text-5xl font-bold">
            {product.title}
          </h1>

          <p className="text-gray-400 text-lg">
            {product.description}
          </p>

          {/* Price + Rating */}
          <div className="flex justify-center md:justify-start items-center gap-4">
            <span className="text-2xl font-semibold">
              ${product.price}
            </span>
            <span className="text-yellow-400">
              {"⭐".repeat(Math.floor(product.rating))}
            </span>
          </div>

          {/* Size Selection */}
          <div className="flex justify-center md:justify-start gap-3">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded transition ${
                  selectedSize === size
                    ? "bg-white text-black"
                    : "border-gray-600 hover:bg-white hover:text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition shadow">
              Add to Cart
            </button>

            <button className="border px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
              ❤️ Wishlist
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-[70px] h-[90px] rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                  selectedImage === img
                    ? "border-white scale-105"
                    : "border-gray-700 hover:scale-105"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
    </section>
    </>
  );
};

export default Navbar;