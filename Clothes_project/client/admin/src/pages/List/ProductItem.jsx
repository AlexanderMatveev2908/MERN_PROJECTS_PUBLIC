import PropTypes from "prop-types";
import { priceFormatter } from "../../utils/priceFormatter";
import Spinner from "../../components/Spinner/Spinner";

const ProductItem = ({
  _id,
  name,
  price,
  category,
  deleteProductHandler,
  deletingProductsLoading,
  image,
}) => {
  return (
    <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm ">
      <img
        src={image[0].url}
        alt={image[0].url}
        className="w-12 h-12 object-cover"
      />
      <p>{name}</p>
      <p className="text-center md:text-start">{category}</p>
      <p>{priceFormatter(price)}</p>

      {deletingProductsLoading === _id ? (
        <Spinner
          propStyle={{ width: "25px", height: "25px", border: "2px solid red" }}
        />
      ) : (
        <button
          disabled={deletingProductsLoading !== false}
          onClick={() => deleteProductHandler(_id)}
          className="text-center col-start-3 sm:col-start-5 md:text-center  cursor-pointer text-sm md:text-base"
        >
          ❌
        </button>
      )}
    </div>
  );
};

ProductItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  image: PropTypes.array.isRequired,
  deletingProductsLoading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  deleteProductHandler: PropTypes.func.isRequired,
};

export default ProductItem;
