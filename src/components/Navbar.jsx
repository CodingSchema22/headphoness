
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  Headphones,
  User,
} from "lucide-react";

import { useCart } from "../context/CartContext";


// =====================================================
// NAVBAR
// =====================================================

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();


  // ===================================================
  // NAVIGATION LINKS
  // ===================================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Orders",
      path: "/orders",
    },
    {
      name: "Favourite",
      path: "/favourite",
    },
  ];


  // ===================================================
  // CLOSE MOBILE MENU
  // ===================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">

      <nav className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        <div className="h-20 flex items-center justify-between">


          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-white
                text-black
                flex
                items-center
                justify-center
                group-hover:scale-105
                transition
              "
            >
              <Headphones size={21} />
            </div>


            <div className="leading-none">

              <h1 className="text-xl font-bold tracking-tight">
                SoundX
              </h1>

              <p className="text-[9px] text-gray-500 uppercase tracking-[0.25em] mt-1">
                Premium Audio
              </p>

            </div>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                    text-sm
                    transition
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }
                  `
                }
              >
                {link.name}
              </NavLink>
            ))}

          </div>


          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================= */}

          <div className="hidden lg:flex items-center gap-5">


            {/* CART */}

            <Link
              to="/cart"
              className="
                relative
                flex
                items-center
                gap-2
                text-gray-300
                hover:text-white
                transition
              "
            >

              <ShoppingCart size={19} />

              <span className="text-sm">
                Cart
              </span>


              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-3
                    -right-4
                    min-w-5
                    h-5
                    px-1
                    rounded-full
                    bg-white
                    text-black
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>
              )}

            </Link>


            {/* LOGIN */}

            <Link
              to="/login"
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-full
                bg-white
                text-black
                text-sm
                font-medium
                hover:bg-gray-200
                transition
              "
            >

              <User size={16} />

              Login

            </Link>

          </div>


          {/* =================================================
              MOBILE RIGHT SIDE
          ================================================= */}

          <div className="flex lg:hidden items-center gap-4">


            {/* MOBILE CART */}

            <Link
              to="/cart"
              className="relative text-gray-300"
            >

              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-4
                    h-4
                    px-1
                    rounded-full
                    bg-white
                    text-black
                    text-[9px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>
              )}

            </Link>


            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                w-10
                h-10
                rounded-full
                border
                border-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:text-white
                hover:bg-white/5
                transition
              "
            >

              {menuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}

            </button>

          </div>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (

          <div
            className="
              lg:hidden
              border-t
              border-white/10
              py-5
            "
          >

            <div className="flex flex-col gap-2">


              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      transition
                      ${
                        isActive
                          ? "bg-white text-black"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }
                    `
                  }
                >
                  {link.name}
                </NavLink>
              ))}


              {/* MOBILE LOGIN */}

              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-white
                  text-black
                  text-sm
                  font-medium
                "
              >

                <User size={16} />

                Login

              </Link>

            </div>

          </div>

        )}

      </nav>

    </header>
  );
};


export default Navbar;