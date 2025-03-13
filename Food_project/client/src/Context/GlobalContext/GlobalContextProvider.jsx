import PropTypes from "prop-types";
import { GlobalContext } from "./GlobalContext";
import { useCartContextVals } from "../CartContext/CartContext";
import { useEffect } from "react";

const GlobalContextProvider = ({ children }) => {
  const { getFoodList, loadCart, getOrders, token, ...restCart } =
    useCartContextVals();

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
        getFoodList,
        loadCart,
        token,
        getOrders,
        ...restCart,
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
