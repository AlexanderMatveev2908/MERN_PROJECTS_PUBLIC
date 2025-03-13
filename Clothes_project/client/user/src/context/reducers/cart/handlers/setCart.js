export const setCartArrHandler = (cartState, action) => {
  const cartItems = action.payload;

  if (!cartItems || !Object.keys(cartItems)?.length)
    return {
      ...cartState,
      cartArr: [],
    };

  let cartItemsArr = Object.keys(cartItems);

  let cartArrUpdated = [];

  cartItemsArr.forEach((itemId) => {
    const sizes = cartItems[itemId];
    for (let size in sizes) {
      if (sizes[size]) {
        cartArrUpdated.push({
          uniqueKey: `${itemId}-${size}`,
          _id: itemId,
          size: size,
          qty: sizes[size],
        });
      }
    }
  });

  return {
    ...cartState,
    cartArr: cartArrUpdated,
  };
};

export const setCartItemsHandler = (cartState, action) => {
  const { cartItems } = action.payload;

  if (typeof cartItems !== "object" || cartItems === null)
    throw new Error("invalid filed " + action.type);

  return {
    ...cartState,
    cartItems,
  };
};
