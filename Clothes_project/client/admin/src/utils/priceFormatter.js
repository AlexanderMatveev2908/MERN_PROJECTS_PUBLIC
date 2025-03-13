export const priceFormatter = (price) => {
  if (typeof price !== "number") throw new Error("Invalid price provided");

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
