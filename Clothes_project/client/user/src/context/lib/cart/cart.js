import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_ITEMS,
  SET_CART_LOADING,
  UPDATE_QTY,
} from "../../actionTypes/cartActionTypes";
import {
  addItemCartAPI,
  getCartAPI,
  removeItemAPI,
  updateQtyAPI,
} from "../../api/cart/cartOperations";
import { showToast } from "../../../utils/toast";

export const getCartHandler = async (errorHandler, token, dispatch) => {
  if (!token) return;

  try {
    dispatch({
      type: SET_CART_LOADING,
      payload: { field: "cartLoading", status: true },
    });

    const cartItems = await getCartAPI();

    dispatch({ type: SET_CART_ITEMS, payload: { cartItems } });
  } catch (err) {
    // console.dir(err)
    errorHandler(err);
  } finally {
    dispatch({
      type: SET_CART_LOADING,
      payload: { field: "cartLoading", status: false },
    });
  }
};

export const libCartWrapper =
  (
    asyncCb,
    syncCb,
    token,
    dispatch,
    errorHandler,
    fieldLoading,
    statusIsLoading = true
  ) =>
  async (...params) => {
    if (!params.every((el) => !!el)) {
      showToast("Chose a size before adding to cart", "error");
      return;
    }

    if (!token) {
      syncCb(dispatch, ...params);
      return;
    }

    try {
      dispatch({
        type: SET_CART_LOADING,
        payload: { field: fieldLoading, status: statusIsLoading },
      });

      await asyncCb(() => syncCb(dispatch, ...params), ...params);
    } catch (err) {
      errorHandler(err);
    } finally {
      dispatch({
        type: SET_CART_LOADING,
        payload: { field: fieldLoading, status: false },
      });
    }
  };

export const addToCartSync = (dispatch, itemId, itemSize) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      itemId,
      itemSize,
    },
  });
};

export const addToCartAsync = async (syncCb, itemId, itemSize) => {
  syncCb();

  await addItemCartAPI(itemId, itemSize);

  showToast("product added", "success");
};

export const updateQtySync = (dispatch, itemId, itemSize, qty) => {
  if (!qty) return;

  dispatch({
    type: UPDATE_QTY,
    payload: { itemId, itemSize, qty },
  });

  return qty;
};

export const updateAsync = async (syncCb, itemId, itemSize, qty) => {
  syncCb();

  if (!qty) return;

  await updateQtyAPI(itemId, itemSize, qty);

  showToast("product updated", "success");
};

export const removeSync = async (dispatch, itemId, itemSize) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      itemId,
      itemSize,
    },
  });
};

export const removeAsync = async (syncCb, itemId, itemSize) => {
  await removeItemAPI(itemId, itemSize);

  syncCb();

  showToast("product removed", "success");
};
