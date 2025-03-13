import PropTypes from "prop-types";
import { useGlobal } from "../../hooks/useGlobal";
import { useEffect, useState } from "react";
import Title from "./../Title/Title";
import Spinner from "./../Spinner/Spinner";
import ProductItem from "./../ProductItem/ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products, productsLoading } = useGlobal();

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products?.length) {
      let related = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      related = related.slice(0, 5);
      setRelated(related);
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title {...{ txt1: "RELATED", txt2: "PRODUCTS" }} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productsLoading ? (
          <Spinner propStyle={{ width: "150px", height: "150px" }} />
        ) : (
          related.map((item) => <ProductItem key={item._id} {...item} />)
        )}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
};

export default RelatedProducts;
