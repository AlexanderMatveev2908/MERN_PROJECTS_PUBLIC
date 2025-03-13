import PropTypes from "prop-types";
import { assets } from "./../../admin_assets/assets";
import { dateFormatter } from "../../utils/dateFormatter";
import { priceFormatter } from "./../../utils/priceFormatter";
import { optStatusArr } from "./optionsStatus";
const OrderItem = ({
  items,
  date,
  address,
  paymentMethod,
  isPaid,
  amount,
  status,
  updateOrder,
  _id,
}) => {
  const { firstName, lastName, street, city, state, country, phone, zipcode } =
    address;

  const optToRender = optStatusArr.map((opt) => (
    <option key={opt.id} value={opt.val}>
      {opt.val}
    </option>
  ));

  return (
    <div className="grid border-2 border-gray-300 grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start text-xs sm:text-sm text-gray-500 p-5 mb-5 rounded-xl">
      <div>
        <img src={assets.parcel_icon} alt={assets.parcel_icon} />
      </div>
      <div>
        {items.map((item, i) => (
          <p key={item?.uniqueKey}>
            {`${item?.name} x ${item?.qty}`}&nbsp;
            <span>{`${item?.size}`}</span>
            {i !== items?.length - 1 ? "," : ""}
          </p>
        ))}
      </div>

      <p className="my-3 font-semibold">
        {firstName}&ensp;{lastName}
      </p>

      <div className="lg:col-span-2 ">
        <p>{street},&ensp;</p>
        <p>{`${city}, ${state}, ${country}, ${zipcode}`}</p>
        <p>{phone}</p>
      </div>

      <div className=" lg:col-span-2 text-sm">
        <p>Items: {items?.length}</p>
        <p className="my-3">Method: {paymentMethod}</p>
        <p>Payment: {isPaid ? "Paid" : "Not Paid"}</p>
        <p>Date: {dateFormatter(date)}</p>
      </div>

      <p>{priceFormatter(amount)}</p>

      <select
        onChange={(e) => updateOrder(_id, e)}
        className="text-sm sm:text-[16px]"
        value={status}
      >
        {optToRender}
      </select>
    </div>
  );
};

OrderItem.propTypes = {
  updateOrder: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  isPaid: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderItem;
