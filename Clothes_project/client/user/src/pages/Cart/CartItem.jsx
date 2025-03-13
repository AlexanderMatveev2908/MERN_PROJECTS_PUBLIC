import PropTypes from "prop-types";
import { priceFormatter } from "../../utils/priceFormatter";
import { assets } from "./../../frontend_assets/assets";
import { useRef } from "react";
import { useCartItemHandlers } from "../../hooks/useCartItemHandlers";
import Spinner from "./../../components/Spinner/Spinner";

const CartItem = ({ _id, name, image, price, size, qty }) => {
  const qtyRef = useRef(null);

  const {
    localQty,
    handleChangeQty,
    handleBlur,
    handleKeyDown,
    removeFromCart,
    removeLoading,
  } = useCartItemHandlers(_id, size, qty, qtyRef);

  return (
    <div className="py-4 border-t border-b text-gray-700  grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_o.5fr] items-center gap-4">
      <div className="flex isolate gap-6">
        <img src={image[0]?.url} alt={image[0]?.url} className="w-16 sm:w-20" />
        <div>
          <p className="text-sm sm:text-lg font-medium">{name}</p>

          <div className="flex items-center gap-5 mt-2">
            <p>{priceFormatter(price)}</p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{size}</p>
          </div>
        </div>
      </div>

      <input
        type="number"
        name="qty"
        value={localQty}
        onChange={handleChangeQty}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={qtyRef}
        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
      />
      {removeLoading === _id + size ? (
        <Spinner
          propStyle={{ width: "25px", height: "25px", border: "2px solid red" }}
        />
      ) : (
        <img
          disabled={removeLoading}
          onClick={() => removeFromCart(_id, size)}
          src={assets.bin_icon}
          alt={assets.bin_icon}
          className="w-4 sm:w-5 cursor-pointer"
        />
      )}
    </div>
  );
};

CartItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
};

export default CartItem;
