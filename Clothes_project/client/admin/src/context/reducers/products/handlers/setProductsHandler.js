export const setProductsHandler = (productsState, action) => {
  const { products } = action.payload;

  if (!Array.isArray(products))
    throw new Error("Invalid payload for " + action.type);

  return {
    ...productsState,
    products,
  };
};

export const productsDeletedHandler = (productsState, action) => {
  const { id } = action.payload;

  if (!id) throw new Error("Invalid payload for " + action.type);

  const updatedProducts = productsState.products.filter(
    (product) => product._id !== id
  );

  return {
    ...productsState,
    products: updatedProducts,
  };
};
