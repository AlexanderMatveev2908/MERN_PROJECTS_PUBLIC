import PropTypes from "prop-types";
import { priceFormatter } from "./../../utils/priceFormatter";
import Spinner from "../Spinner/Spinner";
import { useFoodContext } from "../../hooks/useFoodContext";

const Item = ({ _id, name, price, url, category }) => {
  const { isDelLoading, removeFood, isListLoading } = useFoodContext();

  if (isListLoading) return <Spinner style={{ width: "100%" }} />;

  return (
    <div className="list-table-format">
      <img src={url} alt={url} />
      <p>{name}</p>
      <p>{category}</p>
      <p>{priceFormatter(price)}</p>
      <button
        disabled={isDelLoading}
        onClick={() => removeFood(_id)}
        className="cursor"
      >
        {isDelLoading === _id ? "Deleting" : "❌"}
      </button>
    </div>
  );
};

Item.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
export default Item;
