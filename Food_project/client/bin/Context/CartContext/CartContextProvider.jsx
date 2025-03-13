import PropTypes from "prop-types";
import { CartContext, useCartContextVals } from "./CartContext";

const CartContextProvider = ({ children }) => (
  <CartContext.Provider value={useCartContextVals()}>
    {children}
  </CartContext.Provider>
);

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
