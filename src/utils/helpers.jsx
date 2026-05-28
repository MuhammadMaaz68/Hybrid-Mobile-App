export const isEmail = (value) => /\S+@\S+\.\S+/.test(String(value).trim());

export const getProductTitle = (product) => product?.title || product?.name || 'Product';

export const buildOrderId = () => `SS-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 90 + 10)}`;

export const getRandomItem = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  return items[Math.floor(Math.random() * items.length)];
};
