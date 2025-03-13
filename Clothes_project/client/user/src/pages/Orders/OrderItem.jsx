import PropTypes from "prop-types";
import { priceFormatter } from "./../../utils/priceFormatter";
import { formatDate } from "../../utils/formatDate";
const OrderItem = ({
  getOrdersMemoized,
  name,
  price,
  image,
  qty,
  size,
  status,
  date,
  paymentMethod,
}) => {
  return (
    <div className="py-4 border-t border-b text-gray-600 sm:gap-4 sm:w-full">
      <div className="flex items-center  flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-6 text-sm ">
        <img
          src={image[0]?.url}
          alt={image[0]?.url}
          className="w-[50%] sm:w-20"
        />

        <div>
          <p className="sm:text-base font-medium whitespace-nowrap">{name}</p>

          <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
            <p className="text-lg">{priceFormatter(price)}</p>
            <p>Quantity: {qty}</p>
            <p>Size: {size}</p>
          </div>

          <p className="mt-2">
            Date:&nbsp;
            <span className="text-gray-500">{formatDate(new Date(date))}</span>
          </p>
          <p className="mt-2">
            Payment:&nbsp;
            <span>{paymentMethod.toUpperCase()}</span>
          </p>
        </div>
        <div className="md:w-1/2 gap-6 md:gap-0 flex flex-col md:flex-row justify-between">
          <div className="flex items-center justify-center gap-2 md:w-1/2 ">
            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
            <p className="text-sm md:text-base">{status}</p>
          </div>

          <button
            onClick={getOrdersMemoized}
            className="border px-4 py-2 text-sm font-medium rounded-2xl"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  getOrdersMemoized: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.array.isRequired,
  size: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  paymentMethod: PropTypes.string.isRequired,
};

export default OrderItem;
