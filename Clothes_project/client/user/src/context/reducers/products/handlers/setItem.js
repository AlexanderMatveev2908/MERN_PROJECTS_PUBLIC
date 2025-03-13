export const setProductItemHandler = (productsState, action) => {
  const { product } = action.payload;

  if (!product) throw new Error("Product is required");

  return {
    ...productsState,
    productItem: product,
  };
};
