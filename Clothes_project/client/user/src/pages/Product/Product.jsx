import { useGlobal } from "../../hooks/useGlobal";
import Spinner from "../../components/Spinner/Spinner";
import { destructureItem } from "./utils";
import ProductInfo from "./ProductInfo";
import ProductImages from "./ProductImages";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productItem, productItemLoading, productItemError, setProductItemH } =
    useGlobal();

  const { productId } = useParams();

  useEffect(() => {
    if (productId) setProductItemH(productId);
  }, [productId, setProductItemH]);

  if (productItemLoading)
    return (
      <div className="w-full flex justify-center items-center h-[60vh]">
        <Spinner propStyle={{ width: "200px", height: "200px" }} />;
      </div>
    );

  if (productItemError) return <h1>{productItemError}</h1>;
  return (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex sm:items-start gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* PRODUCT IMAGES */}
        <ProductImages {...destructureItem(productItem)} />
        {/* PRODUCT INFO */}
        <ProductInfo {...destructureItem(productItem)} />
      </div>
      {/* REVIEWS */}
      <ProductReviews />
      {/* RELATED PRODUCTS */}
      <RelatedProducts {...destructureItem(productItem)} />
    </div>
  );
};
export default Product;
