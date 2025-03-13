export const cartActionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  UPDATE_QTY: "UPDATE_QTY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  SET_CART_LOADING: "SET_CART_LOADING",
  SET_CART_ARR: "SET_CART_ARR", //is not a misspell for cart error, i am setting the cart in version array
  ROLLBACK: "ROLLBACK",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

export const {
  ADD_TO_CART,
  UPDATE_QTY,
  REMOVE_FROM_CART,
  SET_CART_LOADING,
  SET_CART_ARR,
  ROLLBACK,
  SET_CART_ITEMS,
} = cartActionTypes;
