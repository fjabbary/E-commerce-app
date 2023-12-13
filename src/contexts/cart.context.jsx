import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
});

// PROVIDER
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    const foundItem = cartItems.find((item) => item.id === productToAdd.id);
    const foundIndex = cartItems.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (foundItem) {
      const cartItemsCopy = [...cartItems];
      cartItemsCopy[foundIndex].quantity = foundItem.quantity + 1;
      setCartItems(cartItemsCopy);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  const cartTotalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const changeCartQty = (productId, dir) => {
    const foundItem = cartItems.find((item) => item.id === productId);
    const foundIndex = cartItems.findIndex((item) => item.id === productId);

    const cartItemsCopy = [...cartItems];

    if (dir === "inc") {
      cartItemsCopy[foundIndex].quantity = foundItem.quantity + 1;
    }

    if (dir === "dec") {
      if (cartItemsCopy[foundIndex].quantity > 1) {
        cartItemsCopy[foundIndex].quantity = foundItem.quantity - 1;
      }
    }
    setCartItems(cartItemsCopy);
  };

  const deleteCartItem = (productId) => {
    const filteredItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(filteredItems);
  };

  const cartTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartTotalCount,
    changeCartQty,
    deleteCartItem,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
