import PropTypes from "prop-types";
import { priceFormatter } from "../../utils/priceFormatter";
import { useGlobal } from "../../hooks/useGlobal";
import { addDeliveryFee } from "../../utils/addDeliveryFee";

const CartTotal = ({ children }) => {
  const { cartTotPrice } = useGlobal();

  return (
    <div className="cart-total">
      <h2>Cart Totals</h2>

      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{priceFormatter(cartTotPrice)}</p>
        </div>

        <hr />

        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>{cartTotPrice ? "$10.00" : "$0.00"}</p>
        </div>

        <hr />

        <div className="cart-total-details">
          <b>Total</b>
          <b>{priceFormatter(addDeliveryFee(cartTotPrice, 10))}</b>
        </div>
      </div>

      {children}
    </div>
  );
};
CartTotal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartTotal;
