export const addDelivery = (price, deliveryFee) => {
  if (typeof price !== "number" || typeof deliveryFee !== "number")
    throw new Error("Invalid fields provided");

  return price ? +(price + deliveryFee).toFixed(2) : 0;
};
