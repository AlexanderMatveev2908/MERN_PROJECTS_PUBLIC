import { memo, useMemo, useState } from "react";
import { priceFormatter } from "../../utils/priceFormatter";
import PropTypes from "prop-types";
import { useGlobal } from "../../hooks/useGlobal";
import { assets } from "../../frontend_assets/assets";

const ProductInfo = ({ _id, name, sizes, price, description }) => {
  const { addToCart, addLoading } = useGlobal();
  const [chosenSize, setChosenSize] = useState(null);

  const renderedSizes = sizes?.map((size, i) => (
    <button
      onClick={() => setChosenSize(size)}
      className={`border py-2 px-4 bg-transparent ${
        chosenSize === size ? "border-orange-500 text-orange-500" : ""
      }`}
      key={i}
    >
      {size}
    </button>
  ));

  const stars = Array(5)
    .fill(0)
    .map((_, i, arr) => (
      <img
        src={`${
          i === arr.length - 1 ? assets.star_dull_icon : assets.star_icon
        }`}
        alt="assets.star_icon"
        key={i}
        className="w-3 md:w-4"
      ></img>
    ));

  return (
    <div className="flex-1">
      <h1 className="font-medium sm:text-lg lg:text-2xl mt-0">{name}</h1>

      <div className="flex items-center gap-1 mt-2 lg:mt-5">
        {stars}

        <p className="sm:text-sm md:text-base lg:text-base">
          &ensp;({useMemo(() => Math.floor(Math.random() * 500), [])})
        </p>
      </div>
      {/* PRICE */}
      <p className="sm:mt-2 sm:text-lg lg:text-2xl font-medium lg:mt-3">
        {priceFormatter(price)}
      </p>

      <p className="mt-2 sm:text-sm md:text-base text-gray-500 lg:mt-3 md:w-3/4">
        {description}
      </p>
      {/* SIZES */}
      <div className="flex sm:text-sm md:text-base flex-col gap-3 my-2 md:my-4 lg:my-3">
        <p>Select Size</p>

        <div className="flex gap-5 sm:my-2 md:my-4 my-3">{renderedSizes}</div>

        <div>
          <button
            disabled={addLoading}
            onClick={() => addToCart(_id, chosenSize)}
            className="bg-black text-white px-8 py-3 sm:text-sm
        md:text-base "
          >
            {addLoading ? "Loading..." : "ADD TO CART"}
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm sm:text-xs md:text-sm">
            <p>100% Original Product.</p>

            <p>Cash on delivery is available on this product.</p>

            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  sizes: PropTypes.array,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default memo(ProductInfo, (prev, next) => prev._id === next._id);
