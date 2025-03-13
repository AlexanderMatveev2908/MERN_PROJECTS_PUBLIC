import { useReducer } from "react";
import { createContext, useCallback } from "react";
import { ordersReducer } from "./ordersReducer";
import { getAllOrdersV0, updateStatusV0 } from "./../lib/ordersLib";
import { ordersInitState } from "./initStates";

export const OrdersContext = createContext();

export const useOrdersContextVals = () => {
  const [ordersState, ordersDispatch] = useReducer(
    ordersReducer,
    ordersInitState
  );
  const { orders, isOrdersLoading, isUpdatingLoading } = ordersState;

  const getAllOrders = useCallback(() => getAllOrdersV0(ordersDispatch), []);

  const updateStatus = (e, orderId) =>
    updateStatusV0(e, orderId, ordersDispatch, getAllOrders);

  return {
    orders,
    isOrdersLoading,
    getAllOrders,

    updateStatus,
    isUpdatingLoading,
  };
};
