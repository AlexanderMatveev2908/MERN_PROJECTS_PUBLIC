import { PropTypes } from "prop-types";
import { assets } from "../../assets/assets";
import { priceFormatter } from "../../utils/priceFormatter";
import { statusOrders } from "./../../constants/statusOrders";
import { useOrdersContext } from "../../hooks/useOrdersContext";
import MiniSpinner from "../MiniSpinner/MiniSpinner";
const Order = ({ address, amount, items, status, _id }) => {
  const { isUpdatingLoading, updateStatus } = useOrdersContext();

  const options = statusOrders.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ));

  return (
    <div className="order-item">
      <img src={assets.parcel_icon} alt={assets.parcel_icon} />

      <div>
        <p className="order-item-food">
          {items.map(
            (item, i) =>
              `${item.name} x ${item.quantity}${
                i === items.length - 1 ? "" : ", "
              }`
          )}
        </p>

        <p className="order-item-name">
          {`${address.firstName} ${address.lastName}`}
        </p>

        <div className="order-item-address">
          <p>{`${address.street},`}</p>

          <p>
            {`${address.city}, ${address.state}, ${address.country} ${address.zip}`}
          </p>
        </div>

        <p className="order-item-phone">{address.phone}</p>
      </div>

      <p>Items: {items.length}</p>

      <p>{priceFormatter(amount)}</p>

      {isUpdatingLoading === _id ? (
        <MiniSpinner style={{ width: "25px", height: "25px" }} />
      ) : (
        <select value={status} onChange={(e) => updateStatus(e, _id)}>
          {options}
        </select>
      )}
    </div>
  );
};

Order.propTypes = {
  address: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};
export default Order;
