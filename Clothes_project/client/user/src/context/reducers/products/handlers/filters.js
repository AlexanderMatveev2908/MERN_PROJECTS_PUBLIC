export const setFilteredProductsHandler = (productsState, action) => {
  const filteredProducts = action.payload;

  return {
    ...productsState,
    filteredProducts,
  };
};
