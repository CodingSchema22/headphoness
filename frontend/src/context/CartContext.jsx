
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

// Create a separate cart key for each signed-in user
const getCartKey = (user) => {
  const email = user?.email?.trim().toLowerCase();

  return email
    ? `soundx-cart:${encodeURIComponent(email)}`
    : null;
};

// Load the selected user's cart
const loadCart = (key) => {
  if (!key) return [];

  try {
    const savedCart = localStorage.getItem(key);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const cartKey = getCartKey(user);

  const [cartItems, setCartItems] = useState(
    () => loadCart(cartKey)
  );

  // Track which user's cart is currently loaded
  const [loadedCartKey, setLoadedCartKey] = useState(cartKey);

  // Switch carts when the logged-in user changes
  useEffect(() => {
    setLoadedCartKey(null);
    setCartItems(loadCart(cartKey));
    setLoadedCartKey(cartKey);
  }, [cartKey]);

  // Save only when the correct user's cart is loaded
  useEffect(() => {
    if (!cartKey || loadedCartKey !== cartKey) return;

    try {
      localStorage.setItem(
        cartKey,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems, cartKey, loadedCartKey]);

  // Add product to cart
  const addToCart = (product) => {
    if (!cartKey) return;

    setCartItems((currentItems) => {
      const productId = product.id || product._id;

      const existingItem = currentItems.find(
        (item) =>
          (item.id || item._id) === productId &&
          (item.selectedColor || "") ===
            (product.selectedColor || "")
      );

      const stock =
        product.stock != null
          ? Number(product.stock)
          : Infinity;

      if (stock <= 0) return currentItems;

      if (existingItem) {
        if (existingItem.quantity >= stock) {
          return currentItems;
        }

        return currentItems.map((item) =>
          (item.id || item._id) === productId &&
          (item.selectedColor || "") ===
            (product.selectedColor || "")
            ? {
                ...item,
                quantity: Math.min(
                  Number(item.quantity || 1) + 1,
                  stock
                ),
                stock: product.stock ?? item.stock,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          id: productId,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (id, selectedColor) => {
    setCartItems((items) =>
      items.filter(
        (item) =>
          !(
            (item.id || item._id) === id &&
            (item.selectedColor || "") ===
              (selectedColor || "")
          )
      )
    );
  };

  // Increase quantity without exceeding stock
  const increaseQuantity = (id, selectedColor) => {
    setCartItems((items) =>
      items.map((item) => {
        const matches =
          (item.id || item._id) === id &&
          (item.selectedColor || "") ===
            (selectedColor || "");

        if (!matches) return item;

        const stock =
          item.stock != null
            ? Number(item.stock)
            : Infinity;

        if (Number(item.quantity || 1) >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: Number(item.quantity || 1) + 1,
        };
      })
    );
  };

  // Decrease quantity, keeping at least one item
  const decreaseQuantity = (id, selectedColor) => {
    setCartItems((items) =>
      items.map((item) => {
        const matches =
          (item.id || item._id) === id &&
          (item.selectedColor || "") ===
            (selectedColor || "");

        if (!matches || Number(item.quantity || 1) <= 1) {
          return item;
        }

        return {
          ...item,
          quantity: Number(item.quantity || 1) - 1,
        };
      })
    );
  };

  // Clear only the currently loaded user's cart
  const clearCart = () => setCartItems([]);

  // Total item quantity
  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // Subtotal in PKR
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};

export default CartContext;
