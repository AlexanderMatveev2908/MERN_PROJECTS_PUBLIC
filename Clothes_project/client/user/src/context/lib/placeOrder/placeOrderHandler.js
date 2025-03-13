import {
  CLEAN_PLACE_VALS,
  SET_ORDER_PLACED,
  SET_PLACE_LOADING,
} from "../../actionTypes/placeOrderActionTypes";
import { placeOrderAPI } from "../../api/placeOrder/placeOrder";
import { showToast } from "./../../../utils/toast";

import { SET_CART_ITEMS } from "../../actionTypes/cartActionTypes";
import { canPlaceOrder } from "./canPlaceOrder";

const orderSuccessful = (dispatch, msg) => {
  dispatch({ type: CLEAN_PLACE_VALS });
  dispatch({ type: SET_CART_ITEMS, payload: { cartItems: {} } });
  dispatch({ type: SET_ORDER_PLACED, payload: { status: true } });
  showToast(msg, "success");
};

export const placeOrderHandler = async ({
  dispatch,
  logoutCb,
  dataToOrder,
}) => {
  try {
    if (
      !canPlaceOrder({
        ...dataToOrder,
      })
    )
      return;

    dispatch({
      type: SET_PLACE_LOADING,
      payload: { field: "placeOrderLoading", status: true },
    });

    const data = await placeOrderAPI({
      dataToOrder,
    });

    switch (dataToOrder.paymentMethod) {
      case "cod": {
        orderSuccessful(dispatch, data.msg);
        break;
      }
      case "stripe": {
        window.location.href = data.session_url;
        break;
      }
      default:
        throw new Error("invalid payment");
    }
  } catch (err) {
    console.dir(err);
    if (err?.status === 401) logoutCb();

    showToast(err?.response?.data?.msg || err.message, "error");
  } finally {
    dispatch({
      type: SET_PLACE_LOADING,
      payload: { field: "placeOrderLoading", status: false },
    });
  }
};
