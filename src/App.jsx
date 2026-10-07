import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Favourite from "./pages/Favourite";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";
import { FavouriteProvider } from "./context/FavouriteContext";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavouriteProvider>
          <div className="min-h-screen bg-black text-white">

            <Navbar />

            <Routes>

              {/* =================================================
                  PUBLIC HOME
              ================================================= */}

              <Route
                path="/"
                element={<Home />}
              />

              {/* =================================================
                  AUTH PAGES
              ================================================= */}

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />

              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />

              {/* =================================================
                  PROTECTED PRODUCTS
              ================================================= */}

              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PROTECTED PRODUCT DETAILS
              ================================================= */}

              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PROTECTED CART
              ================================================= */}

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PROTECTED CHECKOUT
              ================================================= */}

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PROTECTED ORDERS
              ================================================= */}

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PROTECTED FAVOURITES
              ================================================= */}

              <Route
                path="/favourite"
                element={
                  <ProtectedRoute>
                    <Favourite />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  404
              ================================================= */}

              <Route
                path="*"
                element={
                  <div className="min-h-[70vh] flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold">
                        404
                      </h1>

                      <p className="text-gray-500 mt-4">
                        Page not found.
                      </p>
                    </div>
                  </div>
                }
              />

            </Routes>

            <Footer />

          </div>
        </FavouriteProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;