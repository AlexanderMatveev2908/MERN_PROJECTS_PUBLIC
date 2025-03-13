import { createContext, useCallback, useMemo, useReducer } from "react";
import { createOrdersInstance } from "../../constants/urls";
// import { useCart } from "./../../hooks/useCart";
import { getOrdersV0, getOrderV0 } from "../../lib/ordersLib";
import { ordersReducer } from "../../../bin/binContext/ordersReducer";
import { ordersInitState } from "./ordersReducer/ordersInitState";
import { useCartContextVals } from "../CartContext/CartContext";

export const OrdersContext = createContext();

export const useOrdersContextVals = () => {
  const [ordersState, ordersDispatch] = useReducer(
    ordersReducer,
    ordersInitState
  );
  const { orders, ordersLoading } = ordersState;

  // const { token, reset } = useCart();
  const { token, reset } = useCartContextVals();

  const ordersInstance = useMemo(() => createOrdersInstance(token), [token]);

  const getOrders = useCallback(
    () => getOrdersV0(ordersDispatch, ordersInstance, reset),
    [ordersInstance, reset]
  );

  const getOrder = (itemId) =>
    getOrderV0(itemId, ordersInstance, ordersDispatch, orders);

  return {
    orders,
    ordersLoading,
    getOrders,
    getOrder,

    ordersInstance,
  };
};
