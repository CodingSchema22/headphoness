import React, { useState } from "react";
// import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Footer from "./components/Footer";

const App = () => {
  const nav = [
    { id: 1, name: "Home" , target: "Navbar" },
    { id: 2, name: "Products", target: "Products" },
    { id: 3, name: "Orders" , target: "Footer"},
    { id: 4, name: "Favourite" }
  ];

  const text = {
    heading: "Discover Premium Headphones",
    para: "Experience crystal clear sound with our latest collection. Designed for comfort, built for performance."
  };

  const shoe_cases = [
    { id: 1, image: "/images/headphone11.png" },
    { id: 2, image: "/images/headphone13.png" },
    { id: 3, image: "/images/headphone22.png" }
  ];

  const [selectedImage, setSelectedImage] = useState(shoe_cases[0].image);

  return (
    <>
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">

      {/* NAVBAR */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b border-gray-800">
        
        <div className="text-xl font-semibold tracking-wide">
          ⚡ SoundX
        </div>

        <div className="flex gap-8 mt-10 md:mt-0">
          {nav.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer relative group"
            >
              {item.name}
              <span className="absolute left-0 bottom-[-5px] w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
            </div>
          ))}
        </div>

      </div>

      {/* BANNER */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 gap-12">
 {/* IMAGE SECTION */}
        <div className="w-full md:w-[40%] flex justify-center items-center">

  <div className="relative w-full max-w-[450px] aspect-[3/4]">

    {/* Glow background */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl blur-2xl"></div>

    {/* Image */}
    <img
      src={selectedImage}
      className="relative w-full h-full object-contain rounded-2xl shadow-2xl transition duration-500 hover:scale-105"
      alt=""
    />

  </div>

</div>
        {/* TEXT SECTION */}
        <div className="w-full md:w-[45%] flex flex-col gap-6">

          <h1 className="text-4xl md:text-5.5xl font-bold leading-tight">
            {text.heading}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            {text.para}
          </p>

          <button className="w-fit px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition shadow-lg">
            Shop Now
          </button>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mt-6">
            {shoe_cases.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.image)}
                className={`w-[80px] h-[100px] rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                  selectedImage === item.image
                    ? "border-white scale-105"
                    : "border-gray-700 hover:scale-105"
                }`}
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>

        </div>


      </div>

    </div>
    {/* <Navbar/> */}
    <Products/>
    <Footer/>
    </>
  );
};

export default App;