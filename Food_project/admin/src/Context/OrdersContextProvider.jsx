import { OrdersContext, useOrdersContextVals } from "./OrdersContext";
import { PropTypes } from "prop-types";

const OrdersContextProvider = ({ children }) => (
  <OrdersContext.Provider value={useOrdersContextVals()}>
    {children}
  </OrdersContext.Provider>
);

OrdersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OrdersContextProvider;
