import PropTypes from "prop-types";
import { payments } from "./paymentMethods";

const Payments = ({ chosePayment, paymentMethod }) => {
  const content = payments.map((payment) => {
    return (
      <div
        onClick={() => chosePayment(payment.value)}
        key={payment._id}
        className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
      >
        <p
          className={`min-w-3.5 h-3.5 border rounded-full ${
            paymentMethod === payment.value ? "bg-green-400" : ""
          }`}
        ></p>

        {payment.value !== "cod" ? (
          <img src={payment.image} alt={payment.image} className="h-5 mx-4" />
        ) : (
          <p className="text-gray-500 text-sm font-medium mx-4">
            {payment.txt}
          </p>
        )}
      </div>
    );
  });

  return content;
};

Payments.propTypes = {
  chosePayment: PropTypes.func.isRequired,
  paymentMethod: PropTypes.string.isRequired,
};

export default Payments;
