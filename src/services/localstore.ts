import { ProductType, OrderItemType } from "../Types";

const getCartItemsFromStore = (userId: string): ProductType[] => {
  const userItems = localStorage.getItem(userId);
  if (!userItems) return [];
  return JSON.parse(userItems);
};

const getCartItemsWithQuantity = (userId: string): OrderItemType[] => {
  const cartItems = getCartItemsFromStore(userId);
  if (cartItems.length === 0) return [];
  return cartItems.map((item: ProductType) => {
    let qty = getItemQuantity(userId, item.productId);
    return { ...item, quantity: qty };
  });
};

const updateLocalStore = (userId: string, userItems: ProductType[]) => {
  localStorage.setItem(userId, JSON.stringify(userItems));
};

const addProductToStore = (userId: string, product: ProductType) => {
  const userCart = getCartItemsFromStore(userId);
  if (isNewItem(userCart, product.productId)) userCart.push(product);
  updateLocalStore(userId, userCart);
  updateQuantity(userId, product.productId);
};

const isNewItem = (cart: ProductType[], productId: string): boolean => {
  for (let currentItem of cart) {
    if (currentItem.productId === productId) return false;
  }
  return true;
};

const getItemQuantity = (userId: string, productId: string): number => {
  let itemKey = userId + "@" + productId;
  return Number(localStorage.getItem(itemKey) || "0");
};

const updateQuantity = (userId: string, productId: string) => {
  let quantity = getItemQuantity(userId, productId);
  let itemKey = userId + "@" + productId;
  localStorage.setItem(itemKey, JSON.stringify(quantity + 1));
};

export {
  addProductToStore,
  getCartItemsFromStore,
  getItemQuantity,
  getCartItemsWithQuantity,
};
