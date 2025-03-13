import PropTypes from "prop-types";
import ProductItem from "../ProductItem/ProductItem";
import Spinner from "../Spinner/Spinner";
import Title from "../Title/Title";
import { loremFormatter } from "./../../utils/txtPlaceholderMaker";
import { deepCompare } from "../../utils/deepComparison";
import { memo } from "react";

const BestSellerProducts = ({ bestSellerProducts, productsLoading }) => {
  const titles = {
    txt1: "BEST",
    txt2: "SELLERS",
  };
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title {...titles} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          {loremFormatter(160)}
        </p>
      </div>

      {productsLoading ? (
        <Spinner propStyle={{ width: "150px", height: "150px" }} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSellerProducts.map((productB) => (
            <ProductItem key={productB._id} {...productB} />
          ))}
        </div>
      )}
    </div>
  );
};
BestSellerProducts.propTypes = {
  bestSellerProducts: PropTypes.array,
  productsLoading: PropTypes.bool,
};

const areBestSellerEqual = (prevProps, nextProps) => {
  const { bestSellerProducts: prevProducts, productsLoading: prevLoading } =
    prevProps;
  const { bestSellerProducts: nextProducts, productsLoading: nextLoading } =
    nextProps;

  if (prevLoading !== nextLoading) return false;

  return deepCompare(prevProducts, nextProducts, "_id");
};

export default memo(BestSellerProducts, areBestSellerEqual);
