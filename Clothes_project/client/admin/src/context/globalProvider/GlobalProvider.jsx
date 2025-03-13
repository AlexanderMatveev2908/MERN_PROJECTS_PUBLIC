import PropTypes from "prop-types";
import { GlobalContext } from "./GlobalContext";
import { useRootVals } from "../useRootVals";
import { useEffect } from "react";

const GlobalProvider = ({ children }) => {
  const { token, getProductsHandlerMemoized, getOrdersMemoized, ...vals } =
    useRootVals();

  useEffect(() => {
    getProductsHandlerMemoized();
  }, [getProductsHandlerMemoized, token]);

  useEffect(() => {
    getOrdersMemoized();
  }, [getOrdersMemoized, token]);

  return (
    <GlobalContext.Provider value={{ token, ...vals }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
