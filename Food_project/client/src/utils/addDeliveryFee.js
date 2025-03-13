export const addDeliveryFee = (cartPrice, deliveryFee) => {
  return cartPrice
    ? +((cartPrice * 100 + deliveryFee * 100) / 100).toFixed(2)
    : 0;
};
