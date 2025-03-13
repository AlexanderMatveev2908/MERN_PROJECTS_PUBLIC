import {
  SET_FILTERED_PRODUCTS,
  SET_PRODUCTS,
  SET_PRODUCTS_ERROR,
  SET_PRODUCTS_LOADING,
} from "../../actionTypes/productsActTypes";
import { getProductsAPI } from "../../api/products/getProducts";

const setBestSellerCB = (dispatch, products) => {
  const bestSellerProducts = products?.length
    ? products.filter((product) => product.bestseller).slice(0, 5)
    : [];
  dispatch({
    type: SET_PRODUCTS,
    payload: { field: "bestSellerProducts", val: bestSellerProducts },
  });
};
const setLatestCB = (dispatch, products) => {
  const latestProducts = products?.length ? products.slice(0, 10) : [];
  dispatch({
    type: SET_PRODUCTS,
    payload: { field: "latestProducts", val: latestProducts },
  });
};

export const setProducts = async (dispatch) => {
  try {
    const products = await getProductsAPI(dispatch)();

    dispatch({
      type: SET_PRODUCTS,
      payload: { field: "products", val: products },
    });

    setLatestCB(dispatch, products);

    setBestSellerCB(dispatch, products);
  } catch (err) {
    console.dir(err);
  }
};

export const setProductsLoading = (dispatch, field, status) => {
  dispatch({ type: SET_PRODUCTS_LOADING, payload: { field, status } });
};

export const setProductsError = (dispatch, field, err) => {
  dispatch({ type: SET_PRODUCTS_ERROR, payload: { field, err } });
};

export const setFilteredProducts = (dispatch, funForFilter, products) => {
  let filteredProducts = [...products];

  filteredProducts = funForFilter.reduce(
    (currentProducts, fun) => fun(currentProducts),
    filteredProducts
  );

  dispatch({ type: SET_FILTERED_PRODUCTS, payload: filteredProducts });
};
