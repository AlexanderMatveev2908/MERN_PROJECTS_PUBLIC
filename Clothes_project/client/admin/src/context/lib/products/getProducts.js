import { SET_PRODUCTS } from "../../actionTypes/productsActionTypes";
import { getProductsAPI } from "../../api/productCalls";
import { handleLogout } from "../user/login";

export const getProductsHandler = async (dispatch) => {
  try {
    const { products } = await getProductsAPI(dispatch)();
    dispatch({ type: SET_PRODUCTS, payload: { products } });
  } catch (err) {
    if (err?.response?.status === 401) handleLogout(dispatch, err);
  }
};
