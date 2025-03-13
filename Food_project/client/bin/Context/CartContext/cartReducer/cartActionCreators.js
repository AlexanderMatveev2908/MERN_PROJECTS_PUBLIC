export const setCartAct = (cart) => ({
  type: "SET_CART",
  payload: cart,
});

export const setCartLoadingAct = (status) => ({
  type: "SET_CART_LOADING",
  payload: status,
});

export const addToCartAct = (itemId) => ({
  type: "ADD_TO_CART",
  payload: itemId,
});

export const decQtyAct = (itemId) => ({
  type: "DEC_QTY",
  payload: itemId,
});

export const removeFromCartAct = (itemId) => ({
  type: "REMOVE_FROM_CART",
  payload: itemId,
});
