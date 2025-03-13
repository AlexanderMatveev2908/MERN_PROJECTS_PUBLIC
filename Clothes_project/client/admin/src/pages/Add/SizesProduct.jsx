import PropTypes from "prop-types";
import { sizesArr } from "./inputsArr";

const SizesProduct = ({ productForm, toggleSize }) => {
  const sizes = sizesArr.map((size) => (
    <div key={size.id}>
      <p
        data-size={size.val}
        onClick={toggleSize}
        className={`${
          productForm.sizes.includes(size.val) ? "bg-pink-100" : "bg-slate-200"
        } px-3 py-1 cursor-pointer`}
      >
        {size.val}
      </p>
    </div>
  ));
  return (
    <div>
      <p className="mb-2">Product Sizes</p>

      <div className="flex gap-3">{sizes}</div>
    </div>
  );
};

SizesProduct.propTypes = {
  toggleSize: PropTypes.func.isRequired,
  productForm: PropTypes.object.isRequired,
};

export default SizesProduct;
