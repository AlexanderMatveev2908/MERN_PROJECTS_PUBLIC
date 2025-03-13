import { axiosInstance } from "./../../../constants/instances";
import { showToast } from "./../../../utils/toast";
import {
  SET_PRODUCTS_ERROR,
  SET_PRODUCTS_LOADING,
} from "../../actionTypes/productsActTypes";

const wrapperApiProducts =
  (cb, fieldLoading, fieldError, dispatch) => async (dataToFetch) => {
    try {
      dispatch({
        type: SET_PRODUCTS_ERROR,
        payload: { field: fieldError, status: null },
      });
      dispatch({
        type: SET_PRODUCTS_LOADING,
        payload: { field: fieldLoading, status: true },
      });

      return await cb(dataToFetch);
    } catch (err) {
      console.dir(err);
      dispatch({
        type: SET_PRODUCTS_ERROR,
        payload: {
          field: fieldError,
          status: err.response?.data?.msg || err.message,
        },
      });
      showToast(err.response?.data?.msg || err.message, "error");
      throw err;
    } finally {
      dispatch({
        type: SET_PRODUCTS_LOADING,
        payload: { field: fieldLoading, status: false },
      });
    }
  };

const getProducts = async () => {
  const {
    data: { products },
  } = await axiosInstance.get("/products");
  return products;
};

export const getProductsAPI = (dispatch) =>
  wrapperApiProducts(getProducts, "productsLoading", "productsError", dispatch);

const getProduct = async (productsId) => {
  const {
    data: { product },
  } = await axiosInstance.get(`/products/${productsId}`);
  return product;
};

export const getProductAPI = (dispatch) =>
  wrapperApiProducts(
    getProduct,
    "productItemLoading",
    "productItemError",
    dispatch
  );
