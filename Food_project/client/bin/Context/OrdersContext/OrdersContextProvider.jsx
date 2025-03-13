import PropTypes from "prop-types";
import { OrdersContext, useOrdersContextVals } from "./useOrdersContextVals";

const OrdersContextProvider = ({ children }) => (
  <OrdersContext.Provider value={useOrdersContextVals()}>
    {children}
  </OrdersContext.Provider>
);
export default OrdersContextProvider;

OrdersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
