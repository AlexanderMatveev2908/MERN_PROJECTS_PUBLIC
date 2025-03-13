import { useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { PropTypes } from "prop-types";
import { useRootVals } from "../useRootVals";

const GlobalContextProvider = ({ children }) => {
  const {
    setProductsH,
    setFilteredProductsH,
    memoizedGetCart,
    getOrdersMemoized,

    setCartArrH,

    ...restVals
  } = useRootVals();

  useEffect(() => {
    setProductsH();
  }, [setProductsH]);

  useEffect(() => {
    setFilteredProductsH();
  }, [setFilteredProductsH]);

  useEffect(() => {
    memoizedGetCart();
  }, [memoizedGetCart]);

  useEffect(() => {
    setCartArrH();
  }, [setCartArrH]);

  useEffect(() => {
    getOrdersMemoized();
  }, [getOrdersMemoized]);

  return (
    <GlobalContext.Provider
      value={{
        getOrdersMemoized,
        ...restVals,
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
