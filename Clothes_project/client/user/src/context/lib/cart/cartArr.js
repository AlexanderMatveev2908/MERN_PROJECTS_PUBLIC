import { SET_CART_ARR } from "../../actionTypes/cartActionTypes";

export const setCartArr = (dispatch, cartItems) => {
  dispatch({
    type: SET_CART_ARR,
    payload: cartItems,
  });
};

export const findInfoCartArr = (cartArr, products) => {
  if (!cartArr?.length) return;

  return cartArr.map((cartItem) => {
    const product = products.find((product) => product._id === cartItem._id);

    return {
      ...product,
      ...cartItem,
    };
  });
};
