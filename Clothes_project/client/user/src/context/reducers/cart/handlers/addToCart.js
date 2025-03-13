export const addToCartHandler = (cartState, products, action) => {
  const { itemId, itemSize } = action.payload;

  if (![itemId, itemSize].every(Boolean))
    throw new Error("invalid filed " + action.type);

  let updatedCartItems = structuredClone(cartState.cartItems);

  if (cartState.cartItems[itemId]) {
    if (cartState.cartItems[itemId][itemSize]) {
      updatedCartItems[itemId] = {
        ...updatedCartItems[itemId],
        [itemSize]: updatedCartItems[itemId][itemSize] + 1,
      };
    } else {
      updatedCartItems[itemId] = {
        ...updatedCartItems[itemId],
        [itemSize]: 1,
      };
    }
  } else {
    updatedCartItems[itemId] = {
      [itemSize]: 1,
    };
  }

  return {
    ...cartState,
    cartItems: updatedCartItems,
  };
};
