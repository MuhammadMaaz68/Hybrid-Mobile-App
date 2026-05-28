import React, { createContext, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { getRandomItem, getProductTitle } from '../utils/helpers';

export const ScanContext = createContext(null);

export function ScanProvider({ children }) {
  const [scannedItems, setScannedItems] = useState([]);

  const fakeScan = (products, addToCart) => {
    const product = getRandomItem(products);
    if (!product) {
      return null;
    }
    setScannedItems((items) => [{ ...product, scannedAt: new Date().toISOString() }, ...items]);
    addToCart(product, 1);
    Toast.show({ type: 'success', text1: 'Scan success', text2: `${getProductTitle(product)} added to cart.` });
    return product;
  };

  const value = useMemo(() => ({ scannedItems, fakeScan }), [scannedItems]);

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}
