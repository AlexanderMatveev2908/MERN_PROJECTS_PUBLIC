import {
  CHOSE_PAYMENT_METHOD,
  CLEAN_PLACE_VALS,
  SET_ORDER_PLACED,
  SET_PLACE_LOADING,
  SET_PLACE_VAL,
  SET_VERIFYING,
} from "../../actionTypes/placeOrderActionTypes";
import {
  cleanPlaceHandler,
  setPlaceFormLoading,
  setPlaceValHandler,
} from "./handlers/changeForm";
import { paymentHandler, setOrderPlacedHandler } from "./handlers/payment";
import { setVerifying } from "./handlers/verifiers";

export const placeOrderReducer = (placeOrderState, action) => {
  switch (action.type) {
    case SET_PLACE_VAL:
      return setPlaceValHandler(placeOrderState, action);
    case CHOSE_PAYMENT_METHOD:
      return paymentHandler(placeOrderState, action);
    case CLEAN_PLACE_VALS:
      return cleanPlaceHandler(placeOrderState);
    case SET_PLACE_LOADING:
      return setPlaceFormLoading(placeOrderState, action);
    case SET_ORDER_PLACED:
      return setOrderPlacedHandler(placeOrderState, action);
    case SET_VERIFYING:
      return setVerifying(placeOrderState, action);
    default:
      return placeOrderState;
  }
};
