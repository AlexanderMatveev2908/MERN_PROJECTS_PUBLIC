import PropTypes from "prop-types";
import { assets } from "./../../assets/assets";
import { priceFormatter } from "../../utils/priceFormatter";
import { useGlobal } from "../../hooks/useGlobal";

const OrderItem = ({ order }) => {
  const { getOrder } = useGlobal();

  return (
    <div className="orders-order">
      <img src={assets.parcel_icon} alt={assets.parcel_icon} />

      <p>
        {order?.items.map(
          (item, i) =>
            item.name +
            " x " +
            item.quantity +
            (i === order.items.length - 1 ? "" : ", ")
        )}
      </p>

      <p>{priceFormatter(order.amount)}</p>

      <p>Items: {order.items.length}</p>

      <p>
        <span>&#x25cf;&ensp;</span>

        <b>{order.status}</b>
      </p>

      <button onClick={() => getOrder(order._id)}>Track Order</button>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    address: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        publicId: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    payment: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  ordersLoading: PropTypes.bool.isRequired,
};
export default OrderItem;
