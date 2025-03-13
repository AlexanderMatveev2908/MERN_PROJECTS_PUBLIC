export const updateQtyHandler = (cartState, products, action) => {
  const { itemId, itemSize, qty } = action.payload;

  if (![itemId, itemSize, qty].every(Boolean))
    throw new Error("missingFields " + action.type);

  let updatedCartItems = structuredClone(cartState.cartItems);

  updatedCartItems[itemId] = {
    ...updatedCartItems[itemId],
    [itemSize]: qty,
  };

  return {
    ...cartState,
    cartItems: updatedCartItems,
  };
};
