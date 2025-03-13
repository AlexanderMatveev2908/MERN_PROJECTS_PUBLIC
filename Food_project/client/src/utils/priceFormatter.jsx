export const priceFormatter = (price, qty) => {
  if (qty) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price * 100 * qty) / 100);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
