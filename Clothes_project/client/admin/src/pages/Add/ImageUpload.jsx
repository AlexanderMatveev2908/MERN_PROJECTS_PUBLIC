import PropTypes from "prop-types";
import { assets } from "../../admin_assets/assets";
import { filesIds, numFiles } from "./inputsArr";

const ImageUpload = ({ productForm, handleChangeAddForm }) => {
  const inputFiles = new Array(numFiles).fill(null).map((_, i) => {
    const currLabel = `image${i + 1}`;
    return (
      <label key={filesIds[i]} htmlFor={currLabel}>
        <img
          src={`${
            productForm[currLabel]
              ? URL.createObjectURL(productForm[currLabel])
              : assets.upload_area
          }`}
          alt={assets.upload_area}
          className="w-20 h-20 object-cover"
        />
        <input
          onChange={handleChangeAddForm}
          type="file"
          id={currLabel}
          name={currLabel}
          hidden
        />
      </label>
    );
  });
  return (
    <div>
      <p className="mb-2">Upload Image</p>

      <div className="flex gap-2">{inputFiles}</div>
    </div>
  );
};

ImageUpload.propTypes = {
  productForm: PropTypes.object.isRequired,
  handleChangeAddForm: PropTypes.func.isRequired,
};

export default ImageUpload;
