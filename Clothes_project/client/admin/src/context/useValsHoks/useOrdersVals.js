import { useCallback } from "react";
import { asyncOrdersWrapper, getOrdersLib } from "../lib/orders/ordersLib";
import { getOrdersAPI, updateStatusORderAPI } from "../api/ordersCalls";
import { updateOrderStatusLib } from "./../lib/orders/ordersLib";

export const useOrdersVals = (state, dispatch) => {
  const {
    ordersState: { orders, ordersLoading, ordersError },
  } = state;

  const getOrdersMemoized = useCallback(
    () =>
      asyncOrdersWrapper(
        getOrdersLib,
        getOrdersAPI,
        dispatch,
        "ordersLoading",
        "ordersError"
      )(),
    [dispatch]
  );

  const updateOrder = (orderId, e) =>
    asyncOrdersWrapper(
      updateOrderStatusLib,
      updateStatusORderAPI,
      dispatch,
      "updatingLoading",
      "updatingError"
    )(orderId, e);

  return {
    getOrdersMemoized,
    updateOrder,

    orders,
    ordersLoading,
    ordersError,
  };
};
