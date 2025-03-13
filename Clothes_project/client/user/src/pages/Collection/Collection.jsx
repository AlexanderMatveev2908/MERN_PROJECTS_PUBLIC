import { useState } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import CategoryList from "./CategoryList";
import { assets } from "../../frontend_assets/assets";
import Title from "../../components/Title/Title";
import { mainCatObj, subCatObj } from "./categories";
import { optionsPriorityArr } from "./optionsPriority";
import Spinner from "../../components/Spinner/Spinner";
import ProductItem from "../../components/ProductItem/ProductItem";

const Collection = () => {
  const [visibleFilters, setVisibleFilters] = useState(false);

  const { filteredProducts, productsLoading, sorter, handleChangeFilter } =
    useGlobal();

  const optionsPriority = optionsPriorityArr.map((opt) => (
    <option key={opt.id} value={opt.val}>
      {opt.txt}
    </option>
  ));

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setVisibleFilters(!visibleFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${visibleFilters ? "rotate-90" : ""}`}
          />
        </p>

        <CategoryList {...{ ...mainCatObj, visibleFilters }} />

        <CategoryList {...{ ...subCatObj, visibleFilters }} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <Title {...{ txt1: "ALL", txt2: "COLLECTIONS" }} />

          <select
            onChange={handleChangeFilter}
            value={sorter}
            name="sorter"
            className="border-2 py-2 border-gray-300 text-sm px-2 outline-none"
          >
            {optionsPriority}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {productsLoading ? (
            <div className="flex justify-center items-center col-span-full h-[50vh]">
              <Spinner propStyle={{ width: "150px", height: "150px" }} />
            </div>
          ) : (
            filteredProducts?.length &&
            filteredProducts.map((product) => (
              <ProductItem key={product._id} {...product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Collection;
