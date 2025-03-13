import { axiosInstance } from "../../constants/instances";
import {
  SET_PRODUCTS_ERROR,
  SET_PRODUCTS_LOADING,
} from "../actionTypes/productsActionTypes";

const wrapperAPIproducts =
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
      throw err;
    } finally {
      dispatch({
        type: SET_PRODUCTS_LOADING,
        payload: { field: fieldLoading, status: false },
      });
    }
  };

const addProduct = async (formData) => {
  const { data } = await axiosInstance.post("/products", formData);
  return data;
};

export const addProductAPI = (dispatch) =>
  wrapperAPIproducts(
    addProduct,
    "productFormLoading",
    "productFormError",
    dispatch
  );

const getProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

export const getProductsAPI = (dispatch) =>
  wrapperAPIproducts(getProducts, "productsLoading", "productsError", dispatch);

export const deleteProductAPI = async (dispatch, id) => {
  try {
    dispatch({
      type: SET_PRODUCTS_ERROR,
      payload: { field: "deletingProductsError", status: null },
    });
    dispatch({
      type: SET_PRODUCTS_LOADING,
      payload: { field: "deletingProductsLoading", status: id },
    });

    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
  } catch (err) {
    console.dir(err);
    dispatch({
      type: SET_PRODUCTS_ERROR,
      payload: {
        field: "deletingProductsError",
        status: err.response?.data?.msg || err.message,
      },
    });
    throw err;
  } finally {
    dispatch({
      type: SET_PRODUCTS_LOADING,
      payload: { field: "deletingProductsLoading", status: false },
    });
  }
};
