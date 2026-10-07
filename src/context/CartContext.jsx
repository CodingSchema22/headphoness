import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


// =====================================================
// CREATE CONTEXT
// =====================================================

const CartContext = createContext();


// =====================================================
// CART PROVIDER
// =====================================================

export const CartProvider = ({ children }) => {

  // ---------------------------------------------------
  // LOAD CART FROM LOCAL STORAGE
  // ---------------------------------------------------

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("soundx-cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error("Error loading cart:", error);

      return [];
    }
  });


  // ---------------------------------------------------
  // SAVE CART TO LOCAL STORAGE
  // ---------------------------------------------------

  useEffect(() => {
    localStorage.setItem(
      "soundx-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);


  // ===================================================
  // ADD TO CART
  // ===================================================

  const addToCart = (product) => {

    setCartItems((currentItems) => {

      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor
      );


      // -----------------------------------------------
      // PRODUCT ALREADY EXISTS
      // -----------------------------------------------

      if (existingItem) {

        return currentItems.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }


      // -----------------------------------------------
      // NEW PRODUCT
      // -----------------------------------------------

      return [
        ...currentItems,

        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };


  // ===================================================
  // REMOVE FROM CART
  // ===================================================

  const removeFromCart = (id, selectedColor) => {

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor
          )
      )
    );
  };


  // ===================================================
  // INCREASE QUANTITY
  // ===================================================

  const increaseQuantity = (id, selectedColor) => {

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id &&
        item.selectedColor === selectedColor
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  // ===================================================
  // DECREASE QUANTITY
  // ===================================================

  const decreaseQuantity = (id, selectedColor) => {

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id &&
          item.selectedColor === selectedColor
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };


  // ===================================================
  // CLEAR CART
  // ===================================================

  const clearCart = () => {
    setCartItems([]);
  };


  // ===================================================
  // TOTAL NUMBER OF ITEMS
  // ===================================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  // ===================================================
  // CART TOTAL
  // ===================================================

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        item.quantity,
    0
  );


  // ===================================================
  // CONTEXT VALUE
  // ===================================================

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


// =====================================================
// USE CART HOOK
// =====================================================

export const useCart = () => {

  const context = useContext(
    CartContext
  );


  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }


  return context;
};


export default CartContext;