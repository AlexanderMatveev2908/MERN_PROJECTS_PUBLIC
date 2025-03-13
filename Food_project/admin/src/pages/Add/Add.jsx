import { assets } from "../../assets/assets";
import "./Add.css";
import { categories } from "../../constants/categories";
import { useFoodContext } from "../../hooks/useFoodContext";

const Add = () => {
  const {
    formLoading,
    fields: { name, description, category, price, img },
    handleChange,
    handleSubmit,
  } = useFoodContext();

  const options = categories.map((cat) => (
    <option value={cat} key={cat}>
      {cat}
    </option>
  ));

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <label htmlFor="image">
            <img
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              alt="upload area"
            />
          </label>

          <input
            onChange={handleChange}
            type="file"
            id="image"
            name="img"
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>

          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Product Name..."
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>

          <textarea
            name="description"
            rows="6"
            placeholder="Product Description..."
            value={description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>

            <select value={category} onChange={handleChange} name="category">
              <option value="">Category</option>
              {options}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>

            <input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              placeholder="Product Price..."
              required
            />
          </div>
        </div>

        <button disabled={formLoading} className="add-btn" type="submit">
          {formLoading ? "Loading..." : "ADD"}
        </button>
      </form>
    </div>
  );
};
export default Add;
