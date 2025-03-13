export const removeFromCartHandler = (cartState, products, action) => {
  const { itemId, itemSize } = action.payload;

  if (![itemId, itemSize].every(Boolean))
    throw new Error("invalid filed " + action.type);

  let updatedCartItems = structuredClone(cartState.cartItems);

  const qty = updatedCartItems[itemId]?.[itemSize];

  if (qty) {
    //eslint-disable-next-line
    const { [itemSize]: _, ...rest } = updatedCartItems[itemId];
    updatedCartItems[itemId] = rest;

    if (!Object.keys(updatedCartItems[itemId])?.length) {
      //eslint-disable-next-line
      const { [itemId]: _, ...rest } = updatedCartItems;
      updatedCartItems = rest;
    }
  }

  return {
    cartState,
    cartItems: updatedCartItems,
  };
};
