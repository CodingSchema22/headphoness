
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  ShoppingCart,
  Menu,
  X,
  Headphones,
  User,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Orders", path: "/orders" },
  { name: "Favourite", path: "/favourite" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login", { replace: true });
  };

  // Premium Login button
  const authButtonClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold !text-black shadow-lg shadow-white/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200 active:scale-[0.97]";

  // Premium Logout button
  const logoutButtonClass =
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-400/20 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold !text-gray-300 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-red-400/50 hover:bg-red-500/10 hover:!text-red-300 hover:shadow-[0_6px_24px_rgba(239,68,68,0.12)] active:translate-y-0 active:scale-[0.97]";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/85 text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
      {/* Animated top line */}
      <div className="absolute left-0 right-0 top-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent"
          animate={reduceMotion ? {} : { x: ["-100%", "400%"] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <nav className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="flex h-[76px] items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group relative flex shrink-0 items-center gap-3"
            aria-label="SoundX home"
          >
            <motion.div
              whileHover={reduceMotion ? {} : { rotate: -8, scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-lg shadow-white/[0.05] transition-colors duration-300 group-hover:bg-gray-200 sm:h-11 sm:w-11"
            >
              <Headphones size={22} strokeWidth={2.1} />
            </motion.div>

            <div className="leading-none">
              <span className="block text-xl font-bold tracking-tight">
                SoundX
              </span>

              <span className="mt-1.5 block text-[9px] uppercase tracking-[0.25em] text-gray-500">
                Premium Audio
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>

                    {isActive && (
                      <motion.span
                        layoutId="soundx-active-nav"
                        className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.06]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Cart */}
            <Link
              to="/cart"
              className="group relative inline-flex h-11 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCart
                size={18}
                className="transition-transform duration-300 group-hover:-rotate-6"
              />

              {/* <span className="text-sm font-medium">Cart</span> */}

              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold !text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Login / Logout */}
            {user ? (
              <motion.button
                type="button"
                onClick={handleLogout}
                whileHover={reduceMotion ? {} : { y: -2 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
                className={logoutButtonClass}
              >
                <motion.span
                  className="flex items-center justify-center"
                  whileHover={reduceMotion ? {} : { x: 2, rotate: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <LogOut size={16} />
                </motion.span>

                {/* <span>Logout</span> */}
              </motion.button>
            ) : (
              <Link to="/login" className={authButtonClass}>
                <User size={16} />
                <span>Login</span>
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            {/* Mobile Cart */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCart size={19} />

              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold !text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] !text-white transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={reduceMotion ? false : { opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={
                    reduceMotion ? undefined : { opacity: 0, rotate: 45 }
                  }
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {menuOpen ? <X size={21} /> : <Menu size={21} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-white/[0.08] py-5">
                {/* Mobile navigation links */}
                <div className="mb-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={
                        reduceMotion ? false : { opacity: 0, x: -10 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.04,
                      }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-white !text-black"
                              : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                          }`
                        }
                      >
                        {link.name}
                        <ArrowUpRight size={15} />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Login / Logout */}
                {user ? (
                  <motion.button
                    type="button"
                    onClick={handleLogout}
                    whileHover={reduceMotion ? {} : { y: -2 }}
                    whileTap={reduceMotion ? {} : { scale: 0.98 }}
                    className={`${logoutButtonClass} w-full rounded-xl`}
                  >
                    <motion.span
                      className="flex items-center justify-center"
                      whileHover={reduceMotion ? {} : { x: 2, rotate: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LogOut size={17} />
                    </motion.span>

                    <span>Logout from SoundX</span>
                  </motion.button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`${authButtonClass} w-full rounded-xl`}
                  >
                    <User size={17} />
                    <span>Sign in to SoundX</span>
                    <ArrowUpRight size={15} />
                  </Link>
                )}

                <p className="mt-5 text-center text-[10px] uppercase tracking-[0.25em] text-gray-600">
                  Feel every frequency.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
