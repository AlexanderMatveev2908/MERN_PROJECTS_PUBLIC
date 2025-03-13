import PropTypes from "prop-types";
import { categoriesArr, getValue } from "./inputsArr";

const SelectCategories = ({ productForm, handleChangeAddForm }) => {
  const selectCategories = categoriesArr.map((cat) => (
    <div key={cat.id} className="w-full">
      <p className="mb-2 whitespace-nowrap">{cat.title}</p>
      <select
        value={productForm[getValue(cat.title)]}
        onChange={handleChangeAddForm}
        name={getValue(cat.title)}
        className="w-full px-3 py-2"
      >
        {cat.title === "Product Category" ? (
          <option value="">Category</option>
        ) : (
          <option value="">Subcategory</option>
        )}

        {cat.values.map((val) => (
          <option key={val.id} value={val.val}>
            {val.val}
          </option>
        ))}
      </select>
    </div>
  ));
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-[500px] sm:gap-8 sm:items-end">
      {selectCategories}

      <div className="w-full">
        <p className="mb-2 whitespace-nowrap">Product Price</p>

        <input
          value={productForm["price"]}
          onChange={handleChangeAddForm}
          type="number"
          name="price"
          placeholder="Product price..."
          className="px-3 py-2 w-full"
        />
      </div>
    </div>
  );
};

SelectCategories.propTypes = {
  productForm: PropTypes.object.isRequired,
  handleChangeAddForm: PropTypes.func.isRequired,
};

export default SelectCategories;
