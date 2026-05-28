import React, { createContext, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { getProductTitle } from '../utils/helpers';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...items, { ...product, quantity }];
    });
    Toast.show({ type: 'success', text1: 'Product added', text2: getProductTitle(product) });
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    Toast.show({ type: 'success', text1: 'Product removed', text2: 'Your cart has been updated.' });
  };

  const increaseQty = (id) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + Number(item.price || 0) * item.quantity, 0),
    [cartItems]
  );

  const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, cartTotal, cartCount }),
    [cartItems, cartTotal, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
