import React from "react";
import { Link } from "react-router-dom";
import { Headphones, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div
                className="
                  w-11 h-11
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
                <Headphones size={22} />
              </div>

              <div className="leading-none">
                <h2 className="text-xl font-bold">
                  SoundX
                </h2>

                <p className="
                  text-[9px]
                  text-gray-500
                  uppercase
                  tracking-[0.25em]
                  mt-1
                ">
                  Premium Audio
                </p>
              </div>
            </Link>

            <p className="
              text-gray-500
              leading-7
              max-w-md
              mt-6
            ">
              Premium headphones designed for people who
              believe great sound can transform everyday
              moments.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-7">

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-10 h-10
                  rounded-full
                  border border-white/10
                  flex items-center justify-center
                  text-gray-400
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                <span className="text-sm font-bold">
                  IG
                </span>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-10 h-10
                  rounded-full
                  border border-white/10
                  flex items-center justify-center
                  text-gray-400
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                <span className="text-sm font-bold">
                  f
                </span>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="
                  w-10 h-10
                  rounded-full
                  border border-white/10
                  flex items-center justify-center
                  text-gray-400
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                <span className="text-sm font-semibold">
                  X
                </span>
              </a>

            </div>
          </div>


          {/* Shop */}
          <div>

            <h3 className="text-sm font-semibold mb-5">
              Shop
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/products"
                className="text-sm text-gray-500 hover:text-white transition"
              >
                All Products
              </Link>

              <Link
                to="/products"
                className="text-sm text-gray-500 hover:text-white transition"
              >
                Wireless Headphones
              </Link>

              <Link
                to="/products"
                className="text-sm text-gray-500 hover:text-white transition"
              >
                Studio Headphones
              </Link>

              <Link
                to="/favourite"
                className="text-sm text-gray-500 hover:text-white transition"
              >
                Favourite
              </Link>

            </div>

          </div>


          {/* Support */}
          <div>

            <h3 className="text-sm font-semibold mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/orders"
                className="text-sm text-gray-500 hover:text-white transition"
              >
                My Orders
              </Link>

              <Link
                to="/login"
                className="text-sm text-gray-500 hover:text-white transition"
              >
                My Account
              </Link>

              <a
                href="mailto:support@soundx.com"
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                  hover:text-white
                  transition
                "
              >
                <Mail size={15} />
                Contact Support
              </a>

            </div>

          </div>

        </div>


        {/* Newsletter */}
        <div
          className="
            mt-16
            p-7 md:p-9
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-7
          "
        >

          <div>
            <p className="text-lg font-semibold">
              Stay in the loop.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Get product updates, offers and audio tips.
            </p>
          </div>


          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:w-auto"
          >

            <input
              type="email"
              placeholder="Your email address"
              className="
                w-full
                md:w-64
                px-5
                py-3.5
                rounded-l-full
                bg-black
                border
                border-white/10
                border-r-0
                outline-none
                text-sm
                text-white
                placeholder:text-gray-600
                focus:border-white/30
              "
            />

            <button
              type="submit"
              aria-label="Subscribe"
              className="
                px-5
                py-3.5
                rounded-r-full
                bg-white
                text-black
                hover:bg-gray-200
                transition
              "
            >
              <ArrowUpRight size={18} />
            </button>

          </form>

        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6 md:px-10 lg:px-16
            py-6
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-3
          "
        >

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} SoundX.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <span className="text-xs text-gray-600">
              Privacy
            </span>

            <span className="text-xs text-gray-600">
              Terms
            </span>

            <span className="text-xs text-gray-600">
              Secure Checkout
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;