import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { priceFormatter } from "../../utils/priceFormatter";
import { useEffect } from "react";
import { handleScroll } from "./handleScroll";

const ProductItem = ({ _id, name, image, price }) => {
  const location = useLocation();

  useEffect(() => {
    handleScroll();
  }, [location.pathname]);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
      <div className="overflow-hidden">
        <img
          src={image[0].url}
          alt=""
          className="hover:scale-110 transition ease-in-out"
        />

        <p className="pt-3 pb-1 text-sm">{name}</p>

        <p className="text-sm font-medium">{priceFormatter(price)}</p>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductItem;
