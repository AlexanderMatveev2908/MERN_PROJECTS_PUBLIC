import { useGlobal } from "./../../hooks/useGlobal";
import ImageUpload from "./ImageUpload";
import SelectCategories from "./SelectCategories";
import SizesProduct from "./SizesProduct";
const Add = () => {
  const {
    productFormLoading,
    productForm,

    handleChangeAddForm,
    toggleSize,
    submitAddFormHandler,
  } = useGlobal();

  return (
    <form
      onSubmit={submitAddFormHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <ImageUpload {...{ productForm, handleChangeAddForm }} />

      <div className="w-full">
        <p className="m-b2">Products Name</p>
        <input
          value={productForm["name"]}
          onChange={handleChangeAddForm}
          type="text"
          name="name"
          placeholder="Product name..."
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="m-b2">Description Name</p>
        <textarea
          value={productForm["description"]}
          onChange={handleChangeAddForm}
          name="description"
          placeholder="Description..."
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <SelectCategories {...{ productForm, handleChangeAddForm }} />

      <SizesProduct {...{ productForm, toggleSize }} />

      <div className="flex gap-2 mt-2">
        <input
          checked={productForm["bestseller"]}
          onChange={handleChangeAddForm}
          name="bestseller"
          type="checkbox"
          id="bestseller"
        />

        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <div className="flex justify-center w-full sm:max-w-[500px]">
        <button
          disabled={productFormLoading}
          type="submit"
          className="w-28 py-3 mt-4 rounded-xl bg-black text-white cursor-pointer"
        >
          {productFormLoading ? "Loading..." : "ADD"}
        </button>
      </div>
    </form>
  );
};
export default Add;
