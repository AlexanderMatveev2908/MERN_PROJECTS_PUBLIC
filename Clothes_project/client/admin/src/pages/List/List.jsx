import Spinner from "../../components/Spinner/Spinner";
import { useGlobal } from "./../../hooks/useGlobal";
import ProductItem from "./ProductItem";

const List = () => {
  const {
    products,
    productsLoading,
    productsError,
    deleteProductHandler,
    deletingProductsLoading,
  } = useGlobal();

  return productsLoading ? (
    <div className="min-h-[60vh] flex justify-center items-center">
      <Spinner propStyle={{ width: "200px", height: "200px" }} />
    </div>
  ) : productsError ? (
    <div className="min-h-[60vh] flex justify-center items-center">
      <h1 className="text-5xl">{productsError}</h1>
    </div>
  ) : products?.length ? (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2  bg-gray-200 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {products.map((product) => (
          <ProductItem
            key={product._id}
            {...{ ...product, deleteProductHandler, deletingProductsLoading }}
          />
        ))}
      </div>
    </>
  ) : (
    <></>
  );
};
export default List;
