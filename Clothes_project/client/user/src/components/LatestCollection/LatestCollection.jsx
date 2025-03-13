import PropTypes from "prop-types";
import { loremFormatter } from "../../utils/txtPlaceholderMaker";
import ProductItem from "../ProductItem/ProductItem";
import Spinner from "../Spinner/Spinner";
import Title from "../Title/Title";
import { memo } from "react";
import { deepCompare } from "./../../utils/deepComparison";
const LatestCollection = ({ latestProducts, productsLoading }) => {
  const titles = {
    txt1: "LATEST",
    txt2: "COLLECTION",
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title {...titles} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          {loremFormatter(160)}
        </p>
      </div>

      {productsLoading ? (
        <Spinner propStyle={{ width: "150px", height: "150px" }} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((latestP) => (
            <ProductItem key={latestP._id} {...latestP} />
          ))}
        </div>
      )}
    </div>
  );
};

LatestCollection.propTypes = {
  latestProducts: PropTypes.array,
  productsLoading: PropTypes.bool,
};

const areLatestEqual = (prevProps, nextProps) => {
  const { latestProducts: prevProducts, productsLoading: prevLoading } =
    prevProps;
  const { latestProducts: nextProducts, productsLoading: nextLoading } =
    nextProps;

  if (prevLoading !== nextLoading) return false;

  return deepCompare(prevProducts, nextProducts, "_id");
};

export default memo(LatestCollection, areLatestEqual);
