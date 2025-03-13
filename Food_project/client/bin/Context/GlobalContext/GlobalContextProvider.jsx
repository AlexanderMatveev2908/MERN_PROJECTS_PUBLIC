import PropTypes from "prop-types";
import { GlobalContext } from "./GlobalContext";
import { useFoodContextVals } from "../FoodContext/useFoodContextVals";
import { useCartContextVals } from "../CartContext/CartContext";
import { useOrdersContextVals } from "../OrdersContext/useOrdersContextVals";
import { useEffect } from "react";

const GlobalContextProvider = ({ children }) => {
  const { getFoodList, ...restFood } = useFoodContextVals();
  const { loadCart, token, ...restCart } = useCartContextVals();
  const { getOrders, ...restOrders } = useOrdersContextVals();

  useEffect(() => {
    getFoodList();
  }, [getFoodList]);

  useEffect(() => {
    if (token) loadCart();
  }, [loadCart, token]);

  useEffect(() => {
    if (token) getOrders();
  }, [getOrders, token]);

  return (
    <GlobalContext.Provider
      value={{
        ...restFood,
        getFoodList,
        loadCart,
        ...restCart,
        token,
        ...restOrders,
        getOrders,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
