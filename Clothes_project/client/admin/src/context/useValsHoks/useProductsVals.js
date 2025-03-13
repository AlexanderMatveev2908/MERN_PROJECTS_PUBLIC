import { useCallback } from "react";
import {
  handleChangeAddForm,
  submitAddFormHandler,
  toggleSize,
} from "../lib/products/addForm";
import { getProductsHandler } from "../lib/products/getProducts";
import { deleteProductHandler } from "../lib/products/deleteProdut";
import { useNavigate } from "react-router-dom";

export const useProductsVals = (state, dispatch) => {
  const {
    productsState: {
      productForm,
      productFormLoading,
      productFormError,
      products,
      productsLoading,
      productsError,
      deletingProductsLoading,
      deletingProductsError,
    },
  } = state;

  const navigate = useNavigate();

  const getProductsHandlerMemoized = useCallback(
    () => getProductsHandler(dispatch),
    [dispatch]
  );

  const sendToSeeProducts = () => {
    navigate("/list");

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 300);
  };
  return {
    getProductsHandlerMemoized,

    products,
    productsLoading,
    productsError,

    handleChangeAddForm: (e) => handleChangeAddForm(dispatch, e),
    toggleSize: (e) => toggleSize(dispatch, e),

    submitAddFormHandler: (e) =>
      submitAddFormHandler({ ...productForm }, dispatch, sendToSeeProducts, e),
    deleteProductHandler: (id) => deleteProductHandler(dispatch, id),

    productForm,
    productFormLoading,
    productFormError,

    deletingProductsLoading,
    deletingProductsError,
  };
};
