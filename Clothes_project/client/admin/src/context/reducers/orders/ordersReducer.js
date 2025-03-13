import {
  SET_ORDERS,
  SET_ORDERS_ERROR,
  SET_ORDERS_LOADING,
  SET_SUCCESS_UPDATE,
} from "../../actionTypes/ordersActionTypes";
import {
  ordersLoadingSetter,
  setErrorSetter,
} from "./handlers/err&loadingSetters";
import { ordersSetter, orderUpdateSetter } from "./handlers/ordersSetters";

export const ordersReducer = (ordersState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return ordersSetter(ordersState, action);
    case SET_SUCCESS_UPDATE:
      return orderUpdateSetter(ordersState, action);
    case SET_ORDERS_LOADING:
      return ordersLoadingSetter(ordersState, action);
    case SET_ORDERS_ERROR:
      return setErrorSetter(ordersState, action);
    default:
      return ordersState;
  }
};
