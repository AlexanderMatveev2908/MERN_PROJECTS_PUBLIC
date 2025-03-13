import {
  addToCartAct,
  decQtyAct,
  removeFromCartAct,
  setCartAct,
  setCartLoadingAct,
} from "../../bin/binContext/storeActions";

export const loadCartV0 = async (cartDispatch, cartInstance, reset) => {
  try {
    cartDispatch(setCartLoadingAct(true));
    const res = await cartInstance.get();

    if (res.data?.ok) {
      cartDispatch(setCartAct(res.data.userCart));
      return res.data.userCart;
    }
  } catch (err) {
    console.log(err);
    if (err?.response?.status === 401) reset(err);
  } finally {
    cartDispatch(setCartLoadingAct(false));
  }
};

const actionTypes = {
  ADD_OR_INC_QTY: "ADD_OR_INC_QTY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  DEC_QTY_OR_REMOVE: "DEC_QTY_OR_REMOVE",
};
const { ADD_OR_INC_QTY, DEC_QTY_OR_REMOVE, REMOVE_FROM_CART } = actionTypes;

export const addToCartV0 = async (
  itemId,
  token,
  cartDispatch,
  cartInstance,
  reset
) => {
  if (!token) {
    cartDispatch(addToCartAct(itemId));
  } else {
    try {
      cartDispatch(addToCartAct(itemId));

      const res = await cartInstance.patch("/", {
        itemId,
        action: ADD_OR_INC_QTY,
      });

      if (res.data?.ok) cartDispatch(setCartAct(res.data.userCart));
      else cartDispatch(decQtyAct(itemId));
    } catch (err) {
      cartDispatch(decQtyAct(itemId));
      if (err.response.status === 401) reset(err);
      console.log(err);
    }
  }
};

export const decQtyV0 = async (
  itemId,
  token,
  cartDispatch,
  cartInstance,
  reset
) => {
  if (!token) {
    cartDispatch(decQtyAct(itemId));
  } else {
    try {
      cartDispatch(decQtyAct(itemId));

      const res = await cartInstance.patch("/", {
        itemId,
        action: DEC_QTY_OR_REMOVE,
      });

      if (res.data?.ok) cartDispatch(setCartAct(res.data.userCart));
      else cartDispatch(addToCartAct(itemId));
    } catch (err) {
      cartDispatch(addToCartAct(itemId));

      if (err.response.status === 401) reset(err);
      console.log(err);
    }
  }
};

export const removeFromCartV0 = async (
  itemId,
  token,
  cartDispatch,
  cartInstance,
  reset,
  cartItems
) => {
  if (!token) {
    cartDispatch(removeFromCartAct(itemId));
  } else {
    const rollbackItem = cartItems[itemId];
    try {
      cartDispatch(removeFromCartAct(itemId));

      const res = await cartInstance.patch("/", {
        itemId,
        action: REMOVE_FROM_CART,
      });

      if (res.data?.ok) cartDispatch(setCartAct(res.data.userCart));
      else {
        cartDispatch(
          setCartAct({
            ...cartItems,
            [itemId]: rollbackItem,
          })
        );
      }
    } catch (err) {
      cartDispatch(
        setCartAct({
          ...cartItems,
          [itemId]: rollbackItem,
        })
      );

      if (err.response.status === 401) reset(err);

      console.log(err);
    }
  }
};
