import PropTypes from "prop-types";
import { priceFormatter } from "../../utils/priceFormatter";
import { useGlobal } from "../../hooks/useGlobal";
// import { useCart } from "./../../hooks/useCart";

const CartItem = ({ _id, url, name, price }) => {
  // const { cartItems, removeFromCart } = useCart();
  const { cartItems, removeFromCart } = useGlobal();

  return (
    <>
      <div className="cart-items-title cart-items-item">
        <img src={url} alt={url} />
        <p>{name}</p>
        <p>{priceFormatter(price)}</p>
        <p>{cartItems[_id]}</p>
        <p>{priceFormatter(price, cartItems[_id])}</p>
        <p onClick={() => removeFromCart(_id)} className="cross">
          ❌
        </p>
      </div>

      <hr />
    </>
  );
};

CartItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default CartItem;
