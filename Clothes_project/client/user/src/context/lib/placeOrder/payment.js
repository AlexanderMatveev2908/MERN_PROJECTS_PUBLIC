import { CHOSE_PAYMENT_METHOD } from "../../actionTypes/placeOrderActionTypes";

export const chosePayment = (dispatch, payment) => {
  dispatch({ type: CHOSE_PAYMENT_METHOD, payload: payment });
};
