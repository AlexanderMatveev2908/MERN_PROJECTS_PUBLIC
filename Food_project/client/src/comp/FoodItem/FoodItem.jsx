import PropTypes from "prop-types";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { priceFormatter } from "../../utils/priceFormatter";
import { useGlobal } from "../../hooks/useGlobal";
// import { useCart } from "../../hooks/useCart";

const FoodItem = ({ _id, name, url, price, description }) => {
  // const { cartItems, addToCart, decQty } = useCart();
  const { cartItems, addToCart, decQty } = useGlobal();

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url} alt={url} className="food-item-img" />
        {!cartItems[_id] ? (
          <img
            onClick={() => addToCart(_id)}
            className="add"
            src={assets.add_icon_white}
            alt={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => decQty(_id)}
              src={assets.remove_icon_red}
              alt={assets.remove_icon_red}
            />
            <p>{cartItems[_id]}</p>
            <img
              onClick={() => addToCart(_id)}
              src={assets.add_icon_green}
              alt={assets.add_icon_green}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt={assets.rating_starts} />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{priceFormatter(price)}</p>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
export default FoodItem;
