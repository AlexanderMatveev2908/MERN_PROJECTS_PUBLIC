import { useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../lib/user/formPost";
import { useCallback } from "react";
import { getOrders } from "../lib/orders/ordersLib";

export const useOrdersVals = ({ dispatch, state }) => {
  const {
    ordersState,
    userState: { token },
  } = state;
  const { ...ordersVals } = ordersState;

  const ordersNavigate = useNavigate();
  const ordersLocation = useLocation();

  const forcedLogoutPlaceOrder = useCallback(
    () => handleLogout(dispatch, ordersNavigate, ordersLocation.pathname),
    [dispatch, ordersNavigate, ordersLocation]
  );

  const getOrdersMemoized = useCallback(
    () => getOrders(dispatch, token, forcedLogoutPlaceOrder),
    [dispatch, token, forcedLogoutPlaceOrder]
  );

  return {
    ...ordersVals,
    getOrdersMemoized,
  };
};
