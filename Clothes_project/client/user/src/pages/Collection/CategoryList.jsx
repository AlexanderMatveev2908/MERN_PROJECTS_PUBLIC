import PropTypes from "prop-types";
import { useGlobal } from "../../hooks/useGlobal";

const CategoryList = ({
  mainTitle,
  mainCategoriesArr,
  subTitle,
  subCategoriesArr,
  visibleFilters,
}) => {
  const { handleChangeFilter } = useGlobal();

  // const setCategories =
  //   mainTitle && mainCategoriesArr ? setMainCategories : setSubCategories;
  const field = mainTitle ? "mainCategories" : "subCategories";
  const categories = mainCategoriesArr || subCategoriesArr;
  const title = mainTitle || subTitle;

  const renderedCategories = categories.map((cat) => (
    <p key={cat.id} className="flex gap-2">
      <input
        onChange={handleChangeFilter}
        type="checkbox"
        className="w-3"
        name={field}
        value={cat.cat}
      />
      {cat.cat}
    </p>
  ));

  return (
    <div
      className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
        visibleFilters ? "" : "hidden"
      }`}
    >
      <p className="mb-3 text-sm font-medium ">{title}</p>

      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        {renderedCategories}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  mainTitle: PropTypes.string,
  mainCategoriesArr: PropTypes.arrayOf(
    PropTypes.shape({
      cat: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  subTitle: PropTypes.string,
  subCategoriesArr: PropTypes.arrayOf(
    PropTypes.shape({
      cat: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  visibleFilters: PropTypes.bool.isRequired,
};

export default CategoryList;
