export const getTotAmount = (cartItems, products) => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const price = products.find(({ _id }) => _id === itemId)?.price;
    for (const size in cartItems[itemId]) {
      totalAmount += price * cartItems[itemId][size];
    }
  }
  return +totalAmount.toFixed(2);
};

export const getQty = (cartItems) => {
  if (!cartItems) return 0;

  let qty = 0;

  Object.keys(cartItems).forEach((itemId) => {
    const sizes = cartItems[itemId];
    for (let size in sizes) {
      qty += sizes[size];
    }
  });

  return qty;
};

export const getDeliveryFee = (cartTotalAmount) => {
  let fee;
  if (!cartTotalAmount) fee = 0;
  else if (cartTotalAmount < 50) fee = 30;
  else if (cartTotalAmount < 100) fee = 20;
  else if (cartTotalAmount < 150) fee = 10;
  else fee = 0;
  return fee;
};
