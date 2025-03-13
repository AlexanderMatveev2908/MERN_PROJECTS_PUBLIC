export const getDeliveryFee = (cartTotalAmount) => {
  if (cartTotalAmount < 50) return 30;
  else if (cartTotalAmount < 100) return 20;
  else if (cartTotalAmount < 150) return 10;
  return 0;
};

const getTotalNoDelivery = (amount) => {
  if (typeof amount !== "number") throw new Error("Invalid amount");

  return +(amount - getDeliveryFee(amount)).toFixed(2);
};
