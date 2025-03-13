import {
  SET_ORDERS,
  SET_ORDERS_ERROR,
  SET_ORDERS_LOADING,
} from "../../actionTypes/ordersActionTypes";
import {
  ordersErrorSetter,
  ordersLoadingSetter,
  ordersSetter,
} from "./handlers/orderSetters";

export const ordersReducer = (ordersState, action) => {
  switch (action.type) {
    case SET_ORDERS_LOADING:
      return ordersLoadingSetter(ordersState, action);
    case SET_ORDERS_ERROR:
      return ordersErrorSetter(ordersState, action);
    case SET_ORDERS:
      return ordersSetter(ordersState, action);
    default:
      return ordersState;
  }
};
